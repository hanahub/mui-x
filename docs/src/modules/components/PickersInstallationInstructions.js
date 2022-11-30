/* eslint-disable  material-ui/no-hardcoded-labels */
import * as React from 'react';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const libraries = ['dayjs', 'date-fns', 'luxon', 'moment'];

export default function PickersInstallationInstructions() {
  const [licenceType, setLicenceType] = React.useState('community');
  const [packageManger, setPackageManger] = React.useState('yarn');
  const [libraryUsed, setLibraryUsed] = React.useState('dayjs');

  const handlePackageMangerChange = (event, nextPackageManager) => {
    if (nextPackageManager !== null) {
      setPackageManger(nextPackageManager);
    }
  };

  const handleLicenceTypeChange = (event, nextLicenseType) => {
    if (nextLicenseType !== null) {
      setLicenceType(nextLicenseType);
    }
  };

  const handleLibraryUsedChange = (event) => {
    setLibraryUsed(event.target.value);
  };

  const installationCLI = packageManger === 'npm' ? 'npm install ' : 'yarn add ';
  const componentPackage =
    licenceType === 'pro' ? '@mui/x-date-pickers-pro' : '@mui/x-date-pickers';

  const commandLines = [
    `// Install component (${licenceType} version)`,
    `${installationCLI}${componentPackage}`,
    '',
    `// Install date library (if not already installed)`,
    `${installationCLI}${libraryUsed}`,
  ].join('\n');

  return (
    <Stack sx={{ width: '100%' }} px={{ xs: 3, sm: 0 }}>
      <Stack direction="row" spacing={2}>
        <ToggleButtonGroup
          value={packageManger}
          exclusive
          onChange={handlePackageMangerChange}
          size="small"
        >
          <ToggleButton value="yarn">yarn</ToggleButton>
          <ToggleButton value="npm">npm</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={licenceType}
          exclusive
          onChange={handleLicenceTypeChange}
          size="small"
        >
          <ToggleButton value="community">community</ToggleButton>
          <ToggleButton value="pro">pro</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          size="small"
          label="date-library"
          value={libraryUsed}
          onChange={handleLibraryUsedChange}
          select
        >
          {libraries.map((lib) => (
            <MenuItem value={lib}>{lib}</MenuItem>
          ))}
        </TextField>
      </Stack>
      <HighlightedCode sx={{ width: '100%' }} code={commandLines} language="sh" />
    </Stack>
  );
}
