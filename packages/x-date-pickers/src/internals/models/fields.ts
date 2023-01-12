import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { SlotComponentProps } from '@mui/base/utils';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import type { UseFieldInternalProps } from '../hooks/useField';

export interface BaseFieldProps<TValue, TError>
  extends Omit<UseFieldInternalProps<TValue, TError>, 'format'> {
  className?: string;
  sx?: SxProps<Theme>;
  format?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  ref?: React.Ref<HTMLDivElement>;
  /**
   * @deprecated Please use `slots`.
   */
  components?: {
    TextField?: React.ElementType<TextFieldProps>;
  };
  /**
   * @deprecated Please use `slotsProps`.
   */
  componentsProps?: {
    textField?: SlotComponentProps<typeof TextField, {}, Record<string, any>>;
  };
  slots?: {
    textField?: React.ElementType<TextFieldProps>;
  };
  slotsProps?: {
    textField?: SlotComponentProps<typeof TextField, {}, Record<string, any>>;
  };
}

export interface FieldsTextFieldProps
  extends Omit<
    TextFieldProps,
    | 'autoComplete'
    | 'error'
    | 'maxRows'
    | 'minRows'
    | 'multiline'
    | 'placeholder'
    | 'rows'
    | 'select'
    | 'SelectProps'
    | 'type'
  > {}
