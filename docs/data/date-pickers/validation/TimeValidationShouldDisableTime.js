import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from 'docsx/src/modules/components/DemoContainer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Unstable_NextTimePicker as NextTimePicker } from '@mui/x-date-pickers/NextTimePicker';
import { Unstable_NextDateTimePicker as NextDateTimePicker } from '@mui/x-date-pickers/NextDateTimePicker';

const shouldDisableTime = (value, view) =>
  view === 'minutes' && value.minute() >= 45;

const defaultValue = dayjs().set('hour', 10).set('minute', 50).startOf('minute');

export default function TimeValidationShouldDisableTime() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer>
        <DemoItem label="TimePicker">
          <NextTimePicker
            defaultValue={defaultValue}
            shouldDisableTime={shouldDisableTime}
          />
        </DemoItem>
        <DemoItem label="DateTimePicker">
          <NextDateTimePicker
            defaultValue={defaultValue}
            shouldDisableTime={shouldDisableTime}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
