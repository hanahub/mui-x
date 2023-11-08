import { SlotComponentProps } from '@mui/base/utils';
import MenuItem from '@mui/material/MenuItem';
import { DigitalClockClasses } from './digitalClockClasses';
import {
  BaseClockProps,
  DigitalClockOnlyProps,
  ExportedBaseClockProps,
} from '../internals/models/props/clock';
import { TimeView } from '../models';

export interface ExportedDigitalClockProps<TDate>
  extends ExportedBaseClockProps<TDate>,
    DigitalClockOnlyProps {}

export interface DigitalClockSlotsComponent {
  /**
   * Component responsible for rendering a single digital clock item.
   * @default MenuItem from '@mui/material'
   */
  digitalClockItem?: React.ElementType;
}

export interface DigitalClockSlotsComponentsProps {
  digitalClockItem?: SlotComponentProps<typeof MenuItem, {}, Record<string, any>>;
}

export interface DigitalClockProps<TDate>
  extends ExportedDigitalClockProps<TDate>,
    BaseClockProps<TDate, Extract<TimeView, 'hours'>> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DigitalClockClasses>;
  /**
   * Overrideable component slots.
   * @default {}
   */
  slots?: DigitalClockSlotsComponent;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: DigitalClockSlotsComponentsProps;
}
