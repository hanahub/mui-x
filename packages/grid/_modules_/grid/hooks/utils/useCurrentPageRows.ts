import * as React from 'react';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import {
  gridPaginationRowRangeSelector,
  gridPaginatedVisibleSortedGridRowEntriesSelector,
} from '../features/pagination/gridPaginationSelector';
import { gridVisibleSortedRowEntriesSelector } from '../features/filter/gridFilterSelector';
import type { GridApiRef, GridRowEntry, GridState } from '../../models';

export const getCurrentPageRows = (
  state: GridState,
  props: Pick<DataGridProcessedProps, 'pagination' | 'paginationMode'>,
) => {
  let rows: GridRowEntry[];
  let range: { firstRowIndex: number; lastRowIndex: number } | null;

  if (props.pagination && props.paginationMode === 'client') {
    range = gridPaginationRowRangeSelector(state);
    rows = gridPaginatedVisibleSortedGridRowEntriesSelector(state);
  } else {
    rows = gridVisibleSortedRowEntriesSelector(state);
    if (rows.length === 0) {
      range = null;
    } else {
      range = { firstRowIndex: 0, lastRowIndex: rows.length - 1 };
    }
  }

  return { rows, range };
};

/**
 * Compute the list of the rows in the current page
 * - If the pagination is disabled or in server mode, it equals all the visible rows
 * - If the row tree has several layers, it contains up to `state.pageSize` top level rows and all their descendants
 * - If the row tree is flat, it only contains up to `state.pageSize` rows
 */
export const useCurrentPageRows = (
  apiRef: GridApiRef,
  props: Pick<DataGridProcessedProps, 'pagination' | 'paginationMode'>,
) => {
  const response = getCurrentPageRows(apiRef.current.state, props);

  return React.useMemo(
    () => ({
      rows: response.rows,
      range: response.range,
    }),
    [response.rows, response.range],
  );
};
