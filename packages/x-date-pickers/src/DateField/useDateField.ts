import { datePickerValueManager } from '../DatePicker/shared';
import {
  useField,
  FieldValueManager,
  FieldSection,
  splitFormatIntoSections,
  addPositionPropertiesToSections,
  createDateStrFromSections,
} from '../internals/hooks/useField';
import { UseDateFieldProps, UseDateFieldDefaultizedProps } from './DateField.interfaces';
import { DateValidationError, validateDate } from '../internals/hooks/validation/useDateValidation';
import { parseNonNullablePickerDate } from '../internals/utils/date-utils';
import { useUtils, useDefaultDates } from '../internals/hooks/useUtils';

const dateRangeFieldValueManager: FieldValueManager<any, any, FieldSection, DateValidationError> = {
  getSectionsFromValue: (utils, prevSections, date, format) =>
    addPositionPropertiesToSections(splitFormatIntoSections(utils, format, date)),
  getValueStrFromSections: (sections) => createDateStrFromSections(sections),
  getValueFromSections: (utils, prevSections, sections, format) => {
    const dateStr = createDateStrFromSections(sections);
    const value = utils.parse(dateStr, format);

    return {
      value,
      shouldPublish: utils.isValid(value),
    };
  },
  getActiveDateFromActiveSection: (value) => ({
    value,
    update: (newActiveDate) => newActiveDate,
  }),
  hasError: (error) => error != null,
};

const useDefaultizedDateField = <TInputDate, TDate, AdditionalProps extends {}>(
  props: UseDateFieldProps<TInputDate, TDate>,
): AdditionalProps & UseDateFieldDefaultizedProps<TInputDate, TDate> => {
  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();

  return {
    disablePast: false,
    disableFuture: false,
    ...props,
    minDate: parseNonNullablePickerDate(utils, props.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, props.maxDate, defaultDates.maxDate),
  } as any;
};

export const useDateField = <
  TInputDate,
  TDate,
  TProps extends UseDateFieldProps<TInputDate, TDate>,
>(
  inProps: TProps,
) => {
  const props = useDefaultizedDateField<TInputDate, TDate, TProps>(inProps);

  return useField({
    props,
    valueManager: datePickerValueManager,
    fieldValueManager: dateRangeFieldValueManager,
    // TODO: Support time validation.
    validator: validateDate,
  });
};
