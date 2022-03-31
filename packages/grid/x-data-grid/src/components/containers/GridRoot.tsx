import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useForkRef, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { GridRootContainerRef } from '../../models/gridRootContainerRef';
import { GridRootStyles } from './GridRootStyles';
import { gridVisibleColumnDefinitionsSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { gridClasses } from '../../constants/gridClasses';
import { gridRowCountSelector } from '../../hooks/features/rows/gridRowsSelector';

export interface GridRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

const GridRoot = React.forwardRef<HTMLDivElement, GridRootProps>(function GridRoot(props, ref) {
  const rootProps = useGridRootProps();
  const { children, className, ...other } = props;
  const apiRef = useGridApiContext();
  const visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  const totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
  const rootContainerRef: GridRootContainerRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(rootContainerRef, ref);

  apiRef.current.rootElementRef = rootContainerRef;

  // Our implementation of <NoSsr />
  const [mountedState, setMountedState] = React.useState(false);
  useEnhancedEffect(() => {
    setMountedState(true);
  }, []);

  useEnhancedEffect(() => {
    if (mountedState) {
      apiRef.current.unstable_updateGridDimensionsRef();
    }
  }, [apiRef, mountedState]);

  if (!mountedState) {
    return null;
  }

  return (
    <GridRootStyles
      ref={handleRef}
      className={clsx(className, rootProps.classes?.root, gridClasses.root, {
        [gridClasses.autoHeight]: rootProps.autoHeight,
      })}
      role="grid"
      aria-colcount={visibleColumns.length}
      aria-rowcount={totalRowCount}
      aria-multiselectable={!rootProps.disableMultipleSelection}
      aria-label={rootProps['aria-label']}
      aria-labelledby={rootProps['aria-labelledby']}
      {...other}
    >
      {children}
    </GridRootStyles>
  );
});

GridRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export { GridRoot };
