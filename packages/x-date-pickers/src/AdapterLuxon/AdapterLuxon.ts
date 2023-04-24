/* eslint-disable class-methods-use-this */
import { DateTime, Info } from 'luxon';
import { AdapterFormats, AdapterUnits, FieldFormatTokenMap, MuiPickersAdapter } from '../models';

interface AdapterLuxonOptions {
  formats?: Partial<AdapterFormats>;
  locale?: string;
}

const formatTokenMap: FieldFormatTokenMap = {
  // Year
  y: { sectionType: 'year', contentType: 'digit', maxLength: 4 },
  yy: 'year',
  yyyy: 'year',

  // Month
  L: { sectionType: 'month', contentType: 'digit', maxLength: 2 },
  LL: 'month',
  LLL: { sectionType: 'month', contentType: 'letter' },
  LLLL: { sectionType: 'month', contentType: 'letter' },
  M: { sectionType: 'month', contentType: 'digit', maxLength: 2 },
  MM: 'month',
  MMM: { sectionType: 'month', contentType: 'letter' },
  MMMM: { sectionType: 'month', contentType: 'letter' },

  // Day of the month
  d: { sectionType: 'day', contentType: 'digit', maxLength: 2 },
  dd: 'day',

  // Day of the week
  c: { sectionType: 'weekDay', contentType: 'digit', maxLength: 1 },
  ccc: { sectionType: 'weekDay', contentType: 'letter' },
  cccc: { sectionType: 'weekDay', contentType: 'letter' },
  ccccc: { sectionType: 'weekDay', contentType: 'letter' },
  E: { sectionType: 'weekDay', contentType: 'digit', maxLength: 2 },
  EEE: { sectionType: 'weekDay', contentType: 'letter' },
  EEEE: { sectionType: 'weekDay', contentType: 'letter' },
  EEEEE: { sectionType: 'weekDay', contentType: 'letter' },

  // Meridiem
  a: 'meridiem',

  // Hours
  H: { sectionType: 'hours', contentType: 'digit', maxLength: 2 },
  HH: 'hours',
  h: { sectionType: 'hours', contentType: 'digit', maxLength: 2 },
  hh: 'hours',

  // Minutes
  m: { sectionType: 'minutes', contentType: 'digit', maxLength: 2 },
  mm: 'minutes',

  // Seconds
  s: { sectionType: 'seconds', contentType: 'digit', maxLength: 2 },
  ss: 'seconds',
};

const defaultFormats: AdapterFormats = {
  dayOfMonth: 'd',
  fullDate: 'DD',
  fullDateWithWeekday: 'DDDD',
  fullDateTime: 'ff',
  fullDateTime12h: 'DD, hh:mm a',
  fullDateTime24h: 'DD, T',
  fullTime: 't',
  fullTime12h: 'hh:mm a',
  fullTime24h: 'HH:mm',
  hours12h: 'hh',
  hours24h: 'HH',
  keyboardDate: 'D',
  keyboardDateTime: 'D t',
  keyboardDateTime12h: 'D hh:mm a',
  keyboardDateTime24h: 'D T',
  minutes: 'mm',
  seconds: 'ss',
  month: 'LLLL',
  monthAndDate: 'MMMM d',
  monthAndYear: 'LLLL yyyy',
  monthShort: 'MMM',
  weekday: 'cccc',
  weekdayShort: 'ccc',
  normalDate: 'd MMMM',
  normalDateWithWeekday: 'EEE, MMM d',
  shortDate: 'MMM d',
  year: 'yyyy',
};

/**
 * Based on `@date-io/luxon`
 *
 * MIT License
 *
 * Copyright (c) 2017 Dmitriy Kovalenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
export class AdapterLuxon implements MuiPickersAdapter<DateTime> {
  public isMUIAdapter = true;

  public lib = 'luxon';

  public locale: string;

  public formats: AdapterFormats;

  public escapedCharacters = { start: "'", end: "'" };

  public formatTokenMap = formatTokenMap;

  constructor({ locale, formats }: AdapterLuxonOptions = {}) {
    this.locale = locale || 'en-US';
    this.formats = { ...defaultFormats, ...formats };
  }

  public date = (value?: any) => {
    if (typeof value === 'undefined') {
      return DateTime.local();
    }

    if (value === null) {
      return null;
    }

    if (typeof value === 'string') {
      // @ts-ignore
      return DateTime.fromJSDate(new Date(value), { locale: this.locale });
    }

    if (DateTime.isDateTime(value)) {
      return value;
    }

    // @ts-ignore
    return DateTime.fromJSDate(value, { locale: this.locale });
  };

  public toJsDate = (value: DateTime) => {
    return value.toJSDate();
  };

  public parseISO = (isoString: string) => {
    return DateTime.fromISO(isoString);
  };

  public toISO = (value: DateTime) => {
    return value.toISO({ format: 'extended' })!;
  };

  public parse = (value: string, formatString: string) => {
    if (value === '') {
      return null;
    }

    return DateTime.fromFormat(value, formatString, { locale: this.locale });
  };

  public getCurrentLocaleCode = () => {
    return this.locale;
  };

  /* istanbul ignore next */
  public is12HourCycleInCurrentLocale = () => {
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
      return true; // Luxon defaults to en-US if Intl not found
    }

    return Boolean(
      new Intl.DateTimeFormat(this.locale, { hour: 'numeric' })?.resolvedOptions()?.hour12,
    );
  };

  public expandFormat = (format: string) => {
    if (!DateTime.expandFormat) {
      throw Error(
        'Your luxon version does not support `expandFormat`. Consider upgrading it to v3.0.2',
      );
    }
    // Extract escaped section to avoid extending them
    const longFormatRegexp = /''|'(''|[^'])+('|$)|[^']*/g;
    return (
      format
        .match(longFormatRegexp)!
        .map((token: string) => {
          const firstCharacter = token[0];
          if (firstCharacter === "'") {
            return token;
          }
          return DateTime.expandFormat(token, { locale: this.locale });
        })
        .join('')
        // The returned format can contain `yyyyy` which means year between 4 and 6 digits.
        // This value is supported by luxon parser but not luxon formatter.
        // To avoid conflicts, we replace it by 4 digits which is enough for most use-cases.
        .replace('yyyyy', 'yyyy')
    );
  };

  // Redefined here just to show how it can be written using expandFormat
  public getFormatHelperText = (format: string) => {
    return this.expandFormat(format).replace(/(a)/g, '(a|p)m').toLocaleLowerCase();
  };

  public isNull = (value: DateTime | null) => {
    return value === null;
  };

  public isValid = (value: any): boolean => {
    if (DateTime.isDateTime(value)) {
      return value.isValid;
    }

    if (value === null) {
      return false;
    }

    return this.isValid(this.date(value));
  };

  public format = (value: DateTime, formatKey: keyof AdapterFormats) => {
    return this.formatByString(value, this.formats[formatKey]);
  };

  public formatByString = (value: DateTime, format: string) => {
    return value.setLocale(this.locale).toFormat(format);
  };

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat;
  };

  public getDiff = (value: DateTime, comparing: DateTime | string, unit?: AdapterUnits) => {
    if (typeof comparing === 'string') {
      comparing = DateTime.fromJSDate(new Date(comparing));
    }

    if (unit) {
      return Math.floor(value.diff(comparing).as(unit));
    }
    return value.diff(comparing).as('millisecond');
  };

  public isEqual = (value: any, comparing: any) => {
    if (value === null && comparing === null) {
      return true;
    }

    // Make sure that null will not be passed to this.date
    if (value === null || comparing === null) {
      return false;
    }

    return this.date(value)!.equals(this.date(comparing)!);
  };

  public isSameYear = (value: DateTime, comparing: DateTime) => {
    return value.hasSame(comparing, 'year');
  };

  public isSameMonth = (value: DateTime, comparing: DateTime) => {
    return value.hasSame(comparing, 'month');
  };

  public isSameDay = (value: DateTime, comparing: DateTime) => {
    return value.hasSame(comparing, 'day');
  };

  public isSameHour = (value: DateTime, comparing: DateTime) => {
    return value.hasSame(comparing, 'hour');
  };

  public isAfter = (value: DateTime, comparing: DateTime) => {
    return value > comparing;
  };

  public isAfterYear = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.endOf('year'), 'years').toObject();
    return diff.years! > 0;
  };

  public isAfterDay = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.endOf('day'), 'days').toObject();
    return diff.days! > 0;
  };

  public isBefore = (value: DateTime, comparing: DateTime) => {
    return value < comparing;
  };

  public isBeforeYear = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.startOf('year'), 'years').toObject();
    return diff.years! < 0;
  };

  public isBeforeDay = (value: DateTime, comparing: DateTime) => {
    const diff = value.diff(comparing.startOf('day'), 'days').toObject();
    return diff.days! < 0;
  };

  public isWithinRange = (value: DateTime, [start, end]: [DateTime, DateTime]) => {
    return (
      value.equals(start) ||
      value.equals(end) ||
      (this.isAfter(value, start) && this.isBefore(value, end))
    );
  };

  public startOfYear = (value: DateTime) => {
    return value.startOf('year');
  };

  public startOfMonth = (value: DateTime) => {
    return value.startOf('month');
  };

  public startOfWeek = (value: DateTime) => {
    return value.startOf('week');
  };

  public startOfDay = (value: DateTime) => {
    return value.startOf('day');
  };

  public endOfYear = (value: DateTime) => {
    return value.endOf('year');
  };

  public endOfMonth = (value: DateTime) => {
    return value.endOf('month');
  };

  public endOfWeek = (value: DateTime) => {
    return value.endOf('week');
  };

  public endOfDay = (value: DateTime) => {
    return value.endOf('day');
  };

  public addYears = (value: DateTime, amount: number) => {
    return value.plus({ years: amount });
  };

  public addMonths = (value: DateTime, amount: number) => {
    return value.plus({ months: amount });
  };

  public addWeeks = (value: DateTime, amount: number) => {
    return value.plus({ weeks: amount });
  };

  public addDays = (value: DateTime, amount: number) => {
    return value.plus({ days: amount });
  };

  public addHours = (value: DateTime, amount: number) => {
    return value.plus({ hours: amount });
  };

  public addMinutes = (value: DateTime, amount: number) => {
    return value.plus({ minutes: amount });
  };

  public addSeconds = (value: DateTime, amount: number) => {
    return value.plus({ seconds: amount });
  };

  public getYear = (value: DateTime) => {
    return value.get('year');
  };

  public getMonth = (value: DateTime) => {
    // See https://github.com/moment/luxon/blob/master/docs/moment.md#major-functional-differences
    return value.get('month') - 1;
  };

  public getDate = (value: DateTime) => {
    return value.get('day');
  };

  public getHours = (value: DateTime) => {
    return value.get('hour');
  };

  public getMinutes = (value: DateTime) => {
    return value.get('minute');
  };

  public getSeconds = (value: DateTime) => {
    return value.get('second');
  };

  public setYear = (value: DateTime, year: number) => {
    return value.set({ year });
  };

  public setMonth = (value: DateTime, month: number) => {
    return value.set({ month: month + 1 });
  };

  public setDate = (value: DateTime, date: number) => {
    return value.set({ day: date });
  };

  public setHours = (value: DateTime, hours: number) => {
    return value.set({ hour: hours });
  };

  public setMinutes = (value: DateTime, minutes: number) => {
    return value.set({ minute: minutes });
  };

  public setSeconds = (value: DateTime, seconds: number) => {
    return value.set({ second: seconds });
  };

  public getDaysInMonth = (value: DateTime) => {
    return value.daysInMonth!;
  };

  public getNextMonth = (value: DateTime) => {
    return value.plus({ months: 1 });
  };

  public getPreviousMonth = (value: DateTime) => {
    return value.minus({ months: 1 });
  };

  public getMonthArray = (value: DateTime) => {
    const firstMonth = value.startOf('year');
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  };

  public mergeDateAndTime = (dateParam: DateTime, timeParam: DateTime) => {
    return dateParam.set({
      second: timeParam.second,
      hour: timeParam.hour,
      minute: timeParam.minute,
    });
  };

  public getWeekdays = () => {
    return Info.weekdaysFormat('narrow', { locale: this.locale });
  };

  public getWeekArray = (value: DateTime) => {
    const { days } = value
      .endOf('month')
      .endOf('week')
      .diff(value.startOf('month').startOf('week'), 'days')
      .toObject();

    const weeks: DateTime[][] = [];
    new Array<number>(Math.round(days!))
      .fill(0)
      .map((_, i) => i)
      .map((day) => value.startOf('month').startOf('week').plus({ days: day }))
      .forEach((v, i) => {
        if (i === 0 || (i % 7 === 0 && i > 6)) {
          weeks.push([v]);
          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    return weeks;
  };

  public getWeekNumber = (value: DateTime) => {
    return value.weekNumber;
  };

  public getYearRange = (start: DateTime, end: DateTime) => {
    const startDate = start.startOf('year');
    const endDate = end.endOf('year');

    let current = startDate;
    const years: DateTime[] = [];

    while (current < endDate) {
      years.push(current);
      current = current.plus({ year: 1 });
    }

    return years;
  };

  public getMeridiemText = (ampm: 'am' | 'pm') => {
    return Info.meridiems({ locale: this.locale }).find(
      (v) => v.toLowerCase() === ampm.toLowerCase(),
    )!;
  };
}
