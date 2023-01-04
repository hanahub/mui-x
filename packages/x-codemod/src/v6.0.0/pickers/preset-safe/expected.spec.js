import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <DateCalendar value={null} onChange={() => {}} />
        <DateRangePicker
          localeText={{
            cancelButtonLabel: custom_cancelText,
            okButtonLabel: "string_okText"
          }} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
