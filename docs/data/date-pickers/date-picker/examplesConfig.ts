import { StaticDatePicker, StaticDatePickerProps } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { PickersSubcomponentType } from 'docsx/src/modules/utils/useCustomizationPlayground';

type PickerExamplesType<TComponent, TComponentProps> = {
  name: string;
  component: TComponent;
  componentProps: TComponentProps;
  examples: PickersSubcomponentType;
};

export const staticDatePickerExamples: PickersSubcomponentType = {
  PickersToolbar: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },
      styledComponents: {
        type: 'success',
      },
    },
    slots: ['root', 'content'],
  },
  DateCalendar: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },
      styledComponents: {
        type: 'success',
      },
    },
    slots: ['root'],
  },
  PickersCalendarHeader: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },
      styledComponents: {
        type: 'success',
      },
    },
    slots: ['root', 'label', 'labelContainer', 'switchViewButton', 'switchViewIcon'],
  },
  DayCalendar: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },

      styledComponents: {
        type: 'success',
      },
    },
    slots: ['root', 'weekDayLabel', 'weekContainer', 'weekNumberLabel', 'weekNumber'],
  },
  PickersDay: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },

      styledComponents: {
        type: 'success',
      },
    },
    slots: ['root', 'today'],
  },
  MonthCalendar: {
    examples: {
      customTheme: {
        type: 'success',
        componentProps: { views: ['month'] },
      },
      sxProp: {
        type: 'success',
        componentProps: { views: ['month'] },
      },

      styledComponents: {
        type: 'success',
        componentProps: { views: ['month'] },
      },
    },
    slots: ['root'],
  },
  PickersMonth: {
    examples: {
      customTheme: {
        type: 'success',
        componentProps: { views: ['month'] },
      },
      sxProp: {
        type: 'success',
        componentProps: { views: ['month'] },
      },

      styledComponents: {
        type: 'success',
        componentProps: { views: ['month'] },
      },
    },
    slots: ['root', 'monthButton'],
  },
};

export const datePickerExamples: PickersSubcomponentType = {
  DateCalendar: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },

      styledComponents: {
        type: 'warning',
        comments:
          'You will need to specify the `disablePortal` prop for the popper in order to be able to use `DesktopDatePicker` as a styled component ',
        componentProps: { slotProps: { popper: { disablePortal: true } } },
      },
    },
    slots: ['root'],
  },
  PickersCalendarHeader: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },

      styledComponents: {
        type: 'warning',
        comments:
          'You will need to specify the `disablePortal` prop for the popper in order to be able to use `DesktopDatePicker` as a styled component ',
        componentProps: { slotProps: { popper: { disablePortal: true } } },
      },
    },
    slots: ['root', 'label', 'labelContainer', 'switchViewButton', 'switchViewIcon'],
  },
  DayCalendar: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },

      styledComponents: {
        type: 'warning',
        comments:
          'You will need to specify the `disablePortal` prop for the popper in order to be able to use `DesktopDatePicker` as a styled component ',
        componentProps: { slotProps: { popper: { disablePortal: true } } },
      },
    },
    slots: ['root', 'weekDayLabel', 'weekContainer', 'weekNumberLabel', 'weekNumber'],
  },
  PickersDay: {
    examples: {
      customTheme: {
        type: 'success',
      },
      sxProp: {
        type: 'success',
      },

      styledComponents: {
        type: 'warning',
        comments:
          'You will need to specify the `disablePortal` prop for the popper in order to be able to use `DesktopDatePicker` as a styled component ',
        componentProps: { slotProps: { popper: { disablePortal: true } } },
      },
    },
    slots: ['root', 'today'],
  },
};

const pickerProps: DatePickerProps<Dayjs> = {
  views: ['day', 'month', 'year'],
  monthsPerRow: 3,
  yearsPerRow: 3,
  minDate: dayjs(new Date(2020, 0, 1)),
  maxDate: dayjs(new Date(2028, 12, 31)),
  displayWeekNumber: true,
};

export const pickerExamples = [
  {
    name: 'StaticDatePicker',
    component: StaticDatePicker,
    componentProps: { ...pickerProps, orientation: 'portrait' },
    examples: staticDatePickerExamples,
  } as PickerExamplesType<typeof StaticDatePicker, StaticDatePickerProps<Dayjs>>,
  {
    name: 'DesktopDatePicker',
    component: DesktopDatePicker,
    componentProps: {
      open: true,
      reduceAnimations: true,
      slotProps: {
        popper: {
          sx: { zIndex: 1 },
          disablePortal: true,
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-start'],
              },
            },
          ],
        },
      },
      ...pickerProps,
    },
    examples: datePickerExamples,
  } as PickerExamplesType<typeof DesktopDatePicker, DesktopDatePickerProps<Dayjs>>,
];
