import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { fireEvent, userEvent, screen, describeConformance } from '@mui/monorepo/test/utils';
import {
  CalendarPicker,
  calendarPickerClasses as classes,
} from '@mui/x-date-pickers/CalendarPicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  AdapterClassToUse,
  adapterToUse,
  wrapPickerMount,
  createPickerRenderer,
} from '../../../../test/utils/pickers-utils';

describe('<CalendarPicker />', () => {
  const { render, clock } = createPickerRenderer({ clock: 'fake' });

  describeConformance(<CalendarPicker value={adapterToUse.date()} onChange={() => {}} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCalendarPicker',
    wrapMount: wrapPickerMount,
    refInstanceof: window.HTMLDivElement,
    // cannot test reactTestRenderer because of required context
    skip: [
      'componentProp',
      'componentsProp',
      'propsSpread',
      'reactTestRenderer',
      // TODO: Fix CalendarPicker is not spreading props on root
      'themeDefaultProps',
      'themeVariants',
    ],
  }));

  it('switches between views uncontrolled', () => {
    const handleViewChange = spy();
    render(
      <CalendarPicker
        value={adapterToUse.date(new Date(2019, 0, 1))}
        onChange={() => {}}
        onViewChange={handleViewChange}
      />,
    );

    fireEvent.click(screen.getByLabelText(/switch to year view/i));

    expect(handleViewChange.callCount).to.equal(1);
    expect(screen.queryByLabelText(/switch to year view/i)).to.equal(null);
    expect(screen.getByLabelText('year view is open, switch to calendar view')).toBeVisible();
  });

  it('should allow month and view changing, but not selection when readOnly prop is passed', () => {
    const onChangeMock = spy();
    const onMonthChangeMock = spy();
    render(
      <CalendarPicker
        value={adapterToUse.date(new Date(2019, 0, 1))}
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
        readOnly
      />,
    );

    fireEvent.click(screen.getByTitle('Previous month'));
    expect(onMonthChangeMock.callCount).to.equal(1);

    fireEvent.click(screen.getByTitle('Next month'));
    expect(onMonthChangeMock.callCount).to.equal(2);

    clock.runToLast();

    fireEvent.click(screen.getByRole('gridcell', { name: '5' }));
    expect(onChangeMock.callCount).to.equal(0);

    fireEvent.click(screen.getByText('January 2019'));
    expect(screen.queryByLabelText('year view is open, switch to calendar view')).toBeVisible();
  });

  it('should not allow interaction when disabled prop is passed', () => {
    const onChangeMock = spy();
    const onMonthChangeMock = spy();
    render(
      <CalendarPicker
        value={adapterToUse.date(new Date(2019, 0, 1))}
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
        disabled
      />,
    );

    fireEvent.click(screen.getByText('January 2019'));
    expect(screen.queryByText('January 2019')).toBeVisible();
    expect(screen.queryByLabelText('year view is open, switch to calendar view')).to.equal(null);

    fireEvent.click(screen.getByTitle('Previous month'));
    expect(onMonthChangeMock.callCount).to.equal(0);

    fireEvent.click(screen.getByTitle('Next month'));
    expect(onMonthChangeMock.callCount).to.equal(0);

    fireEvent.click(screen.getByRole('gridcell', { name: '5' }));
    expect(onChangeMock.callCount).to.equal(0);
  });

  it('should display disabled days when disabled prop is passed', () => {
    const onChangeMock = spy();
    const onMonthChangeMock = spy();
    render(
      <CalendarPicker
        value={adapterToUse.date(new Date(2019, 0, 1))}
        onChange={onChangeMock}
        onMonthChange={onMonthChangeMock}
        disabled
      />,
    );

    // days are disabled
    const cells = screen.getAllByRole('gridcell');
    const disabledDays = cells.filter(
      (cell) => cell.getAttribute('disabled') !== null && cell.tagName === 'BUTTON',
    );

    expect(cells.length).to.equal(35);
    expect(disabledDays.length).to.equal(31);
  });

  it('should render header label text according to monthAndYear format', () => {
    render(
      <LocalizationProvider
        dateAdapter={AdapterClassToUse}
        dateFormats={{ monthAndYear: 'yyyy/MM' }}
      >
        <CalendarPicker value={adapterToUse.date(new Date(2019, 0, 1))} onChange={() => {}} />,
      </LocalizationProvider>,
    );

    expect(screen.getByText('2019/01')).toBeVisible();
  });

  it('should render column header according to dayOfWeekFormatter', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterClassToUse}>
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 0, 1))}
          onChange={() => {}}
          dayOfWeekFormatter={(day) => `${day}.`}
        />
        ,
      </LocalizationProvider>,
    );

    ['Su.', 'Mo.', 'Tu.', 'We.', 'Th.', 'Fr.', 'Sa.'].forEach((formattedDay) => {
      expect(screen.getByText(formattedDay)).toBeVisible();
    });
  });

  it('should select the closest enabled date if the prop.date contains a disabled date', () => {
    const onChange = spy();

    render(
      <CalendarPicker
        value={adapterToUse.date(new Date(2019, 0, 1))}
        onChange={onChange}
        maxDate={adapterToUse.date(new Date(2018, 0, 1))}
      />,
    );

    // onChange must be dispatched with newly selected date
    expect(onChange.callCount).to.equal(React.version.startsWith('18') ? 2 : 1); // Strict Effects run mount effects twice
    expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2018, 0, 1));
  });

  describe('view: day', () => {
    it('renders day calendar standalone', () => {
      render(
        <CalendarPicker value={adapterToUse.date(new Date(2019, 0, 1))} onChange={() => {}} />,
      );

      expect(screen.getByText('January 2019')).toBeVisible();
      expect(screen.getAllByMuiTest('day')).to.have.length(31);
      // It should follow https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/datepicker-dialog.html
      expect(
        document.querySelector(
          '[role="grid"] [role="rowgroup"] > [role="row"] button[role="gridcell"]',
        ),
      ).to.have.text('1');
    });

    it('should set time to be midnight when selecting a date without a previous date', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={null}
          onChange={onChange}
          defaultCalendarMonth={adapterToUse.date(new Date(2018, 0, 1))}
          view="day"
        />,
      );

      userEvent.mousePress(screen.getByRole('gridcell', { name: '2' }));
      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2018, 0, 2));
    });

    it('should keep the time of the currently provided date', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2018, 0, 3, 11, 11, 11, 111))}
          onChange={onChange}
          defaultCalendarMonth={adapterToUse.date(new Date(2018, 0, 1))}
          view="day"
        />,
      );

      userEvent.mousePress(screen.getByRole('gridcell', { name: '2' }));
      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(
        adapterToUse.date(new Date(2018, 0, 2, 11, 11, 11)),
      );
    });
  });

  describe('view: month', () => {
    it('should select the closest enabled date in the month if the current date is disabled', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 0, 1))}
          onChange={onChange}
          shouldDisableDate={(date) => {
            // Missing `getDate` in adapters
            // The following disable from Apr 1st to Apr 5th
            return (
              adapterToUse.getMonth(date) === 3 &&
              adapterToUse.getDiff(date, adapterToUse.startOfMonth(date), 'days') < 5
            );
          }}
          views={['month', 'day']}
          openTo="month"
        />,
      );

      const april = screen.getByText('Apr', { selector: 'button' });
      fireEvent.click(april);

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2019, 3, 6));
    });

    it('should respect minDate when selecting closest enabled date', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 5, 1))}
          minDate={adapterToUse.date(new Date(2019, 3, 7))}
          onChange={onChange}
          views={['month', 'day']}
          openTo="month"
        />,
      );

      const april = screen.getByText('Apr', { selector: 'button' });
      fireEvent.click(april);

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2019, 3, 7));
    });

    it('should respect maxDate when selecting closest enabled date', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 0, 29))}
          maxDate={adapterToUse.date(new Date(2019, 3, 22))}
          onChange={onChange}
          views={['month', 'day']}
          openTo="month"
        />,
      );

      const april = screen.getByText('Apr', { selector: 'button' });
      fireEvent.click(april);

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2019, 3, 22));
    });

    it('should go to next view without changing the date when no date of the new month is enabled', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 0, 29))}
          onChange={onChange}
          shouldDisableDate={(date) => adapterToUse.getMonth(date) === 3}
          views={['month', 'day']}
          openTo="month"
        />,
      );

      const april = screen.getByText('Apr', { selector: 'button' });
      fireEvent.click(april);
      clock.runToLast();

      expect(onChange.callCount).to.equal(0);
      expect(screen.getByMuiTest('calendar-month-and-year-text')).to.have.text('April 2019');
    });
  });

  describe('view: year', () => {
    it('renders year selection standalone', () => {
      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 0, 1))}
          openTo="year"
          onChange={() => {}}
        />,
      );

      expect(screen.getAllByMuiTest('year')).to.have.length(200);
    });

    it('should select the closest enabled date in the month if the current date is disabled', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 3, 29))}
          onChange={onChange}
          shouldDisableDate={(date) =>
            adapterToUse.getYear(date) === 2022 && adapterToUse.getMonth(date) === 3
          }
          views={['year', 'day']}
          openTo="year"
        />,
      );

      const year2022 = screen.getByText('2022', { selector: 'button' });
      fireEvent.click(year2022);

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2022, 4, 1));
    });

    it('should respect minDate when selecting closest enabled date', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 3, 29))}
          minDate={adapterToUse.date(new Date(2017, 4, 12))}
          onChange={onChange}
          views={['year', 'day']}
          openTo="year"
        />,
      );

      const year2017 = screen.getByText('2017', { selector: 'button' });
      fireEvent.click(year2017);

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2017, 4, 12));
    });

    it('should respect maxDate when selecting closest enabled date', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 3, 29))}
          maxDate={adapterToUse.date(new Date(2022, 2, 31))}
          onChange={onChange}
          views={['year', 'day']}
          openTo="year"
        />,
      );

      const year2022 = screen.getByText('2022', { selector: 'button' });
      fireEvent.click(year2022);

      expect(onChange.callCount).to.equal(1);
      expect(onChange.lastCall.args[0]).toEqualDateTime(new Date(2022, 2, 31));
    });

    it('should go to next view without changing the date when no date of the new year is enabled', () => {
      const onChange = spy();

      render(
        <CalendarPicker
          value={adapterToUse.date(new Date(2019, 3, 29))}
          onChange={onChange}
          shouldDisableDate={(date) => adapterToUse.getYear(date) === 2022}
          views={['year', 'day']}
          openTo="year"
        />,
      );

      const year2022 = screen.getByText('2022', { selector: 'button' });
      fireEvent.click(year2022);
      clock.runToLast();

      expect(onChange.callCount).to.equal(0);
      expect(screen.getByMuiTest('calendar-month-and-year-text')).to.have.text('January 2022');
    });
  });
});
