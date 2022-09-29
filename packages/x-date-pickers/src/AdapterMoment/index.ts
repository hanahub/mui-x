import defaultMoment, { LongDateFormatKey } from 'moment';
import BaseAdapterMoment from '@date-io/moment';
import { MuiFormatTokenMap, MuiPickerFieldAdapter } from '../internals/models';

// From https://momentjs.com/docs/#/displaying/format/
const formatTokenMap: MuiFormatTokenMap = {
  // Month
  M: 'month',
  Mo: 'month',
  MM: 'month',
  MMM: { sectionName: 'month', contentType: 'letter' },
  MMMM: { sectionName: 'month', contentType: 'letter' },

  // Day of Month
  D: 'day',
  Do: 'day',
  DD: 'day',

  // Year
  Y: 'year',
  YY: 'year',
  YYYY: 'year',
  YYYYYY: 'year',

  // AM / PM
  A: 'am-pm',
  a: 'am-pm',

  // Hour
  H: 'hour',
  HH: 'hour',
  h: 'hour',
  hh: 'hour',
  k: 'hour',
  kk: 'hour',

  // Minute
  m: 'minute',
  mm: 'minute',

  // Second
  s: 'second',
  ss: 'second',
};

export class AdapterMoment
  extends BaseAdapterMoment
  implements MuiPickerFieldAdapter<defaultMoment.Moment>
{
  public formatTokenMap = formatTokenMap;

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
          return this.moment.localeData().longDateFormat(token as LongDateFormatKey);
        }

        return token;
      })
      .join('');
  };

  // Redefined here just to show how it can be written using expandFormat
  public getFormatHelperText = (format: string) => {
    return this.expandFormat(format).replace(/a/gi, '(a|p)m').toLocaleLowerCase();
  };
}
