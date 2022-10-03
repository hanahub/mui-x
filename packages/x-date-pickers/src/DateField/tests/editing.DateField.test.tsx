import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Unstable_DateField as DateField, DateFieldProps } from '@mui/x-date-pickers/DateField';
import { screen, act, userEvent, fireEvent } from '@mui/monorepo/test/utils';
import { createPickerRenderer, adapterToUse } from 'test/utils/pickers-utils';

describe('<DateField /> - Editing', () => {
  const { render, clock } = createPickerRenderer({
    clock: 'fake',
    clockConfig: new Date(2022, 5, 15),
  });

  const clickOnInput = (input: HTMLInputElement, cursorPosition: number) => {
    act(() => {
      fireEvent.mouseDown(input);
      if (document.activeElement !== input) {
        input.focus();
      }
      fireEvent.mouseUp(input);
      input.setSelectionRange(cursorPosition, cursorPosition);
      fireEvent.click(input);

      clock.runToLast();
    });
  };

  const testKeyPress = <TDate extends unknown>({
    key,
    expectedValue,
    cursorPosition = 1,
    ...props
  }: DateFieldProps<TDate> & { key: string; expectedValue: string; cursorPosition?: number }) => {
    render(<DateField {...props} />);
    const input = screen.getByRole('textbox');
    clickOnInput(input, cursorPosition);
    userEvent.keyPress(input, { key });
    expect(input.value).to.equal(expectedValue);
  };

  const testChange = <TDate extends unknown>({
    inputValue,
    expectedValue,
    cursorPosition = 1,
    ...props
  }: DateFieldProps<TDate> & {
    inputValue: string;
    expectedValue: string;
    cursorPosition?: number;
  }) => {
    render(<DateField {...props} />);
    const input = screen.getByRole('textbox');
    clickOnInput(input, cursorPosition);
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).to.equal(expectedValue);
  };

  describe('key: ArrowDown', () => {
    it("should set the year to today's value when no value is provided", () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        key: 'ArrowDown',
        expectedValue: '2022',
      });
    });

    it('should decrement the year when a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        defaultValue: adapterToUse.date(),
        key: 'ArrowDown',
        expectedValue: '2021',
      });
    });

    it('should set the month to December when no value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.month,
        key: 'ArrowDown',
        expectedValue: 'December',
      });
    });

    it('should decrement the month when a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.month,
        defaultValue: adapterToUse.date(),
        key: 'ArrowDown',
        expectedValue: 'May',
      });
    });

    it('should go to the last month of the previous year when a value in January is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.monthAndYear,
        defaultValue: adapterToUse.date(new Date(2022, 0, 15)),
        key: 'ArrowDown',
        expectedValue: 'December 2021',
      });
    });

    it("should set the day to the last day of today's month when no value is provided", () => {
      testKeyPress({
        format: adapterToUse.formats.dayOfMonth,
        key: 'ArrowDown',
        expectedValue: '30',
      });
    });

    it('should decrement the day when a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.dayOfMonth,
        defaultValue: adapterToUse.date(),
        key: 'ArrowDown',
        expectedValue: '14',
      });
    });

    it('should go to the last day of the previous month when a value in the first day of the month is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.monthAndDate,
        defaultValue: adapterToUse.date(new Date(2022, 5, 1)),
        key: 'ArrowDown',
        expectedValue: 'May 31',
        // To select the date and not the month
        cursorPosition: 5,
      });
    });

    it('should not edit the value when props.readOnly = true and no value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        readOnly: true,
        key: 'ArrowDown',
        expectedValue: 'year',
      });
    });

    it('should not edit the value when props.readOnly = true and a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        defaultValue: adapterToUse.date(),
        readOnly: true,
        key: 'ArrowDown',
        expectedValue: '2022',
      });
    });
  });

  describe('key: ArrowUp', () => {
    it("should set the year to today's value when no value is provided", () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        key: 'ArrowUp',
        expectedValue: '2022',
      });
    });

    it('should increment the year when a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        defaultValue: adapterToUse.date(),
        key: 'ArrowUp',
        expectedValue: '2023',
      });
    });

    it('should set the month to January when no value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.month,
        key: 'ArrowUp',
        expectedValue: 'January',
      });
    });

    it('should increment the month when a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.month,
        defaultValue: adapterToUse.date(),
        key: 'ArrowUp',
        expectedValue: 'July',
      });
    });

    it('should decrement go to the first month of the next year when when a value in December is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.monthAndYear,
        defaultValue: adapterToUse.date(new Date(2022, 11, 15)),
        key: 'ArrowUp',
        expectedValue: 'January 2023',
      });
    });

    it('should set the day 1 when no value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.dayOfMonth,
        key: 'ArrowUp',
        expectedValue: '1',
      });
    });

    it('should increment the day when a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.dayOfMonth,
        defaultValue: adapterToUse.date(),
        key: 'ArrowUp',
        expectedValue: '16',
      });
    });

    it('should go to the first day of the next month when a value in the last day of the month is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.monthAndDate,
        defaultValue: adapterToUse.date(new Date(2022, 5, 30)),
        key: 'ArrowUp',
        expectedValue: 'July 1',
        // To select the date and not the month
        cursorPosition: 5,
      });
    });

    it('should not edit the value when props.readOnly = true and no value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        readOnly: true,
        key: 'ArrowUp',
        expectedValue: 'year',
      });
    });

    it('should not edit the value when props.readOnly = true and a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        defaultValue: adapterToUse.date(),
        readOnly: true,
        key: 'ArrowUp',
        expectedValue: '2022',
      });
    });
  });

  describe('key: Backspace', () => {
    it('should clear the selected section when only this section is completed', () => {
      render(<DateField format={adapterToUse.formats.monthAndYear} />);
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);

      // Set a value for the "month" section
      fireEvent.change(input, { target: { value: 'j year' } }); // press "j"
      expect(input.value).to.equal('January year');

      userEvent.keyPress(input, { key: 'Backspace' });
      expect(input.value).to.equal('month year');
    });

    it('should clear the selected section when all sections are completed', () => {
      testKeyPress({
        format: adapterToUse.formats.monthAndYear,
        defaultValue: adapterToUse.date(),
        key: 'Backspace',
        expectedValue: 'month 2022',
      });
    });

    it('should clear all the sections when all sections are selected and all sections are completed', () => {
      render(
        <DateField format={adapterToUse.formats.monthAndYear} defaultValue={adapterToUse.date()} />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);

      // Select all sections
      userEvent.keyPress(input, { key: 'a', ctrlKey: true });

      userEvent.keyPress(input, { key: 'Backspace' });
      expect(input.value).to.equal('month year');
    });

    it('should clear all the sections when all sections are selected and not all sections are completed', () => {
      render(<DateField format={adapterToUse.formats.monthAndYear} />);
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);

      // Set a value for the "month" section
      fireEvent.change(input, { target: { value: 'j year' } }); // Press "j"
      expect(input.value).to.equal('January year');

      // Select all sections
      userEvent.keyPress(input, { key: 'a', ctrlKey: true });

      userEvent.keyPress(input, { key: 'Backspace' });
      expect(input.value).to.equal('month year');
    });

    it('should not clear the sections when props.readOnly = true', () => {
      testKeyPress({
        format: adapterToUse.formats.year,
        defaultValue: adapterToUse.date(),
        readOnly: true,
        key: 'Backspace',
        expectedValue: '2022',
      });
    });
  });

  describe('Digit editing', () => {
    it('should set the day to the digit pressed when no digit no value is provided', () => {
      testChange({
        format: adapterToUse.formats.dayOfMonth,
        inputValue: '1',
        expectedValue: '1',
      });
    });

    it('should concatenate the digit pressed to the current section value if the output is valid', () => {
      testChange({
        format: adapterToUse.formats.dayOfMonth,
        defaultValue: adapterToUse.date(new Date(2022, 5, 0)),
        inputValue: '1',
        expectedValue: '11',
      });
    });

    it('should set the day to the digit pressed if the concatenate exceeds the maximum value for the section', () => {
      testChange({
        format: adapterToUse.formats.dayOfMonth,
        defaultValue: adapterToUse.date(new Date(2022, 5, 4)),
        inputValue: '1',
        expectedValue: '1',
      });
    });

    it('should not edit when props.readOnly = true and no value is provided', () => {
      testChange({
        format: adapterToUse.formats.year,
        readOnly: true,
        inputValue: '1',
        expectedValue: 'year',
      });
    });

    it('should not edit value when props.readOnly = true and a value is provided', () => {
      testChange({
        format: adapterToUse.formats.year,
        defaultValue: adapterToUse.date(),
        readOnly: true,
        inputValue: '1',
        expectedValue: '2022',
      });
    });
  });

  describe('Letter editing', () => {
    it('should select the first month starting with the typed letter when no letter has been typed before and no value is provided', () => {
      testChange({
        format: adapterToUse.formats.month,
        inputValue: 'm',
        expectedValue: 'March',
      });
    });

    it('should select the first month starting with the typed letter when no letter has been typed before and a value is provided', () => {
      testChange({
        format: adapterToUse.formats.month,
        defaultValue: adapterToUse.date(),
        inputValue: 'm',
        expectedValue: 'March',
      });
    });

    it('should use the previously typed letters as long as it matches at least one month', () => {
      render(<DateField format={adapterToUse.formats.month} />);
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);

      // Current query: "J" => 3 matches
      fireEvent.change(input, { target: { value: 'j' } });
      expect(input.value).to.equal('January');

      // Current query: "JU" => 2 matches
      fireEvent.change(input, { target: { value: 'u' } });
      expect(input.value).to.equal('June');

      // Current query: "JUL" => 1 match
      fireEvent.change(input, { target: { value: 'l' } });
      expect(input.value).to.equal('July');

      // Current query: "JULO" => 0 match => fallback set the query to "O"
      fireEvent.change(input, { target: { value: 'o' } });
      expect(input.value).to.equal('October');
    });

    it('should not edit when props.readOnly = true and no value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.month,
        readOnly: true,
        key: '1',
        expectedValue: 'month',
      });
    });

    it('should not edit value when props.readOnly = true and a value is provided', () => {
      testKeyPress({
        format: adapterToUse.formats.month,
        defaultValue: adapterToUse.date(),
        readOnly: true,
        key: 'd',
        expectedValue: 'June',
      });
    });
  });

  describe('Do not loose missing section values ', () => {
    it('should not loose time information when a value is provided', () => {
      const onChange = spy();

      render(
        <DateField
          defaultValue={adapterToUse.date(new Date(2010, 3, 3, 3, 3, 3))}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 8);
      userEvent.keyPress(input, { key: 'ArrowDown' });

      expect(onChange.lastCall.firstArg).toEqualDateTime(new Date(2009, 3, 3, 3, 3, 3));
    });

    it('should not loose time information when cleaning the date then filling it again', () => {
      const onChange = spy();

      render(
        <DateField
          defaultValue={adapterToUse.date(new Date(2010, 3, 3, 3, 3, 3))}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);

      userEvent.keyPress(input, { key: 'a', ctrlKey: true });
      userEvent.keyPress(input, { key: 'Backspace' });

      fireEvent.change(input, { target: { value: '4/day/year' } }); // Press "4"
      expect(input.value).to.equal('04/day/year');

      userEvent.keyPress(input, { key: 'ArrowRight' });
      fireEvent.change(input, { target: { value: '04/3/year' } }); // Press "3"
      expect(input.value).to.equal('04/03/year');

      userEvent.keyPress(input, { key: 'ArrowRight' });
      fireEvent.change(input, { target: { value: '04/03/2' } }); // Press "2"
      fireEvent.change(input, { target: { value: '04/03/0' } }); // Press "0"
      fireEvent.change(input, { target: { value: '04/03/0' } }); // Press "0"
      fireEvent.change(input, { target: { value: '04/03/9' } }); // Press "9"
      expect(input.value).to.equal('04/03/2009');

      expect(onChange.lastCall.firstArg).toEqualDateTime(new Date(2009, 3, 3, 3, 3, 3));
    });

    it('should not loose date information when using the year format and value is provided', () => {
      const onChange = spy();

      render(
        <DateField
          format={adapterToUse.formats.year}
          defaultValue={adapterToUse.date(new Date(2010, 3, 3, 3, 3, 3))}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);
      userEvent.keyPress(input, { key: 'ArrowDown' });

      expect(onChange.lastCall.firstArg).toEqualDateTime(new Date(2009, 3, 3, 3, 3, 3));
    });

    it('should not loose date information when using the month format and value is provided', () => {
      const onChange = spy();

      render(
        <DateField
          format={adapterToUse.formats.month}
          defaultValue={adapterToUse.date(new Date(2010, 3, 3, 3, 3, 3))}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);
      userEvent.keyPress(input, { key: 'ArrowDown' });

      expect(onChange.lastCall.firstArg).toEqualDateTime(new Date(2010, 2, 3, 3, 3, 3));
    });
  });
});
