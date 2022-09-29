import * as React from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import { Unstable_TimeField as TimeField } from '@mui/x-date-pickers/TimeField';
import { Unstable_DateTimeField as DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { Unstable_SingleInputDateRangeField as SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { Unstable_MultiInputDateRangeField as MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';

const GridItem = ({
  label,
  children,
  spacing = 1,
}: {
  label: string;
  children: React.ReactNode;
  spacing?: number;
}) => {
  return (
    <Grid xs={12} item>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" sx={{ mb: spacing }}>
          {label}
        </Typography>
        {children}
      </Box>
    </Grid>
  );
};

const date1 = dayjs('2022-04-07T14:30:22');
const date2 = dayjs('2022-04-12T18:25:14');

export default function FieldExamples() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={4} width={550}>
        <GridItem label="DateField">
          <DateField defaultValue={date1} />
        </GridItem>
        <GridItem label="TimeField">
          <TimeField defaultValue={date1} />
        </GridItem>
        <GridItem label="DateTimeField">
          <DateTimeField defaultValue={date1} />
        </GridItem>
        <GridItem label="SingleInputDateRangeField">
          <SingleInputDateRangeField defaultValue={[date1, date2]} />
        </GridItem>
        <GridItem label="MultiInputDateRangeField">
          <MultiInputDateRangeField defaultValue={[date1, date2]} />
        </GridItem>
      </Grid>
    </LocalizationProvider>
  );
}
