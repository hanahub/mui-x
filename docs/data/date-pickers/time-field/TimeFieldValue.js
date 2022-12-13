import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from 'docsx/src/modules/components/DemoContainer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Unstable_TimeField as TimeField } from '@mui/x-date-pickers/TimeField';

export default function TimeFieldValue() {
  const [value, setValue] = React.useState(dayjs('2022-04-07T15:30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer>
        <TimeField
          label="Uncontrolled field"
          defaultValue={dayjs('2022-04-07T15:30')}
        />
        <TimeField
          label="Controlled field"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
