import * as React from 'react';
import { describeConformance } from '@mui/monorepo/test/utils';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import { createPickerRenderer, wrapPickerMount } from 'test/utils/pickers-utils';

describe('<MultiInputDateTimeRangeField />', () => {
  const { render } = createPickerRenderer();

  describeConformance(<MultiInputDateTimeRangeField />, () => ({
    classes: {},
    inheritComponent: 'div',
    render,
    muiName: 'MuiMultiInputDateTimeRangeField',
    wrapMount: wrapPickerMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: ['reactTestRenderer', 'themeVariants'],
  }));
});
