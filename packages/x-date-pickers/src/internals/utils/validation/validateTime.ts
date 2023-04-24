import { createIsAfterIgnoreDatePart } from '../time-utils';
import { Validator } from '../../hooks/useValidation';
import { BaseTimeValidationProps, TimeValidationProps } from '../../models/validation';
import { TimeValidationError } from '../../../models';

export interface TimeComponentValidationProps<TDate>
  extends Required<BaseTimeValidationProps>,
    TimeValidationProps<TDate> {}

export const validateTime: Validator<
  any | null,
  any,
  TimeValidationError,
  TimeComponentValidationProps<any>
> = ({ adapter, value, props }): TimeValidationError => {
  const {
    minTime,
    maxTime,
    minutesStep,
    shouldDisableClock,
    shouldDisableTime,
    disableIgnoringDatePartForTimeValidation = false,
    disablePast,
    disableFuture,
  } = props;

  const now = adapter.utils.date()!;
  const date = adapter.utils.date(value);
  const isAfter = createIsAfterIgnoreDatePart(
    disableIgnoringDatePartForTimeValidation,
    adapter.utils,
  );

  if (value === null) {
    return null;
  }

  switch (true) {
    case !adapter.utils.isValid(value):
      return 'invalidDate';

    case Boolean(minTime && isAfter(minTime, value)):
      return 'minTime';

    case Boolean(maxTime && isAfter(value, maxTime)):
      return 'maxTime';

    case Boolean(disableFuture && adapter.utils.isAfter(date, now)):
      return 'disableFuture';

    case Boolean(disablePast && adapter.utils.isBefore(date, now)):
      return 'disablePast';

    case Boolean(shouldDisableTime && shouldDisableTime(value, 'hours')):
      return 'shouldDisableTime-hours';

    case Boolean(shouldDisableTime && shouldDisableTime(value, 'minutes')):
      return 'shouldDisableTime-minutes';

    case Boolean(shouldDisableTime && shouldDisableTime(value, 'seconds')):
      return 'shouldDisableTime-seconds';

    case Boolean(shouldDisableClock && shouldDisableClock(adapter.utils.getHours(value), 'hours')):
      return 'shouldDisableClock-hours';

    case Boolean(
      shouldDisableClock && shouldDisableClock(adapter.utils.getMinutes(value), 'minutes'),
    ):
      return 'shouldDisableClock-minutes';

    case Boolean(
      shouldDisableClock && shouldDisableClock(adapter.utils.getSeconds(value), 'seconds'),
    ):
      return 'shouldDisableClock-seconds';

    case Boolean(minutesStep && adapter.utils.getMinutes(value) % minutesStep !== 0):
      return 'minutesStep';

    default:
      return null;
  }
};
