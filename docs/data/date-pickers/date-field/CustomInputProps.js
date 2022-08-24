import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Close';

export default function CustomInputProps() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2} sx={(theme) => ({ width: theme.spacing(48) })}>
        <DateField
          label="Custom variant"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          variant="filled"
        />
        <DateField
          label="Disabled"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          disabled
        />
        <DateField
          label="Read only"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          readOnly
        />
        <DateField
          label="Clearable"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          InputProps={{
            endAdornment: (
              <IconButton size="small" onClick={() => setValue(null)}>
                <CancelIcon />
              </IconButton>
            ),
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
