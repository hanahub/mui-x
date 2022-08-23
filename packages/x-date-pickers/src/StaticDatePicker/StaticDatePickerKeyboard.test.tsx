import * as React from 'react';
import { expect } from 'chai';
import TextField from '@mui/material/TextField';
import { fireEvent, screen } from '@mui/monorepo/test/utils';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { adapterToUse, createPickerRenderer } from '../../../../test/utils/pickers-utils';

describe('<StaticDatePicker /> keyboard interactions', () => {
  const { render } = createPickerRenderer({ clock: 'fake' });

  describe('Calendar keyboard navigation', () => {
    it('can autofocus selected day on mount', () => {
      render(
        <StaticDatePicker
          autoFocus
          displayStaticWrapperAs="desktop"
          value={adapterToUse.date(new Date(2020, 7, 13))}
          onChange={() => {}}
          renderInput={(params) => <TextField placeholder="10/10/2018" {...params} />}
        />,
      );

      expect(screen.getByRole('gridcell', { name: '13' })).toHaveFocus();
    });

    [
      { keyCode: 35, key: 'End', expectFocusedDay: '15' },
      { keyCode: 36, key: 'Home', expectFocusedDay: '9' },
      { keyCode: 37, key: 'ArrowLeft', expectFocusedDay: '12' },
      { keyCode: 38, key: 'ArrowUp', expectFocusedDay: '6' },
      { keyCode: 39, key: 'ArrowRight', expectFocusedDay: '14' },
      { keyCode: 40, key: 'ArrowDown', expectFocusedDay: '20' },
    ].forEach(({ key, keyCode, expectFocusedDay }) => {
      it(key, () => {
        render(
          <StaticDatePicker
            autoFocus
            displayStaticWrapperAs="desktop"
            value={adapterToUse.date(new Date(2020, 7, 13))}
            onChange={() => {}}
            renderInput={(params) => <TextField placeholder="10/10/2018" {...params} />}
          />,
        );

        // Don't care about what's focused.
        // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
        fireEvent.keyDown(document.activeElement!, { keyCode, key });

        // Based on column header, screen reader should pronounce <Day Number> <Week Day>
        // But `toHaveAccessibleName` does not do the link between column header and cell value, so we only get <day number> in test
        expect(document.activeElement).toHaveAccessibleName(expectFocusedDay);
      });
    });
  });

  it("doesn't allow to select disabled date from keyboard", async () => {
    render(
      <StaticDatePicker
        autoFocus
        displayStaticWrapperAs="desktop"
        value={adapterToUse.date(new Date(2020, 7, 13))}
        minDate={adapterToUse.date(new Date(2020, 7, 13))}
        onChange={() => {}}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    expect(document.activeElement).toHaveAccessibleName('13');

    for (let i = 0; i < 3; i += 1) {
      // Don't care about what's focused.
      // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
      fireEvent.keyDown(document.activeElement!, { keyCode: 37, key: 'ArrowLeft' });
    }

    // leaves focus on the same date
    expect(document.activeElement).toHaveAccessibleName('13');
  });

  describe('YearPicker keyboard navigation', () => {
    [
      { keyCode: 37, key: 'ArrowLeft', expectFocusedYear: '2019' },
      { keyCode: 38, key: 'ArrowUp', expectFocusedYear: '2016' },
      { keyCode: 39, key: 'ArrowRight', expectFocusedYear: '2021' },
      { keyCode: 40, key: 'ArrowDown', expectFocusedYear: '2024' },
    ].forEach(({ key, keyCode, expectFocusedYear }) => {
      it(key, () => {
        render(
          <StaticDatePicker
            autoFocus
            openTo="year"
            reduceAnimations
            displayStaticWrapperAs="desktop"
            value={adapterToUse.date(new Date(2020, 7, 13))}
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} />}
          />,
        );

        // Don't care about what's focused.
        // eslint-disable-next-line material-ui/disallow-active-element-as-key-event-target
        fireEvent.keyDown(document.activeElement!, { keyCode, key });

        expect(document.activeElement).to.have.text(expectFocusedYear);
      });
    });
  });
});
