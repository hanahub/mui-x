import * as React from 'react';
import { describeConformance } from '@mui/monorepo/test/utils';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import { createPickerRenderer, wrapPickerMount } from 'test/utils/pickers-utils';

describe('<DateField />', () => {
  const { render } = createPickerRenderer();

  describeConformance(<DateField />, () => ({
    classes: {},
    inheritComponent: 'div',
    render,
    muiName: 'MuiDateField',
    wrapMount: wrapPickerMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: [
      'reactTestRenderer',
      'componentProp',
      'componentsProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
    ],
  }));
});
