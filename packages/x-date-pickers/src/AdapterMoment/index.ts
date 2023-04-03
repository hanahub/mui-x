/* eslint-disable class-methods-use-this */
import defaultMoment, { LongDateFormatKey } from 'moment';
import BaseAdapterMoment from '@date-io/moment';
import { FieldFormatTokenMap, MuiPickersAdapter } from '../models';

// From https://momentjs.com/docs/#/displaying/format/
const formatTokenMap: FieldFormatTokenMap = {
  // Year
  Y: 'year',
  YY: 'year',
  YYYY: 'year',

  // Month
  M: 'month',
  MM: 'month',
  MMM: { sectionType: 'month', contentType: 'letter' },
  MMMM: { sectionType: 'month', contentType: 'letter' },

  // Day of the month
  D: 'day',
  DD: 'day',
  Do: 'day',

  // Day of the week
  E: 'weekDay',
  e: 'weekDay',
  d: 'weekDay',
  dd: { sectionType: 'weekDay', contentType: 'letter' },
  ddd: { sectionType: 'weekDay', contentType: 'letter' },
  dddd: { sectionType: 'weekDay', contentType: 'letter' },

  // Meridiem
  A: 'meridiem',
  a: 'meridiem',

  // Hours
  H: 'hours',
  HH: 'hours',
  h: 'hours',
  hh: 'hours',
  k: 'hours',
  kk: 'hours',

  // Minutes
  m: 'minutes',
  mm: 'minutes',

  // Seconds
  s: 'seconds',
  ss: 'seconds',
};

export class AdapterMoment
  extends BaseAdapterMoment
  implements MuiPickersAdapter<defaultMoment.Moment>
{
  public isMUIAdapter = true;

  public formatTokenMap = formatTokenMap;

  public escapedCharacters = { start: '[', end: ']' };

  /**
   * The current getFormatHelperText method uses an outdated format parsing logic.
   * We should use this one in the future to support all localized formats.
   */
  public expandFormat = (format: string) => {
    // @see https://github.com/moment/moment/blob/develop/src/lib/format/format.js#L6
    const localFormattingTokens = /(\[[^[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})|./g;

    return format
      .match(localFormattingTokens)!
      .map((token) => {
        const firstCharacter = token[0];
        if (firstCharacter === 'L' || firstCharacter === ';') {
          return defaultMoment
            .localeData(this.getCurrentLocaleCode())
            .longDateFormat(token as LongDateFormatKey);
        }

        return token;
      })
      .join('');
  };

  public getCurrentLocaleCode = () => {
    return this.locale || defaultMoment.locale();
  };

  // Redefined here just to show how it can be written using expandFormat
  public getFormatHelperText = (format: string) => {
    return this.expandFormat(format).replace(/a/gi, '(a|p)m').toLocaleLowerCase();
  };

  public getWeekNumber = (date: defaultMoment.Moment) => {
    return date.week();
  };

  public getWeekdays = () => {
    return defaultMoment.weekdaysShort(true);
  };

  public is12HourCycleInCurrentLocale = () => {
    return /A|a/.test(defaultMoment.localeData(this.getCurrentLocaleCode()).longDateFormat('LT'));
  };
}
