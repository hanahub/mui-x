import { PickersLocaleText } from './utils/pickersLocaleTextApi';
import { getPickersLocalization } from './utils/getPickersLocalization';
import { CalendarPickerView } from '../internals/models';

const views = {
  hours: 'tunnit',
  minutes: 'minuutit',
  seconds: 'sekuntit',
};

const viewTranslation = {
  calendar: 'kalenteri',
  clock: 'kello',
};

const fiFIPickers: Partial<PickersLocaleText<any>> = {
  // Calendar navigation
  previousMonth: 'Edellinen kuukausi',
  nextMonth: 'Seuraava kuukausi',

  // View navigation
  openPreviousView: 'avaa edellinen kuukausi',
  openNextView: 'avaa seuraava kuukausi',
  calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) =>
    view === 'year'
      ? 'vuosinäkymä on auki, vaihda kalenterinäkymään'
      : 'kalenterinäkymä on auki, vaihda vuosinäkymään',
  inputModeToggleButtonAriaLabel: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
    isKeyboardInputOpen
      ? `tekstikenttä on auki, mene ${viewTranslation[viewType]}näkymään`
      : `${viewTranslation[viewType]}näkymä on auki, mene tekstikenttään`,

  // DateRange placeholders
  start: 'Alku',
  end: 'Loppu',

  // Action bar
  cancelButtonLabel: 'Peruuta',
  clearButtonLabel: 'Tyhjennä',
  okButtonLabel: 'OK',
  todayButtonLabel: 'Tänään',

  // Toolbar titles
  datePickerDefaultToolbarTitle: 'Valitse päivä',
  dateTimePickerDefaultToolbarTitle: 'Valitse päivä ja aika',
  timePickerDefaultToolbarTitle: 'Valitse aika',
  dateRangePickerDefaultToolbarTitle: 'Valitse aikaväli',

  // Clock labels
  clockLabelText: (view, time, adapter) =>
    `Valitse ${views[view]}. ${
      time === null ? 'Ei aikaa valittuna' : `Valittu aika on ${adapter.format(time, 'fullTime')}`
    }`,
  hoursClockNumberText: (hours) => `${hours} tuntia`,
  minutesClockNumberText: (minutes) => `${minutes} minuuttia`,
  secondsClockNumberText: (seconds) => `${seconds} sekunttia`,

  // Open picker labels
  openDatePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Valitse päivä, valittu päivä on ${utils.format(value, 'fullDate')}`
      : 'Valitse päivä',
  openTimePickerDialogue: (value, utils) =>
    value !== null && utils.isValid(value)
      ? `Valitse aika, valittu aika on ${utils.format(value, 'fullTime')}`
      : 'Valitse aika',

  // Table labels
  timeTableLabel: 'valitse aika',
  dateTableLabel: 'valitse päivä',
};

export const fiFI = getPickersLocalization(fiFIPickers);
