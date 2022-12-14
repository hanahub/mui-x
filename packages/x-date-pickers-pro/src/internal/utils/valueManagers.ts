import {
  PickerStateValueManager,
  replaceInvalidDateByNull,
  FieldValueManager,
  splitFormatIntoSections,
  addPositionPropertiesToSections,
  createDateStrFromSections,
  getSectionOrder,
} from '@mui/x-date-pickers/internals';
import { DateRange } from '../models/range';
import { splitDateRangeSections, removeLastSeparator } from './date-fields-utils';
import type { DateRangeValidationError } from '../hooks/validation/useDateRangeValidation';
import type { TimeRangeValidationError } from '../hooks/validation/useTimeRangeValidation';
import type { DateTimeRangeValidationError } from '../hooks/validation/useDateTimeRangeValidation';
import { RangeFieldSection, RangeFieldSectionWithoutPosition } from '../models/fields';

export type RangePickerStateValueManager<
  TValue = [any, any],
  TDate = any,
  TError extends
    | DateRangeValidationError
    | TimeRangeValidationError
    | DateTimeRangeValidationError = any,
> = PickerStateValueManager<TValue, TDate, TError>;

export const rangeValueManager: RangePickerStateValueManager = {
  emptyValue: [null, null],
  getTodayValue: (utils) => [utils.date()!, utils.date()!],
  cleanValue: (utils, value) =>
    value.map((date) => replaceInvalidDateByNull(utils, date)) as DateRange<any>,
  areValuesEqual: (utils, a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
  isSameError: (a, b) => b !== null && a[1] === b[1] && a[0] === b[0],
  defaultErrorState: [null, null],
};

export const rangeFieldValueManager: FieldValueManager<
  DateRange<any>,
  any,
  RangeFieldSection,
  DateRangeValidationError | TimeRangeValidationError | DateTimeRangeValidationError
> = {
  updateReferenceValue: (utils, value, prevReferenceValue) => {
    const shouldKeepStartDate = value[0] != null && utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && utils.isValid(value[1]);

    if (!shouldKeepStartDate && !shouldKeepEndDate) {
      return prevReferenceValue;
    }

    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }

    if (shouldKeepStartDate) {
      return [value[0], prevReferenceValue[0]];
    }

    return [prevReferenceValue[1], value[1]];
  },
  getSectionsFromValue: (utils, localeText, prevSections, [start, end], format) => {
    const prevDateRangeSections =
      prevSections == null
        ? { startDate: null, endDate: null }
        : splitDateRangeSections(prevSections);

    const getSections = (newDate: any | null, prevDateSections: RangeFieldSection[] | null) => {
      const shouldReUsePrevDateSections = !utils.isValid(newDate) && !!prevDateSections;

      if (shouldReUsePrevDateSections) {
        return prevDateSections;
      }

      return splitFormatIntoSections(utils, localeText, format, newDate);
    };

    const rawSectionsOfStartDate = getSections(start, prevDateRangeSections.startDate);
    const rawSectionsOfEndDate = getSections(end, prevDateRangeSections.endDate);

    const sectionsOfStartDate: RangeFieldSectionWithoutPosition[] = rawSectionsOfStartDate.map(
      (section, sectionIndex) => {
        if (sectionIndex === rawSectionsOfStartDate.length - 1) {
          return {
            ...section,
            dateName: 'start',
            separator: `\u2069 – \u2066`,
            parsingSeparator: ' – ',
          };
        }

        return {
          ...section,
          dateName: 'start' as const,
        };
      },
    );

    const sectionsOfEndDate: RangeFieldSectionWithoutPosition[] = rawSectionsOfEndDate.map(
      (section) => ({
        ...section,
        dateName: 'end',
      }),
    );

    return addPositionPropertiesToSections<RangeFieldSection>([
      ...sectionsOfStartDate,
      ...sectionsOfEndDate,
    ]);
  },
  getValueStrFromSections: (sections) => {
    const dateRangeSections = splitDateRangeSections(sections);
    return createDateStrFromSections(
      [...dateRangeSections.startDate, ...dateRangeSections.endDate],
      true,
    );
  },
  getActiveDateSections: (sections, activeSection) => {
    const index = activeSection.dateName === 'start' ? 0 : 1;
    const dateRangeSections = splitDateRangeSections(sections);

    return index === 0
      ? removeLastSeparator(dateRangeSections.startDate)
      : dateRangeSections.endDate;
  },
  parseValueStr: (valueStr, referenceValue, parseDate) => {
    // TODO: Improve because it would not work if the date format has `–` as a separator.
    const [startStr, endStr] = valueStr.split('–');

    return [startStr, endStr].map((dateStr, index) => {
      if (dateStr == null) {
        return null;
      }

      return parseDate(dateStr.trim(), referenceValue[index]);
    }) as DateRange<any>;
  },
  getActiveDateManager: (utils, state, activeSection) => {
    const index = activeSection.dateName === 'start' ? 0 : 1;

    const updateDateInRange = (newDate: any, prevDateRange: DateRange<any>) =>
      (index === 0 ? [newDate, prevDateRange[1]] : [prevDateRange[0], newDate]) as DateRange<any>;

    return {
      activeDate: state.value[index],
      referenceActiveDate: state.referenceValue[index],
      getNewValueFromNewActiveDate: (newActiveDate) => ({
        value: updateDateInRange(newActiveDate, state.value),
        referenceValue:
          newActiveDate == null || !utils.isValid(newActiveDate)
            ? state.referenceValue
            : updateDateInRange(newActiveDate, state.referenceValue),
      }),
    };
  },
  hasError: (error) => error[0] != null || error[1] != null,
  getSectionOrder: (utils, localeText, format, isRTL) => {
    const splitedFormat = splitFormatIntoSections(utils, localeText, format, null);
    return getSectionOrder(
      [
        ...splitedFormat.slice(0, splitedFormat.length - 1),
        { ...splitedFormat[splitedFormat.length - 1], separator: ' – ' },
        ...splitedFormat,
      ],
      isRTL,
    );
  },
};
