import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SxProps, useTheme } from '@mui/system';
import { styled, useThemeProps, Theme } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { useForkRef } from '@mui/material/utils';
import {
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
} from '@mui/utils';
import { PickersYear } from './PickersYear';
import { useUtils, useNow, useDefaultDates } from '../internals/hooks/useUtils';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { YearPickerClasses, getYearPickerUtilityClass } from './yearPickerClasses';
import { BaseDateValidationProps, YearValidationProps } from '../internals/hooks/validation/models';
import { DefaultizedProps } from '../internals/models/helpers';
import { parseNonNullablePickerDate } from '../internals/utils/date-utils';

const useUtilityClasses = (ownerState: YearPickerProps<any>) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getYearPickerUtilityClass, classes);
};

function useYearPickerDefaultizedProps<TDate>(
  props: YearPickerProps<TDate>,
  name: string,
): DefaultizedProps<
  YearPickerProps<TDate>,
  'minDate' | 'maxDate' | 'disableFuture' | 'disablePast'
> {
  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();
  const themeProps = useThemeProps({
    props,
    name,
  });

  return {
    disablePast: false,
    disableFuture: false,
    ...themeProps,
    minDate: parseNonNullablePickerDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: parseNonNullablePickerDate(utils, themeProps.maxDate, defaultDates.maxDate),
  };
}

const YearPickerRoot = styled('div', {
  name: 'MuiYearPicker',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: YearPickerProps<any> }>({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
  height: '100%',
  padding: '0 4px',
  maxHeight: '304px',
});

export interface YearPickerProps<TDate>
  extends YearValidationProps<TDate>,
    BaseDateValidationProps<TDate> {
  autoFocus?: boolean;
  /**
   * className applied to the root element.
   */
  className?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<YearPickerClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  value: TDate | null;
  /** If `true` picker is disabled */
  disabled?: boolean;
  /**
   * Callback fired when the value (the selected year) changes.
   * @template TValue
   * @param {TValue} value The new parsed value.
   */
  onChange: (value: TDate) => void;
  /** If `true` picker is readonly */
  readOnly?: boolean;
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday?: boolean;
  onYearFocus?: (year: number) => void;
  hasFocus?: boolean;
  onFocusedViewChange?: (newHasFocus: boolean) => void;
}

type YearPickerComponent = (<TDate>(props: YearPickerProps<TDate>) => JSX.Element) & {
  propTypes?: any;
};

export const YearPicker = React.forwardRef(function YearPicker<TDate>(
  inProps: YearPickerProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  const now = useNow<TDate>();
  const theme = useTheme();
  const utils = useUtils<TDate>();
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const props = useYearPickerDefaultizedProps(inProps, 'MuiYearPicker');
  const {
    autoFocus,
    className,
    value,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    readOnly,
    shouldDisableYear,
    disableHighlightToday,
    onYearFocus,
    hasFocus,
    onFocusedViewChange,
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const selectedDateOrToday = value ?? now;
  const todayYear = React.useMemo(() => utils.getYear(now), [utils, now]);
  const selectedYear = React.useMemo(() => {
    if (value != null) {
      return utils.getYear(value);
    }

    if (disableHighlightToday) {
      return null;
    }

    return utils.getYear(now);
  }, [now, value, utils, disableHighlightToday]);

  const [focusedYear, setFocusedYear] = React.useState(() => selectedYear || todayYear);

  const [internalHasFocus, setInternalHasFocus] = useControlled<boolean>({
    name: 'YearPicker',
    state: 'hasFocus',
    controlled: hasFocus,
    default: autoFocus,
  });

  const changeHasFocus = useEventCallback((newHasFocus: boolean) => {
    setInternalHasFocus(newHasFocus);

    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  });

  const isYearDisabled = useEventCallback((dateToValidate: TDate) => {
    if (disablePast && utils.isBeforeYear(dateToValidate, now)) {
      return true;
    }
    if (disableFuture && utils.isAfterYear(dateToValidate, now)) {
      return true;
    }
    if (minDate && utils.isBeforeYear(dateToValidate, minDate)) {
      return true;
    }
    if (maxDate && utils.isAfterYear(dateToValidate, maxDate)) {
      return true;
    }
    if (shouldDisableYear && shouldDisableYear(dateToValidate)) {
      return true;
    }
    return false;
  });

  const handleYearSelection = useEventCallback((event: React.MouseEvent, year: number) => {
    if (readOnly) {
      return;
    }

    const newDate = utils.setYear(selectedDateOrToday, year);
    onChange(newDate);
  });

  const focusYear = useEventCallback((year: number) => {
    if (!isYearDisabled(utils.setYear(selectedDateOrToday, year))) {
      setFocusedYear(year);
      changeHasFocus(true);
      onYearFocus?.(year);
    }
  });

  React.useEffect(() => {
    setFocusedYear((prevFocusedYear) =>
      selectedYear !== null && prevFocusedYear !== selectedYear ? selectedYear : prevFocusedYear,
    );
  }, [selectedYear]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent, year: number) => {
    const yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;

    switch (event.key) {
      case 'ArrowUp':
        focusYear(year - yearsInRow);
        event.preventDefault();
        break;
      case 'ArrowDown':
        focusYear(year + yearsInRow);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        focusYear(year + (theme.direction === 'ltr' ? -1 : 1));
        event.preventDefault();
        break;
      case 'ArrowRight':
        focusYear(year + (theme.direction === 'ltr' ? 1 : -1));
        event.preventDefault();
        break;
      default:
        break;
    }
  });

  const handleYearFocus = useEventCallback((event: React.FocusEvent, year: number) => {
    focusYear(year);
  });

  const handleYearBlur = useEventCallback((event: React.FocusEvent, year: number) => {
    if (focusedYear === year) {
      changeHasFocus(false);
    }
  });

  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(ref, scrollerRef);
  React.useEffect(() => {
    if (autoFocus || scrollerRef.current === null) {
      return;
    }
    const tabbableButton = scrollerRef.current.querySelector<HTMLElement>('[tabindex="0"]');
    if (!tabbableButton) {
      return;
    }

    // Taken from useScroll in x-data-grid, but vertically centered
    const offsetHeight = tabbableButton.offsetHeight;
    const offsetTop = tabbableButton.offsetTop;

    const clientHeight = scrollerRef.current.clientHeight;
    const scrollTop = scrollerRef.current.scrollTop;

    const elementBottom = offsetTop + offsetHeight;

    if (offsetHeight > clientHeight || offsetTop < scrollTop) {
      // Button already visible
      return;
    }

    scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
  }, [autoFocus]);

  return (
    <YearPickerRoot
      ref={handleRef}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {utils.getYearRange(minDate, maxDate).map((year) => {
        const yearNumber = utils.getYear(year);
        const isSelected = yearNumber === selectedYear;
        const isDisabled = disabled || isYearDisabled(year);

        return (
          <PickersYear
            key={utils.format(year, 'year')}
            selected={isSelected}
            value={yearNumber}
            onClick={handleYearSelection}
            onKeyDown={handleKeyDown}
            autoFocus={internalHasFocus && yearNumber === focusedYear}
            disabled={isDisabled}
            tabIndex={yearNumber === focusedYear ? 0 : -1}
            onFocus={handleYearFocus}
            onBlur={handleYearBlur}
            aria-current={todayYear === yearNumber ? 'date' : undefined}
          >
            {utils.format(year, 'year')}
          </PickersYear>
        );
      })}
    </YearPickerRoot>
  );
}) as YearPickerComponent;

YearPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * If `true` picker is disabled
   */
  disabled: PropTypes.bool,
  /**
   * If `true` disable values before the current time
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * If `true` disable values after the current time.
   * @default false
   */
  disablePast: PropTypes.bool,
  hasFocus: PropTypes.bool,
  /**
   * Maximal selectable date. @DateIOType
   */
  maxDate: PropTypes.any,
  /**
   * Minimal selectable date. @DateIOType
   */
  minDate: PropTypes.any,
  /**
   * Callback fired when the value (the selected year) changes.
   * @template TValue
   * @param {TValue} value The new parsed value.
   */
  onChange: PropTypes.func.isRequired,
  onFocusedViewChange: PropTypes.func,
  onYearFocus: PropTypes.func,
  /**
   * If `true` picker is readonly
   */
  readOnly: PropTypes.bool,
  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} Returns `true` if the year should be disabled.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  value: PropTypes.any,
} as any;
