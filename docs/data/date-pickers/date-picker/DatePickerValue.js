import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Unstable_NextDatePicker as NextDatePicker } from '@mui/x-date-pickers/NextDatePicker';

export default function DatePickerValue() {
  const [value, setValue] = React.useState(dayjs('2022-04-07'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} direction="row">
        <NextDatePicker
          label="Uncontrolled picker"
          defaultValue={dayjs('2022-04-07')}
        />
        <NextDatePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Stack>
    </LocalizationProvider>
  );
}
