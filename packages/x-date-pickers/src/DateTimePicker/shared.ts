import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { useDefaultDates, useUtils } from '../internals/hooks/useUtils';
import { ExportedClockPickerProps } from '../ClockPicker/ClockPicker';
import { ExportedDateCalendarProps } from '../DateCalendar/DateCalendar';
import { DateTimeValidationError } from '../internals/hooks/validation/useDateTimeValidation';
import { ValidationCommonProps } from '../internals/hooks/validation/useValidation';
import { BasePickerProps } from '../internals/models/props/basePickerProps';
import { ExportedDateInputProps } from '../internals/components/PureDateInput';
import { CalendarOrClockPickerView } from '../internals/models';
import { PickerStateValueManager } from '../internals/hooks/usePickerState';
import { applyDefaultDate, replaceInvalidDateByNull } from '../internals/utils/date-utils';
import { DefaultizedProps } from '../internals/models/helpers';
import {
  BaseDateValidationProps,
  BaseTimeValidationProps,
} from '../internals/hooks/validation/models';
import {
  CalendarOrClockPickerSlotsComponent,
  CalendarOrClockPickerSlotsComponentsProps,
} from '../internals/components/CalendarOrClockPicker';
import {
  DateTimePickerToolbar,
  DateTimePickerToolbarProps,
  ExportedDateTimeToolbarProps,
} from './DateTimePickerToolbar';
import { LocalizedComponent, PickersInputLocaleText } from '../locales/utils/pickersLocaleTextApi';

export interface BaseDateTimePickerSlotsComponent<TDate>
  extends CalendarOrClockPickerSlotsComponent<TDate> {
  /**
   * Custom component for the toolbar rendered above the views.
   * @default DateTimePickerToolbar
   */
  Toolbar?: React.JSXElementConstructor<DateTimePickerToolbarProps<TDate>>;
}

export interface BaseDateTimePickerSlotsComponentsProps<TDate>
  extends CalendarOrClockPickerSlotsComponentsProps<TDate> {
  toolbar?: ExportedDateTimeToolbarProps;
}

export interface BaseDateTimePickerProps<TDate>
  extends ExportedClockPickerProps<TDate>,
    ExportedDateCalendarProps<TDate>,
    BasePickerProps<TDate | null, TDate>,
    ValidationCommonProps<DateTimeValidationError, TDate | null>,
    ExportedDateInputProps<TDate> {
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm?: boolean;
  /**
   * Toggles visibility of date time switching tabs
   * @default false for mobile, true for desktop
   */
  hideTabs?: boolean;
  /**
   * Date tab icon.
   */
  dateRangeIcon?: React.ReactNode;
  /**
   * Time tab icon.
   */
  timeIcon?: React.ReactNode;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime?: TDate;
  /**
   * Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime?: TDate;
  /**
   * Callback fired on view change.
   * @param {CalendarOrClockPickerView} view The new view.
   */
  onViewChange?: (view: CalendarOrClockPickerView) => void;
  /**
   * First view to show.
   * Must be a valid option from `views` list
   * @default 'day'
   */
  openTo?: CalendarOrClockPickerView;
  /**
   * Array of views to show.
   * @default ['year', 'day', 'hours', 'minutes']
   */
  views?: readonly CalendarOrClockPickerView[];
  /**
   * Overrideable components.
   * @default {}
   */
  components?: BaseDateTimePickerSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: BaseDateTimePickerSlotsComponentsProps<TDate>;
}

export function useDateTimePickerDefaultizedProps<
  TDate,
  Props extends BaseDateTimePickerProps<TDate>,
>(
  props: Props,
  name: string,
): LocalizedComponent<
  TDate,
  DefaultizedProps<
    Props,
    'openTo' | 'views' | keyof BaseDateValidationProps<TDate> | keyof BaseTimeValidationProps,
    { inputFormat: string }
  >
> {
  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const themeProps = useThemeProps({
    props,
    name,
  });

  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();
  const ampm = themeProps.ampm ?? utils.is12HourCycleInCurrentLocale();

  if (themeProps.orientation != null && themeProps.orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  const localeText = React.useMemo<PickersInputLocaleText<TDate> | undefined>(() => {
    if (themeProps.localeText?.toolbarTitle == null) {
      return themeProps.localeText;
    }

    return {
      ...themeProps.localeText,
      dateTimePickerToolbarTitle: themeProps.localeText.toolbarTitle,
    };
  }, [themeProps.localeText]);

  return {
    ampm,
    orientation: 'portrait',
    openTo: 'day',
    views: ['year', 'day', 'hours', 'minutes'],
    ampmInClock: true,
    acceptRegex: ampm ? /[\dap]/gi : /\d/gi,
    disableMaskedInput: false,
    inputFormat: ampm ? utils.formats.keyboardDateTime12h : utils.formats.keyboardDateTime24h,
    disableIgnoringDatePartForTimeValidation: Boolean(
      themeProps.minDateTime || themeProps.maxDateTime,
    ),
    disablePast: false,
    disableFuture: false,
    ...themeProps,
    minDate: applyDefaultDate(
      utils,
      themeProps.minDateTime ?? themeProps.minDate,
      defaultDates.minDate,
    ),
    maxDate: applyDefaultDate(
      utils,
      themeProps.maxDateTime ?? themeProps.maxDate,
      defaultDates.maxDate,
    ),
    minTime: themeProps.minDateTime ?? themeProps.minTime,
    maxTime: themeProps.maxDateTime ?? themeProps.maxTime,
    localeText,
    components: {
      Toolbar: DateTimePickerToolbar,
      ...themeProps.components,
    },
    componentsProps: {
      ...themeProps.componentsProps,
      toolbar: {
        ampm,
        ampmInClock: themeProps.ampmInClock,
        ...themeProps.componentsProps?.toolbar,
      },
    },
  };
}

export const dateTimePickerValueManager: PickerStateValueManager<any, any> = {
  emptyValue: null,
  getTodayValue: (utils) => utils.date()!,
  cleanValue: replaceInvalidDateByNull,
  areValuesEqual: (utils, a, b) => utils.isEqual(a, b),
};
