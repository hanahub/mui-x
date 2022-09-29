import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { Unstable_TimeField as TimeField, TimeFieldProps } from '@mui/x-date-pickers/TimeField';
import { screen, act, userEvent } from '@mui/monorepo/test/utils';
import { createPickerRenderer, adapterToUse } from 'test/utils/pickers-utils';

describe('<TimeField /> - Editing', () => {
  const { render, clock } = createPickerRenderer({
    clock: 'fake',
    clockConfig: new Date(2022, 5, 15, 14, 25, 32),
  });

  const clickOnInput = (input: HTMLInputElement, cursorPosition: number) => {
    act(() => {
      input.focus();
      input.setSelectionRange(cursorPosition, cursorPosition);
      clock.runToLast();
    });
  };

  const testKeyPress = <TDate extends unknown>({
    key,
    expectedValue,
    cursorPosition = 1,
    ...props
  }: TimeFieldProps<TDate> & { key: string; expectedValue: string; cursorPosition?: number }) => {
    render(<TimeField {...props} />);
    const input = screen.getByRole('textbox');
    clickOnInput(input, cursorPosition);
    userEvent.keyPress(input, { key });
    expect(input.value).to.equal(expectedValue);
  };

  describe('key: ArrowDown', () => {
    describe('24 hours format', () => {
      it('should set the hour to 23 when no value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.hours24h,
          key: 'ArrowDown',
          expectedValue: '23',
        });
      });

      it('should decrement the hour when a value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.hours24h,
          defaultValue: adapterToUse.date(),
          key: 'ArrowDown',
          expectedValue: '13',
        });
      });

      it('should go to the last hour of the previous day when a value in the first hour is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime24h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 0, 12, 25)),
          key: 'ArrowDown',
          expectedValue: '23:12',
        });
      });

      it('should set the minutes to 59 when no value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.minutes,
          key: 'ArrowDown',
          expectedValue: '59',
        });
      });

      it('should decrement the minutes when a value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.minutes,
          defaultValue: adapterToUse.date(),
          key: 'ArrowDown',
          expectedValue: '24',
        });
      });

      it('should go to the last minute of the previous hour when a value with 0 minutes is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime24h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 14, 0, 32)),
          key: 'ArrowDown',
          expectedValue: '13:59',
          cursorPosition: 4,
        });
      });
    });

    describe('12 hours format', () => {
      it('should set the hour to 11 when no value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.hours12h,
          key: 'ArrowDown',
          expectedValue: '11',
        });
      });

      it('should go to the last hour of the previous day when a value in the first hour is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 0, 12, 25)),
          key: 'ArrowDown',
          expectedValue: '11:12 pm',
        });
      });

      it('should set the meridiem to PM when no value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          key: 'ArrowDown',
          expectedValue: 'hour:minute pm',
          cursorPosition: 14,
        });
      });

      it('should set the meridiem to PM when a value in AM is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: new Date(2022, 5, 15, 2, 25, 32),
          key: 'ArrowDown',
          expectedValue: '02:25 pm',
          cursorPosition: 14,
        });
      });

      it('should set the meridiem to AM when a value in PM is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: new Date(2022, 5, 15, 14, 25, 32),
          key: 'ArrowDown',
          expectedValue: '02:25 am',
          cursorPosition: 14,
        });
      });

      it('should go from AM to PM when the current value is 00:00 AM', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 0, 0, 32)),
          key: 'ArrowDown',
          expectedValue: '11:59 pm',
          cursorPosition: 4,
        });
      });

      it('should go from PM to AM when the current value is 00:00 PM', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 12, 0, 32)),
          key: 'ArrowDown',
          expectedValue: '11:59 am',
          cursorPosition: 4,
        });
      });
    });
  });

  describe('key: ArrowUp', () => {
    describe('24 hours format', () => {
      it('should set the hour to 0 when no value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.hours24h,
          key: 'ArrowUp',
          expectedValue: '00',
        });
      });

      it('should increment the hour when a value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.hours24h,
          defaultValue: adapterToUse.date(),
          key: 'ArrowUp',
          expectedValue: '15',
        });
      });

      it('should go to the first hour of the next day when a value in the last hour is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime24h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 23, 12, 25)),
          key: 'ArrowUp',
          expectedValue: '00:12',
        });
      });

      it('should set the minutes to 00 when no value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.minutes,
          key: 'ArrowUp',
          expectedValue: '00',
        });
      });

      it('should increment the minutes when a value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.minutes,
          defaultValue: adapterToUse.date(),
          key: 'ArrowUp',
          expectedValue: '26',
        });
      });

      it('should go to the first minute of the next hour when a value with 59 minutes is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime24h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 14, 59, 32)),
          key: 'ArrowUp',
          expectedValue: '15:00',
          cursorPosition: 4,
        });
      });
    });

    describe('12 hours format', () => {
      it('should set the meridiem to AM when no value is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          key: 'ArrowUp',
          expectedValue: 'hour:minute am',
          cursorPosition: 14,
        });
      });

      it('should set the meridiem to PM when a value in AM is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: new Date(2022, 5, 15, 2, 25, 32),
          key: 'ArrowUp',
          expectedValue: '02:25 pm',
          cursorPosition: 14,
        });
      });

      it('should set the meridiem to AM when a value in PM is provided', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: new Date(2022, 5, 15, 14, 25, 32),
          key: 'ArrowUp',
          expectedValue: '02:25 am',
          cursorPosition: 14,
        });
      });

      it('should go from AM to PM when the current value is 11:59 AM', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 11, 59, 32)),
          key: 'ArrowUp',
          expectedValue: '12:00 pm',
          cursorPosition: 4,
        });
      });

      it('should go from PM to AM when the current value is 11:59 PM', () => {
        testKeyPress({
          format: adapterToUse.formats.fullTime12h,
          defaultValue: adapterToUse.date(new Date(2022, 5, 15, 23, 59, 32)),
          key: 'ArrowUp',
          expectedValue: '12:00 am',
          cursorPosition: 4,
        });
      });
    });
  });

  describe('Do not loose missing section values ', () => {
    it('should not loose date information when a value is provided', () => {
      const onChange = spy();

      render(
        <TimeField
          defaultValue={adapterToUse.date(new Date(2010, 3, 3, 3, 3, 3))}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);
      userEvent.keyPress(input, { key: 'ArrowDown' });

      expect(onChange.lastCall.firstArg).toEqualDateTime(new Date(2010, 3, 3, 2, 3, 3));
    });

    it('should not loose time information when cleaning the date then filling it again', () => {
      const onChange = spy();

      render(
        <TimeField
          defaultValue={adapterToUse.date(new Date(2010, 3, 3, 3, 3, 3))}
          format={adapterToUse.formats.fullTime24h}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);

      userEvent.keyPress(input, { key: 'a', ctrlKey: true });
      userEvent.keyPress(input, { key: 'Backspace' });

      userEvent.keyPress(input, { key: '3' });
      expect(input.value).to.equal('03:minute');

      userEvent.keyPress(input, { key: 'ArrowRight' });
      userEvent.keyPress(input, { key: '4' });
      expect(input.value).to.equal('03:04');

      expect(onChange.lastCall.firstArg).toEqualDateTime(new Date(2010, 3, 3, 3, 4, 3));
    });

    it('should not loose time information when using the hour format and value is provided', () => {
      const onChange = spy();

      render(
        <TimeField
          format={adapterToUse.formats.hours24h}
          defaultValue={adapterToUse.date(new Date(2010, 3, 3, 3, 3, 3))}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      clickOnInput(input, 1);
      userEvent.keyPress(input, { key: 'ArrowDown' });

      expect(onChange.lastCall.firstArg).toEqualDateTime(new Date(2010, 3, 3, 2, 3, 3));
    });
  });
});
