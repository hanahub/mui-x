import * as yargs from 'yargs';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as prettier from 'prettier';
import * as ttp from '@mui/monorepo/packages/typescript-to-proptypes/src';
import { fixBabelGeneratorIssues, fixLineEndings } from '@mui/monorepo/packages/docs-utilities';
import { getTypeScriptProjects } from './getTypeScriptProjects';

const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
  config: path.join(__dirname, '../../prettier.config.js'),
});

async function generateProptypes(program: ttp.ts.Program, sourceFile: string) {
  const proptypes = ttp.parseFromProgram(sourceFile, program, {
    checkDeclarations: true,
    shouldResolveObject: ({ name }) => {
      const propsToNotResolve = [
        'classes',
        'components',
        'componentsProps',
        'columns',
        'currentColumn',
        'colDef',
        'initialState',
        'renderedColumns',
        'scrollBarState',
        'renderState',
        'visibleColumns',
        'cellFocus',
        'cellTabIndex',
        'csvOptions',
        'printOptions',
        'column',
        'groupingColDef',
        'rowNode',
        'localeText',
        'columnGroupingModel',
      ];
      if (propsToNotResolve.includes(name)) {
        return false;
      }
      return undefined;
    },
  });

  if (proptypes.body.length === 0) {
    return;
  }

  const sourceContent = await fse.readFile(sourceFile, 'utf8');

  const result = ttp.inject(proptypes, sourceContent, {
    disablePropTypesTypeChecking: true,
    comment: [
      '----------------------------- Warning --------------------------------',
      '| These PropTypes are generated from the TypeScript type definitions |',
      '| To update them edit the TypeScript types and run "yarn proptypes"  |',
      '----------------------------------------------------------------------',
    ].join('\n'),
    reconcilePropTypes: (prop, previous, generated) => {
      const usedCustomValidator = previous !== undefined && !previous.startsWith('PropTypes');
      const ignoreGenerated =
        previous !== undefined &&
        previous.startsWith('PropTypes /* @typescript-to-proptypes-ignore */');
      return usedCustomValidator || ignoreGenerated ? previous! : generated;
    },
    shouldInclude: ({ component, prop }) => {
      if (['children', 'state'].includes(prop.name) && component.name.startsWith('DataGrid')) {
        return false;
      }
      let shouldExclude = false;
      prop.filenames.forEach((filename) => {
        const definedInNodeModule = /node_modules/.test(filename);

        if (definedInNodeModule) {
          // TODO: xGrid team should consider removing this to generate more correct proptypes as well
          if (component.name.includes('Grid')) {
            shouldExclude = true;
          } else {
            const definedInInternalModule = /node_modules\/@mui/.test(filename);
            // we want to include props if they are from our internal components
            // avoid including inherited `children` and `classes` as they (might) need custom implementation to work
            if (
              !definedInInternalModule ||
              (definedInInternalModule && ['children', 'classes', 'theme'].includes(prop.name))
            ) {
              shouldExclude = true;
            }
          }
        }
      });

      // filtering out `prop.filenames.size > 0` removes props from unknown origin
      return prop.filenames.size > 0 && !shouldExclude;
    },
  });

  if (!result) {
    throw new Error('Unable to produce inject propTypes into code.');
  }

  const prettified = prettier.format(result, { ...prettierConfig, filepath: sourceFile });
  const formatted = fixBabelGeneratorIssues(prettified);
  const correctedLineEndings = fixLineEndings(sourceContent, formatted);

  await fse.writeFile(sourceFile, correctedLineEndings);
}

async function run() {
  const projects = getTypeScriptProjects();

  const promises = Array.from(projects.values()).flatMap((project) => {
    if (!project.getComponentsWithPropTypes) {
      return [];
    }

    const componentsWithPropTypes = project.getComponentsWithPropTypes(project);
    return componentsWithPropTypes.map<Promise<void>>(async (filename) => {
      try {
        await generateProptypes(project.program, filename);
      } catch (error: any) {
        error.message = `${filename}: ${error.message}`;
        throw error;
      }
    });
  });

  const results = await Promise.allSettled(promises);

  const fails = results.filter((result): result is PromiseRejectedResult => {
    return result.status === 'rejected';
  });

  fails.forEach((result) => {
    console.error(result.reason);
  });
  if (fails.length > 0) {
    process.exit(1);
  }
}

yargs
  .command({
    command: '$0',
    describe: 'Generates Component.propTypes from TypeScript declarations',
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
