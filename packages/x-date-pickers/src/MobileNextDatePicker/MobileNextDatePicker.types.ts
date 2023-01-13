import {
  UseMobilePickerSlotsComponent,
  UseMobilePickerSlotsComponentsProps,
  MobileOnlyPickerProps,
} from '../internals/hooks/useMobilePicker';
import {
  BaseNextDatePickerProps,
  BaseNextDatePickerSlotsComponent,
  BaseNextDatePickerSlotsComponentsProps,
} from '../NextDatePicker/shared';
import { MakeOptional } from '../internals/models/helpers';
import { BaseNextNonStaticPickerExternalProps } from '../internals/models/props/basePickerProps';
import { DateView } from '../internals/models/views';
import { UncapitalizeObjectKeys } from '../internals/utils/slots-migration';

export interface MobileNextDatePickerSlotsComponent<TDate>
  extends BaseNextDatePickerSlotsComponent<TDate>,
    MakeOptional<UseMobilePickerSlotsComponent<TDate, DateView>, 'Field'> {}

export interface MobileNextDatePickerSlotsComponentsProps<TDate>
  extends BaseNextDatePickerSlotsComponentsProps<TDate>,
    UseMobilePickerSlotsComponentsProps<TDate, DateView> {}

export interface MobileNextDatePickerProps<TDate>
  extends BaseNextDatePickerProps<TDate>,
    MobileOnlyPickerProps<TDate>,
    BaseNextNonStaticPickerExternalProps {
  /**
   * Overrideable components.
   * @default {}
   * @deprecated Please use `slots`.
   */
  components?: MobileNextDatePickerSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated Please use `slotProps`.
   */
  componentsProps?: MobileNextDatePickerSlotsComponentsProps<TDate>;
  /**
   * Overrideable component slots.
   * @default {}
   */
  slots?: UncapitalizeObjectKeys<MobileNextDatePickerSlotsComponent<TDate>>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: MobileNextDatePickerSlotsComponentsProps<TDate>;
}
