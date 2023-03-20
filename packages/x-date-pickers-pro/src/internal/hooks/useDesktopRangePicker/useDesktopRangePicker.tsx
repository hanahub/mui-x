import * as React from 'react';
import { resolveComponentProps, useSlotProps } from '@mui/base/utils';
import { useLicenseVerifier } from '@mui/x-license-pro';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  PickersLayout,
  PickersLayoutSlotsComponentsProps,
} from '@mui/x-date-pickers/PickersLayout';
import {
  DateOrTimeView,
  executeInTheNextEventLoopTick,
  getActiveElement,
  usePicker,
  PickersPopper,
  InferError,
  ExportedBaseToolbarProps,
} from '@mui/x-date-pickers/internals';
import {
  DesktopRangePickerAdditionalViewProps,
  UseDesktopRangePickerParams,
  UseDesktopRangePickerProps,
} from './useDesktopRangePicker.types';
import { useRangePickerInputProps } from '../useRangePickerInputProps';
import { getReleaseInfo } from '../../utils/releaseInfo';
import { DateRange } from '../../models/range';
import { BaseMultiInputFieldProps, RangeFieldSection } from '../../models/fields';
import { useRangePosition } from '../useRangePosition';

const releaseInfo = getReleaseInfo();

export const useDesktopRangePicker = <
  TDate,
  TView extends DateOrTimeView,
  TExternalProps extends UseDesktopRangePickerProps<TDate, TView, any, TExternalProps>,
>({
  props,
  valueManager,
  validator,
}: UseDesktopRangePickerParams<TDate, TView, TExternalProps>) => {
  useLicenseVerifier('x-date-pickers-pro', releaseInfo);

  const {
    slots,
    slotProps,
    className,
    sx,
    format,
    readOnly,
    disabled,
    autoFocus,
    disableOpenPicker,
    localeText,
  } = props;

  const fieldRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<HTMLDivElement>(null);

  const { rangePosition, onRangePositionChange } = useRangePosition(props);

  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    shouldRestoreFocus,
    fieldProps: pickerFieldProps,
  } = usePicker<
    DateRange<TDate>,
    TDate,
    TView,
    RangeFieldSection,
    TExternalProps,
    DesktopRangePickerAdditionalViewProps
  >({
    props,
    valueManager,
    wrapperVariant: 'desktop',
    validator,
    autoFocusView: true,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange,
    },
  });

  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      if (
        fieldRef.current?.contains(getActiveElement(document)) ||
        popperRef.current?.contains(getActiveElement(document))
      ) {
        return;
      }

      actions.onDismiss();
    });
  };

  const fieldSlotProps = useRangePickerInputProps({
    wrapperVariant: 'desktop',
    open,
    actions,
    readOnly,
    disabled,
    disableOpenPicker,
    localeText,
    onBlur: handleBlur,
    rangePosition,
    onRangePositionChange,
  });

  const Field = slots.field;
  const fieldProps: BaseMultiInputFieldProps<
    DateRange<TDate>,
    RangeFieldSection,
    InferError<TExternalProps>
  > = useSlotProps({
    elementType: Field,
    externalSlotProps: slotProps?.field,
    additionalProps: {
      ...pickerFieldProps,
      readOnly,
      disabled,
      className,
      sx,
      format,
      autoFocus: autoFocus && !props.open,
      ref: fieldRef,
    },
    ownerState: props,
  });

  const slotsForField: BaseMultiInputFieldProps<
    DateRange<TDate>,
    RangeFieldSection,
    unknown
  >['slots'] = {
    textField: slots.textField,
    root: slots.fieldRoot,
    separator: slots.fieldSeparator,
    ...fieldProps.slots,
  };

  const slotPropsForField: BaseMultiInputFieldProps<
    DateRange<TDate>,
    RangeFieldSection,
    unknown
  >['slotProps'] & {
    separator: any;
  } = {
    ...fieldProps.slotProps,
    textField: (ownerState) => {
      const externalInputProps = resolveComponentProps(slotProps?.textField, ownerState);
      return {
        ...(ownerState.position === 'start' ? fieldSlotProps.startInput : fieldSlotProps.endInput),
        ...externalInputProps,
      };
    },
    root: (ownerState) => {
      const externalRootProps = resolveComponentProps(slotProps?.fieldRoot, ownerState);
      return {
        ...externalRootProps,
        ...fieldSlotProps.root,
      };
    },
    separator: slotProps?.fieldSeparator,
  };

  const slotPropsForLayout: PickersLayoutSlotsComponentsProps<DateRange<TDate>, TDate, TView> = {
    ...slotProps,
    toolbar: {
      ...slotProps?.toolbar,
      rangePosition,
      onRangePositionChange,
    } as ExportedBaseToolbarProps,
  };
  const Layout = slots?.layout ?? PickersLayout;

  const renderPicker = () => (
    <LocalizationProvider localeText={localeText}>
      <Field {...fieldProps} slots={slotsForField} slotProps={slotPropsForField} />
      <PickersPopper
        role="tooltip"
        containerRef={popperRef}
        anchorEl={fieldRef.current}
        onBlur={handleBlur}
        {...actions}
        open={open}
        slots={slots}
        slotProps={slotProps}
        shouldRestoreFocus={shouldRestoreFocus}
      >
        <Layout
          {...layoutProps}
          {...slotProps?.layout}
          slots={slots}
          slotProps={slotPropsForLayout}
        >
          {renderCurrentView()}
        </Layout>
      </PickersPopper>
    </LocalizationProvider>
  );

  return {
    renderPicker,
  };
};
