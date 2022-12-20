import * as React from 'react';
import {
  BaseNextPickerInputProps,
  UsePickerValueNonStaticProps,
} from '@mui/x-date-pickers/internals';
import { PickersSlotsComponentsProps } from '../../internals/components/wrappers/WrapperProps';
import { PickerV6ComponentFamily } from '../describe.types';
import { DescribeValueOptions } from './describeValue.types';
import { testControlledUnControlled } from './testControlledUnControlled';
import { testPickerOpenCloseLifeCycle } from './testPickerOpenCloseLifeCycle';
import { testPickerActionBar } from './testPickerActionBar';

const TEST_SUITES = [testControlledUnControlled, testPickerOpenCloseLifeCycle, testPickerActionBar];

/**
 * Tests various aspects of the picker value.
 */
export function describeValue<TValue, C extends PickerV6ComponentFamily>(
  ElementToTest: React.ElementType,
  getOptions: () => DescribeValueOptions<C, TValue>,
) {
  const { defaultProps } = getOptions();

  function WrappedElementToTest(
    props: BaseNextPickerInputProps<TValue, any, any, any> &
      UsePickerValueNonStaticProps<TValue> & { componentsProps?: PickersSlotsComponentsProps },
  ) {
    return <ElementToTest {...defaultProps} {...props} />;
  }

  describe('Value API', () => {
    TEST_SUITES.forEach((testSuite) => {
      testSuite(WrappedElementToTest, getOptions);
    });
  });
}
