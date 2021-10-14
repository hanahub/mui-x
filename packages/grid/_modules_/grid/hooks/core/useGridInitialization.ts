import type { GridApiRef } from '../../models/api/gridApiRef';
import type { GridComponentProps } from '../../GridComponentProps';

import { useGridLoggerFactory } from './useGridLoggerFactory';
import { useGridApiInitialization } from './useGridApiInitialization';
import { useGridErrorHandler } from './useGridErrorHandler';
import { useGridControlState } from './useGridControlState';
import { useGridLocaleText } from './useGridLocaleText';
import { useGridStateProp } from './useGridStateProp';
import { useGridRowGroupsPreProcessing } from './rowGroupsPerProcessing';

/**
 * Initialize the technical pieces of the DataGrid (logger, state, ...) that any DataGrid implementation needs
 */
export const useGridInitialization = (apiRef: GridApiRef, props: GridComponentProps) => {
  useGridLoggerFactory(apiRef, props);
  useGridApiInitialization(apiRef, props);
  useGridErrorHandler(apiRef, props);
  useGridControlState(apiRef, props);
  useGridRowGroupsPreProcessing(apiRef);
  useGridLocaleText(apiRef, props);
  useGridStateProp(apiRef, props);
};
