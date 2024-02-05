import {
  useUtils,
  useDefaultDates,
  applyDefaultDate,
  useField,
  splitFieldInternalAndForwardedProps,
} from '@mui/x-date-pickers/internals';
import { PickerValidDate } from '@mui/x-date-pickers/models';
import {
  UseSingleInputDateRangeFieldComponentProps,
  UseSingleInputDateRangeFieldDefaultizedProps,
  UseSingleInputDateRangeFieldProps,
} from './SingleInputDateRangeField.types';
import { rangeValueManager, rangeFieldValueManager } from '../internals/utils/valueManagers';
import { validateDateRange } from '../internals/utils/validation/validateDateRange';

export const useDefaultizedDateRangeFieldProps = <
  TDate extends PickerValidDate,
  AdditionalProps extends {},
>(
  props: UseSingleInputDateRangeFieldProps<TDate>,
): UseSingleInputDateRangeFieldDefaultizedProps<TDate, AdditionalProps> => {
  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();

  return {
    ...props,
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate),
  } as any;
};

export const useSingleInputDateRangeField = <TDate extends PickerValidDate, TChildProps extends {}>(
  inProps: UseSingleInputDateRangeFieldComponentProps<TDate, TChildProps>,
) => {
  const props = useDefaultizedDateRangeFieldProps<TDate, TChildProps>(inProps);

  const { forwardedProps, internalProps } = splitFieldInternalAndForwardedProps<
    typeof props,
    keyof UseSingleInputDateRangeFieldProps<any>
  >(props, 'date');

  return useField({
    forwardedProps,
    internalProps,
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateRange,
    valueType: 'date',
  });
};
