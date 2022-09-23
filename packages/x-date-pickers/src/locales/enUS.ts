import { PickersLocaleText } from './utils/pickersLocaleTextApi';
import { getPickersLocalization } from './utils/getPickersLocalization';
import { CalendarPickerView } from '../internals/models';

// This object is not Partial<PickersLocaleText> because it is the default values

const enUSPickers: PickersLocaleText<any> = {
  // Calendar navigation
  previousMonth: 'Previous month',
  nextMonth: 'Next month',

  // View navigation
  openPreviousView: 'open previous view',
  openNextView: 'open next view',
  calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) =>
    view === 'year'
      ? 'year view is open, switch to calendar view'
      : 'calendar view is open, switch to year view',
  inputModeToggleButtonAriaLabel: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
    isKeyboardInputOpen
      ? `text input view is open, go to ${viewType} view`
      : `${viewType} view is open, go to text input view`,

  // DateRange placeholders
  start: 'Start',
  end: 'End',

  // Action bar
  cancelButtonLabel: 'Cancel',
  clearButtonLabel: 'Clear',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Today',

  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Select date',
  dateTimePickerDefaultToolbarTitle: 'Select date & time',
  timePickerDefaultToolbarTitle: 'Select time',
  dateRangePickerDefaultToolbarTitle: 'Select date range',

  // Clock labels
  clockLabelText: (view, time, adapter) =>
    `Select ${view}. ${
      time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
    }`,
  hoursClockNumberText: (hours) => `${hours} hours`,
  minutesClockNumberText: (minutes) => `${minutes} minutes`,
  secondsClockNumberText: (seconds) => `${seconds} seconds`,

  // Open picker labels
  openDatePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Choose date, selected date is ${utils.format(value, 'fullDate')}`
      : 'Choose date',
  openTimePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Choose time, selected time is ${utils.format(value, 'fullTime')}`
      : 'Choose time',

  // Table labels
  timeTableLabel: 'pick time',
  dateTableLabel: 'pick date',
};

export const DEFAULT_LOCALE = enUSPickers;

export const enUS = getPickersLocalization(enUSPickers);
