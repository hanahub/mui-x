import * as React from 'react';
import { useForkRef } from '@mui/material/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import {
  PickersPopper,
  PickersPopperSlotsComponent,
  PickersPopperSlotsComponentsProps,
} from '../PickersPopper';
import { DateInputPropsLike } from './WrapperProps';
import { PickerStateWrapperProps } from '../../hooks/usePickerState';
import { DateInputSlotsComponent } from '../PureDateInput';
import { LocalizationProvider } from '../../../LocalizationProvider';
import { PickersInputLocaleText } from '../../../locales/utils/pickersLocaleTextApi';

export interface DesktopWrapperProps<TDate> {
  children?: React.ReactNode;
  /**
   * Locale for components texts
   */
  localeText?: PickersInputLocaleText<TDate>;
}

export interface DesktopWrapperSlotsComponent
  extends PickersPopperSlotsComponent,
    DateInputSlotsComponent {}

export interface DesktopWrapperSlotsComponentsProps extends PickersPopperSlotsComponentsProps {}

export interface InternalDesktopWrapperProps<TDate>
  extends DesktopWrapperProps<TDate>,
    PickerStateWrapperProps {
  DateInputProps: DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> };
  KeyboardDateInputComponent: React.JSXElementConstructor<
    DateInputPropsLike & { ref?: React.Ref<HTMLDivElement> }
  >;
  /**
   * Overrideable components.
   * @default {}
   */
  components?: Partial<DesktopWrapperSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: Partial<DesktopWrapperSlotsComponentsProps>;
}

export function DesktopWrapper<TDate>(props: InternalDesktopWrapperProps<TDate>) {
  const {
    children,
    DateInputProps,
    KeyboardDateInputComponent,
    onClear,
    onDismiss,
    onCancel,
    onAccept,
    onSetToday,
    open,
    components,
    componentsProps,
    localeText,
  } = props;
  const ownInputRef = React.useRef<HTMLInputElement>(null);
  const inputRef = useForkRef(DateInputProps.inputRef, ownInputRef);

  return (
    <LocalizationProvider localeText={localeText}>
      <WrapperVariantContext.Provider value="desktop">
        <KeyboardDateInputComponent {...DateInputProps} inputRef={inputRef} />
        <PickersPopper
          role="dialog"
          open={open}
          anchorEl={ownInputRef.current}
          onDismiss={onDismiss}
          onCancel={onCancel}
          onClear={onClear}
          onAccept={onAccept}
          onSetToday={onSetToday}
          components={components}
          componentsProps={componentsProps}
        >
          {children}
        </PickersPopper>
      </WrapperVariantContext.Provider>
    </LocalizationProvider>
  );
}
