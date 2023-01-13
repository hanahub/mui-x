import { MakeOptional, UncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';
import {
  StaticRangeOnlyPickerProps,
  UseStaticRangePickerSlotsComponent,
  UseStaticRangePickerSlotsComponentsProps,
} from '../internal/hooks/useStaticRangePicker';
import {
  BaseNextDateRangePickerProps,
  BaseNextDateRangePickerSlotsComponent,
  BaseNextDateRangePickerSlotsComponentsProps,
} from '../NextDateRangePicker/shared';

export interface StaticNextDateRangePickerSlotsComponent<TDate>
  extends BaseNextDateRangePickerSlotsComponent<TDate>,
    UseStaticRangePickerSlotsComponent<TDate, 'day'> {}

export interface StaticNextDateRangePickerSlotsComponentsProps<TDate>
  extends BaseNextDateRangePickerSlotsComponentsProps<TDate>,
    UseStaticRangePickerSlotsComponentsProps<TDate, 'day'> {}

export interface StaticNextDateRangePickerProps<TDate>
  extends BaseNextDateRangePickerProps<TDate>,
    MakeOptional<StaticRangeOnlyPickerProps, 'displayStaticWrapperAs'> {
  /**
   * Overrideable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components?: StaticNextDateRangePickerSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps?: StaticNextDateRangePickerSlotsComponentsProps<TDate>;
  /**
   * Overrideable component slots.
   * @default {}
   */
  slots?: UncapitalizeObjectKeys<StaticNextDateRangePickerSlotsComponent<TDate>>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: StaticNextDateRangePickerSlotsComponentsProps<TDate>;
}
