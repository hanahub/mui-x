import {
  BaseDateTimePickerProps,
  BaseDateTimePickerSlots,
  BaseDateTimePickerSlotProps,
} from '../DateTimePicker/shared';
import {
  StaticOnlyPickerProps,
  UseStaticPickerSlots,
  UseStaticPickerSlotProps,
} from '../internals/hooks/useStaticPicker';
import { MakeOptional } from '../internals';
import { DateOrTimeView } from '../models';

export interface StaticDateTimePickerSlots<TDate>
  extends BaseDateTimePickerSlots<TDate>,
    UseStaticPickerSlots<TDate, DateOrTimeView> {}

export interface StaticDateTimePickerSlotProps<TDate>
  extends BaseDateTimePickerSlotProps<TDate>,
    UseStaticPickerSlotProps<TDate, DateOrTimeView> {}

export interface StaticDateTimePickerProps<TDate>
  extends BaseDateTimePickerProps<TDate, DateOrTimeView>,
    MakeOptional<StaticOnlyPickerProps, 'displayStaticWrapperAs'> {
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: StaticDateTimePickerSlots<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: StaticDateTimePickerSlotProps<TDate>;
}
