import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import Stack from '@mui/material/Stack';
import frFR from 'date-fns/locale/fr';

export default function LocalizedDateField() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2} sx={(theme) => ({ width: theme.spacing(48) })}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frFR}>
          <DateField
            label="French locale (default format)"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
          <DateField
            label="French locale (full letter month)"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            format="dd MMMM yyyy"
          />
        </LocalizationProvider>
      </Stack>
    </LocalizationProvider>
  );
}
