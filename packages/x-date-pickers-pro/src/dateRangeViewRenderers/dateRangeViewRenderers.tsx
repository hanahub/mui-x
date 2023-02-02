import * as React from 'react';
import { DateOrTimeView } from '@mui/x-date-pickers/internals';
import { DateRangeCalendar, DateRangeCalendarProps } from '../DateRangeCalendar';

export interface DateRangeViewRendererProps<TDate, TView extends DateOrTimeView>
  extends DateRangeCalendarProps<TDate> {
  view: TView;
  onViewChange?: (view: TView) => void;
  views: readonly TView[];
}

/**
 * We don't pass all the props down to `DateRangeCalendar`,
 * because otherwise some unwanted props would be passed to the HTML element.
 */
export const renderDateRangeViewCalendar = <TDate extends unknown>({
  value,
  defaultValue,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  reduceAnimations,
  onMonthChange,
  defaultCalendarMonth,
  rangePosition,
  defaultRangePosition,
  onRangePositionChange,
  calendars,
  components,
  componentsProps,
  slots,
  slotProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  disableAutoMonthSwitching,
  sx,
  autoFocus,
  fixedWeekNumber,
  disableDragEditing,
  displayWeekNumber,
}: DateRangeViewRendererProps<TDate, any>) => (
  <DateRangeCalendar
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    className={className}
    classes={classes}
    disableFuture={disableFuture}
    disablePast={disablePast}
    minDate={minDate}
    maxDate={maxDate}
    shouldDisableDate={shouldDisableDate}
    reduceAnimations={reduceAnimations}
    onMonthChange={onMonthChange}
    defaultCalendarMonth={defaultCalendarMonth}
    rangePosition={rangePosition}
    defaultRangePosition={defaultRangePosition}
    onRangePositionChange={onRangePositionChange}
    calendars={calendars}
    components={components}
    componentsProps={componentsProps}
    slots={slots}
    slotProps={slotProps}
    loading={loading}
    renderLoading={renderLoading}
    disableHighlightToday={disableHighlightToday}
    readOnly={readOnly}
    disabled={disabled}
    showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
    dayOfWeekFormatter={dayOfWeekFormatter}
    disableAutoMonthSwitching={disableAutoMonthSwitching}
    sx={sx}
    autoFocus={autoFocus}
    fixedWeekNumber={fixedWeekNumber}
    disableDragEditing={disableDragEditing}
    displayWeekNumber={displayWeekNumber}
  />
);
