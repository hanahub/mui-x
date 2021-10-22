import * as React from 'react';
import { GridApiRef } from '../../../models/api/gridApiRef';
import { useGridSelector } from '../../utils/useGridSelector';
import { GridEvents } from '../../../constants/eventsConstants';
import { gridContainerSizesSelector } from '../container/gridContainerSizesSelector';
import {
  useGridApiEventHandler,
  useGridApiOptionHandler,
} from '../../utils/useGridApiEventHandler';
import { GridRowScrollEndParams } from '../../../models/params/gridRowScrollEndParams';
import { visibleGridColumnsSelector } from '../columns/gridColumnsSelector';
import { GridComponentProps } from '../../../GridComponentProps';
import { GridScrollParams } from '../../../models/params/gridScrollParams';
import { visibleSortedGridRowsAsArraySelector } from '../filter/gridFilterSelector';
import { gridPaginationSelector } from '../pagination/gridPaginationSelector';
import { gridDensityRowHeightSelector } from '../density/densitySelector';

/**
 * Only available in DataGridPro
 * @requires useGridColumns (state)
 * @requires useGridContainerProps (state)
 * @requires useGridScroll (method
 */
export const useGridInfiniteLoader = (
  apiRef: GridApiRef,
  props: Pick<
    GridComponentProps,
    'onRowsScrollEnd' | 'scrollEndThreshold' | 'pagination' | 'paginationMode'
  >,
): void => {
  const containerSizes = useGridSelector(apiRef, gridContainerSizesSelector);
  const visibleColumns = useGridSelector(apiRef, visibleGridColumnsSelector);
  const visibleSortedRowsAsArray = useGridSelector(apiRef, visibleSortedGridRowsAsArraySelector);
  const paginationState = useGridSelector(apiRef, gridPaginationSelector);
  const rowHeight = useGridSelector(apiRef, gridDensityRowHeightSelector);

  const rowsInCurrentPage = React.useMemo(() => {
    if (props.pagination && props.paginationMode === 'client') {
      const start = paginationState.pageSize * paginationState.page;
      return visibleSortedRowsAsArray.slice(start, start + paginationState.pageSize);
    }
    return visibleSortedRowsAsArray;
  }, [
    paginationState.page,
    paginationState.pageSize,
    props.pagination,
    props.paginationMode,
    visibleSortedRowsAsArray,
  ]);

  const contentHeight = Math.max(rowsInCurrentPage.length * rowHeight, 1);

  const isInScrollBottomArea = React.useRef<boolean>(false);

  const handleRowsScrollEnd = React.useCallback(
    (scrollPosition: GridScrollParams) => {
      if (!containerSizes) {
        return;
      }

      const scrollPositionBottom = scrollPosition.top + containerSizes.windowSizes.height;

      if (scrollPositionBottom < contentHeight - props.scrollEndThreshold) {
        isInScrollBottomArea.current = false;
      }

      if (
        scrollPositionBottom >= contentHeight - props.scrollEndThreshold &&
        !isInScrollBottomArea.current
      ) {
        const rowScrollEndParam: GridRowScrollEndParams = {
          visibleColumns,
          viewportPageSize: containerSizes.viewportPageSize,
          virtualRowsCount: containerSizes.virtualRowsCount,
        };
        apiRef.current.publishEvent(GridEvents.rowsScrollEnd, rowScrollEndParam);
        isInScrollBottomArea.current = true;
      }
    },
    [containerSizes, contentHeight, props.scrollEndThreshold, visibleColumns, apiRef],
  );

  const handleGridScroll = React.useCallback(
    ({ left, top }) => {
      handleRowsScrollEnd({ left, top });
    },
    [handleRowsScrollEnd],
  );

  useGridApiEventHandler(apiRef, GridEvents.rowsScroll, handleGridScroll);
  useGridApiOptionHandler(apiRef, GridEvents.rowsScrollEnd, props.onRowsScrollEnd);
};
