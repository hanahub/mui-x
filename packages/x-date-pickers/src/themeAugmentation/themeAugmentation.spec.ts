import { createTheme } from '@mui/material/styles';

createTheme({
  components: {
    MuiCalendarPicker: {
      defaultProps: {
        view: 'day',
        // @ts-expect-error invalid MuiCalendarPicker prop
        someRandomProp: true,
      },
    },
    MuiCalendarPickerSkeleton: {
      defaultProps: {
        className: 'class',
        // @ts-expect-error invalid MuiCalendarPickerSkeleton prop
        someRandomProp: true,
      },
    },
    MuiClockPicker: {
      defaultProps: {
        view: 'hours',
        // @ts-expect-error invalid MuiClockPicker prop
        someRandomProp: true,
      },
    },
    MuiDatePicker: {
      defaultProps: {
        open: true,
        // @ts-expect-error invalid MuiDatePicker prop
        someRandomProp: true,
      },
    },
    MuiDateTimePicker: {
      defaultProps: {
        open: true,
        // @ts-expect-error invalid MuiDateTimePicker prop
        someRandomProp: true,
      },
    },
    MuiDesktopDatePicker: {
      defaultProps: {
        open: true,
        // @ts-expect-error invalid MuiDesktopDatePicker prop
        someRandomProp: true,
      },
    },
    MuiDesktopDateTimePicker: {
      defaultProps: {
        open: true,
        // @ts-expect-error invalid MuiDesktopDateTimePicker prop
        someRandomProp: true,
      },
    },
    MuiDesktopTimePicker: {
      defaultProps: {
        open: true,
        // @ts-expect-error invalid MuiDesktopTimePicker prop
        someRandomProp: true,
      },
    },
    MuiMonthPicker: {
      defaultProps: {
        disableFuture: true,
        // @ts-expect-error invalid MuiMonthPicker prop
        someRandomProp: true,
      },
    },
    MuiPickersDay: {
      defaultProps: {
        disabled: true,
        // @ts-expect-error invalid MuiPickersDay prop
        someRandomProp: true,
      },
    },
    MuiPickerStaticWrapper: {
      defaultProps: {
        open: true,
        // @ts-expect-error invalid MuiPickerStaticWrapper prop
        someRandomProp: true,
      },
    },
    MuiStaticDatePicker: {
      defaultProps: {
        disabled: true,
        // @ts-expect-error invalid MuiStaticDatePicker prop
        someRandomProp: true,
      },
    },
    MuiStaticDateTimePicker: {
      defaultProps: {
        disabled: true,
        // @ts-expect-error invalid MuiStaticDatePicker prop
        someRandomProp: true,
      },
    },
    MuiStaticTimePicker: {
      defaultProps: {
        disabled: true,
        // @ts-expect-error invalid MuiStaticDatePicker prop
        someRandomProp: true,
      },
    },
    MuiYearPicker: {
      defaultProps: {
        disableFuture: true,
        // @ts-expect-error invalid MuiYearPicker prop
        someRandomProp: true,
      },
    },
  },
});
