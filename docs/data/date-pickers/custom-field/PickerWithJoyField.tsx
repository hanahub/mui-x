import * as React from 'react';
import { Dayjs } from 'dayjs';
import {
  useTheme as useMaterialTheme,
  useColorScheme as useMaterialColorScheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
} from '@mui/material/styles';
import {
  extendTheme as extendJoyTheme,
  useColorScheme,
  styled,
  CssVarsProvider,
  THEME_ID,
} from '@mui/joy/styles';
import { useSlotProps } from '@mui/base/utils';
import Input, { InputProps } from '@mui/joy/Input';
import Stack, { StackProps } from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangeIcon } from '@mui/x-date-pickers/icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DateRangePicker,
  DateRangePickerProps,
} from '@mui/x-date-pickers-pro/DateRangePicker';
import {
  unstable_useSingleInputDateRangeField as useSingleInputDateRangeField,
  SingleInputDateRangeFieldProps,
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { unstable_useMultiInputDateRangeField as useMultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import {
  unstable_useDateField as useDateField,
  UseDateFieldProps,
} from '@mui/x-date-pickers/DateField';
import {
  DateFieldSlotsComponent,
  DateFieldSlotsComponentsProps,
} from '@mui/x-date-pickers/DateField/DateField.types';
import { useClearableField } from '@mui/x-date-pickers/hooks';
import {
  BaseMultiInputFieldProps,
  DateRange,
  DateRangeValidationError,
  UseDateRangeFieldProps,
  MultiInputFieldSlotTextFieldProps,
  BaseSingleInputFieldProps,
  DateValidationError,
  RangeFieldSection,
  FieldSection,
} from '@mui/x-date-pickers-pro';
import type {
  SingleInputDateRangeFieldSlotsComponent,
  SingleInputDateRangeFieldSlotsComponentsProps,
} from '@mui/x-date-pickers-pro/SingleInputDateRangeField/SingleInputDateRangeField.types';

const joyTheme = extendJoyTheme();

interface JoyFieldProps extends InputProps {
  label?: React.ReactNode;
  InputProps?: {
    ref?: React.Ref<any>;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
  };
  formControlSx?: InputProps['sx'];
}

type JoyFieldComponent = ((
  props: JoyFieldProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

const JoyField = React.forwardRef(
  (props: JoyFieldProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      disabled,
      id,
      label,
      InputProps: { ref: containerRef, startAdornment, endAdornment } = {},
      formControlSx,
      endDecorator,
      startDecorator,
      slotProps,
      ...other
    } = props;

    return (
      <FormControl
        disabled={disabled}
        id={id}
        sx={[
          {
            flexGrow: 1,
          },
          ...(Array.isArray(formControlSx) ? formControlSx : [formControlSx]),
        ]}
        ref={ref}
      >
        <FormLabel>{label}</FormLabel>
        <Input
          ref={ref}
          disabled={disabled}
          startDecorator={
            <React.Fragment>
              {startAdornment}
              {startDecorator}
            </React.Fragment>
          }
          endDecorator={
            <React.Fragment>
              {endAdornment}
              {endDecorator}
            </React.Fragment>
          }
          slotProps={{
            ...slotProps,
            root: { ...slotProps?.root, ref: containerRef },
          }}
          {...other}
        />
      </FormControl>
    );
  },
) as JoyFieldComponent;

interface JoySingleInputDateRangeFieldProps
  extends SingleInputDateRangeFieldProps<Dayjs, InputProps> {
  onAdornmentClick?: () => void;
}

type JoySingleInputDateRangeFieldComponent = ((
  props: JoySingleInputDateRangeFieldProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { fieldType?: string };

const JoySingleInputDateRangeField = React.forwardRef(
  (props: JoySingleInputDateRangeFieldProps, ref: React.Ref<HTMLDivElement>) => {
    const { slots, slotProps, onAdornmentClick, ...other } = props;

    const {
      inputRef: externalInputRef,
      ...textFieldProps
    }: SingleInputDateRangeFieldProps<
      Dayjs,
      JoyFieldProps & { inputRef: React.Ref<HTMLInputElement> }
    > = useSlotProps({
      elementType: FormControl,
      externalSlotProps: slotProps?.textField,
      externalForwardedProps: other,
      ownerState: props as any,
    });

    const {
      onClear,
      clearable,
      ref: inputRef,
      ...fieldProps
    } = useSingleInputDateRangeField<Dayjs, JoyFieldProps>({
      props: textFieldProps,
      inputRef: externalInputRef,
    });

    /* If you don't need a clear button, you can skip the use of this hook */
    const { InputProps: ProcessedInputProps, fieldProps: processedFieldProps } =
      useClearableField<
        {},
        typeof textFieldProps.InputProps,
        SingleInputDateRangeFieldSlotsComponent,
        SingleInputDateRangeFieldSlotsComponentsProps<Dayjs>
      >({
        onClear,
        clearable,
        fieldProps,
        InputProps: fieldProps.InputProps,
        slots: { ...slots, clearButton: IconButton },
        slotProps: { ...slotProps, clearIcon: { color: 'action' } },
      });

    return (
      <JoyField
        {...processedFieldProps}
        ref={ref}
        slotProps={{
          input: {
            ref: inputRef,
          },
        }}
        endDecorator={
          <IconButton
            onClick={onAdornmentClick}
            variant="plain"
            color="neutral"
            sx={{ marginLeft: 2.5 }}
          >
            <DateRangeIcon color="action" />
          </IconButton>
        }
        InputProps={{ ...ProcessedInputProps }}
      />
    );
  },
) as JoySingleInputDateRangeFieldComponent;

JoySingleInputDateRangeField.fieldType = 'single-input';

const JoySingleInputDateRangePicker = React.forwardRef(
  (props: DateRangePickerProps<Dayjs>, ref: React.Ref<HTMLDivElement>) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = (event: React.PointerEvent) => {
      // allows toggle behavior
      event.stopPropagation();
      setIsOpen((currentOpen) => !currentOpen);
    };

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => setIsOpen(false);

    return (
      <DateRangePicker
        {...props}
        ref={ref}
        open={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        slots={{ field: JoySingleInputDateRangeField }}
        slotProps={{
          ...props?.slotProps,
          field: {
            ...props?.slotProps?.field,
            onAdornmentClick: toggleOpen,
          } as any,
        }}
      />
    );
  },
);

const MultiInputJoyDateRangeFieldRoot = styled(
  React.forwardRef((props: StackProps, ref: React.Ref<HTMLDivElement>) => (
    <Stack ref={ref} spacing={2} direction="row" alignItems="center" {...props} />
  )),
  {
    name: 'MuiMultiInputDateRangeField',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
  },
)({});

const MultiInputJoyDateRangeFieldSeparator = styled(
  (props: TypographyProps) => (
    <FormControl>
      {/* Ensure that the separator is correctly aligned */}
      <span />
      <Typography {...props}>{props.children ?? ' — '}</Typography>
    </FormControl>
  ),
  {
    name: 'MuiMultiInputDateRangeField',
    slot: 'Separator',
    overridesResolver: (props, styles) => styles.separator,
  },
)({ marginTop: '25px' });

interface JoyMultiInputDateRangeFieldProps
  extends UseDateRangeFieldProps<Dayjs>,
    BaseMultiInputFieldProps<
      DateRange<Dayjs>,
      Dayjs,
      RangeFieldSection,
      DateRangeValidationError
    > {}

type JoyMultiInputDateRangeFieldComponent = ((
  props: JoyMultiInputDateRangeFieldProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

const JoyMultiInputDateRangeField = React.forwardRef(
  (props: JoyMultiInputDateRangeFieldProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      slotProps,
      value,
      defaultValue,
      format,
      onChange,
      readOnly,
      disabled,
      onError,
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      selectedSections,
      onSelectedSectionsChange,
      className,
    } = props;

    const { inputRef: startInputRef, ...startTextFieldProps } = useSlotProps({
      elementType: FormControl,
      externalSlotProps: slotProps?.textField,
      ownerState: { ...props, position: 'start' },
    }) as MultiInputFieldSlotTextFieldProps;

    const { inputRef: endInputRef, ...endTextFieldProps } = useSlotProps({
      elementType: FormControl,
      externalSlotProps: slotProps?.textField,
      ownerState: { ...props, position: 'end' },
    }) as MultiInputFieldSlotTextFieldProps;

    const {
      startDate: { ref: startRef, ...startDateProps },
      endDate: { ref: endRef, ...endDateProps },
    } = useMultiInputDateRangeField<Dayjs, MultiInputFieldSlotTextFieldProps>({
      sharedProps: {
        value,
        defaultValue,
        format,
        onChange,
        readOnly,
        disabled,
        onError,
        shouldDisableDate,
        minDate,
        maxDate,
        disableFuture,
        disablePast,
        selectedSections,
        onSelectedSectionsChange,
      },
      startTextFieldProps,
      endTextFieldProps,
      startInputRef,
      endInputRef,
    });

    return (
      <MultiInputJoyDateRangeFieldRoot ref={ref} className={className}>
        <JoyField
          {...startDateProps}
          slotProps={{
            input: {
              ref: startRef,
            },
          }}
        />
        <MultiInputJoyDateRangeFieldSeparator />
        <JoyField
          {...endDateProps}
          slotProps={{
            input: {
              ref: endRef,
            },
          }}
        />
      </MultiInputJoyDateRangeFieldRoot>
    );
  },
) as JoyMultiInputDateRangeFieldComponent;

const JoyDateRangePicker = React.forwardRef(
  (props: DateRangePickerProps<Dayjs>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <DateRangePicker
        ref={ref}
        {...props}
        slots={{ ...props?.slots, field: JoyMultiInputDateRangeField }}
      />
    );
  },
);

interface JoyDateFieldProps
  extends UseDateFieldProps<Dayjs>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      DateValidationError
    > {}

const JoyDateField = React.forwardRef(
  (props: JoyDateFieldProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      inputRef: externalInputRef,
      slots,
      slotProps,
      ...textFieldProps
    } = props;

    const {
      onClear,
      clearable,
      ref: inputRef,
      ...fieldProps
    } = useDateField<Dayjs, typeof textFieldProps>({
      props: textFieldProps,
      inputRef: externalInputRef,
    });

    /* If you don't need a clear button, you can skip the use of this hook */
    const { InputProps: ProcessedInputProps, fieldProps: processedFieldProps } =
      useClearableField<
        {},
        typeof textFieldProps.InputProps,
        DateFieldSlotsComponent,
        DateFieldSlotsComponentsProps<Dayjs>
      >({
        onClear,
        clearable,
        fieldProps,
        InputProps: fieldProps.InputProps,
        slots,
        slotProps,
      });

    return (
      <JoyField
        ref={ref}
        slotProps={{
          input: {
            ref: inputRef,
          },
        }}
        {...processedFieldProps}
        InputProps={ProcessedInputProps}
      />
    );
  },
);

const JoyDatePicker = React.forwardRef(
  (props: DatePickerProps<Dayjs>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <DatePicker
        ref={ref}
        {...props}
        slots={{ field: JoyDateField, ...props.slots }}
        slotProps={{
          ...props.slotProps,
          field: {
            ...props.slotProps?.field,
            formControlSx: {
              flexDirection: 'row',
            },
          } as any,
        }}
      />
    );
  },
);

/**
 * This component is for syncing the MUI docs's mode with this demo.
 * You might not need this component in your project.
 */
function SyncThemeMode({ mode }: { mode: 'light' | 'dark' }) {
  const { setMode } = useColorScheme();
  const { setMode: setMaterialMode } = useMaterialColorScheme();
  React.useEffect(() => {
    setMode(mode);
    setMaterialMode(mode);
  }, [mode, setMode, setMaterialMode]);
  return null;
}

export default function PickerWithJoyField() {
  const materialTheme = useMaterialTheme();
  return (
    <MaterialCssVarsProvider>
      <CssVarsProvider theme={{ [THEME_ID]: joyTheme }}>
        <SyncThemeMode mode={materialTheme.palette.mode} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DatePicker', 'DateRangePicker', 'DateRangePicker']}
          >
            <JoyDatePicker
              slotProps={{
                field: { clearable: true },
              }}
            />
            <JoySingleInputDateRangePicker
              slotProps={{
                field: { clearable: true },
              }}
            />
            <JoyDateRangePicker />
          </DemoContainer>
        </LocalizationProvider>
      </CssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
