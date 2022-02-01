import { GridState } from './gridState';
import { GridCallbackDetails } from './api/gridCallbackDetails';
import type { GridEventLookup, GridControlledStateEventLookup } from './events';
import type { OutputSelector } from '../utils/createSelector';

export interface GridControlStateItem<E extends keyof GridControlledStateEventLookup> {
  stateId: string;
  propModel?: GridEventLookup[E]['params'];
  stateSelector:
    | OutputSelector<GridControlledStateEventLookup[E]['params']>
    | ((state: GridState) => GridControlledStateEventLookup[E]['params']);
  propOnChange?: (
    model: GridControlledStateEventLookup[E]['params'],
    details: GridCallbackDetails,
  ) => void;
  changeEvent: E;
}
