import * as React from 'react';
import { screen, userEvent, describeConformance } from '@mui/monorepo/test/utils';
import { describeValidation } from '@mui/x-date-pickers/tests/describeValidation';
import { describeValue } from '@mui/x-date-pickers/tests/describeValue';
import { createPickerRenderer, adapterToUse, wrapPickerMount } from 'test/utils/pickers-utils';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { expect } from 'chai';

describe('<DigitalClock /> - Describes', () => {
  const { render, clock } = createPickerRenderer({ clock: 'fake' });

  describeValidation(DigitalClock, () => ({
    render,
    clock,
    views: ['hours'],
    componentFamily: 'digital-clock',
    variant: 'desktop',
  }));

  describeConformance(<DigitalClock />, () => ({
    classes: {} as any,
    render,
    muiName: 'MuiDigitalClock',
    wrapMount: wrapPickerMount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      'componentsProp',
      'themeDefaultProps',
      'themeStyleOverrides',
      'themeVariants',
      'mergeClassName',
      'propsSpread',
      'rootClass',
      'reactTestRenderer',
    ],
  }));

  describeValue(DigitalClock, () => ({
    render,
    componentFamily: 'digital-clock',
    type: 'time',
    variant: 'desktop',
    defaultProps: {
      views: ['hours'],
    },
    values: [
      adapterToUse.date(new Date(2018, 0, 1, 15, 30)),
      adapterToUse.date(new Date(2018, 0, 1, 17, 0)),
    ],
    emptyValue: null,
    clock,
    assertRenderedValue: (expectedValue: any) => {
      const hasMeridiem = adapterToUse.is12HourCycleInCurrentLocale();
      const selectedItem = screen.queryByRole('option', { selected: true });
      if (!expectedValue) {
        expect(selectedItem).to.equal(null);
      } else {
        expect(selectedItem).to.have.text(
          adapterToUse.format(expectedValue, hasMeridiem ? 'fullTime12h' : 'fullTime24h'),
        );
      }
    },
    setNewValue: (value) => {
      const hasMeridiem = adapterToUse.is12HourCycleInCurrentLocale();
      const formattedLabel = adapterToUse.format(
        value,
        hasMeridiem ? 'fullTime12h' : 'fullTime24h',
      );
      userEvent.mousePress(screen.getByRole('option', { name: formattedLabel }));

      return value;
    },
  }));
});
