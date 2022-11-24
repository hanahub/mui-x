import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

export default function SubComponentsTimeCalendars() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07T10:15'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeClock value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
}
