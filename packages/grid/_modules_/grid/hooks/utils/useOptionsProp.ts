import * as React from 'react';
import { DEFAULT_LOCALE_TEXT } from '../../constants/localeTextConstants';
import { GridComponentProps, GridOptionsProp } from '../../GridComponentProps';
import { ApiRef } from '../../models/api/apiRef';
import { DEFAULT_GRID_OPTIONS, GridOptions } from '../../models/gridOptions';
import { mergeOptions } from '../../utils/mergeUtils';
import { useGridReducer } from '../features/core/useGridReducer';

// REDUCER
export function optionsReducer(
  state: GridOptions,
  action: { type: string; payload?: Partial<GridOptions> },
) {
  switch (action.type) {
    case 'options::UPDATE':
      return mergeOptions(state, action.payload);
    default:
      throw new Error(`Material-UI: Action ${action.type} not found.`);
  }
}

export function useOptionsProp(apiRef: ApiRef, props: GridComponentProps): GridOptions {
  // TODO Refactor to smaller objects
  const options: GridOptionsProp = React.useMemo(
    () => ({
      pageSize: props.pageSize,
      logger: props.logger,
      sortingMode: props.sortingMode,
      filterMode: props.filterMode,
      autoHeight: props.autoHeight,
      autoPageSize: props.autoPageSize,
      checkboxSelection: props.checkboxSelection,
      columnBuffer: props.columnBuffer,
      columnTypes: props.columnTypes,
      disableSelectionOnClick: props.disableSelectionOnClick,
      disableMultipleColumnsSorting: props.disableMultipleColumnsSorting,
      disableMultipleSelection: props.disableMultipleSelection,
      disableMultipleColumnsFiltering: props.disableMultipleColumnsFiltering,
      disableColumnResize: props.disableColumnResize,
      disableDensitySelector: props.disableDensitySelector,
      disableColumnReorder: props.disableColumnReorder,
      disableColumnFilter: props.disableColumnFilter,
      disableColumnMenu: props.disableColumnMenu,
      disableColumnSelector: props.disableColumnSelector,
      disableExtendRowFullWidth: props.disableExtendRowFullWidth,
      headerHeight: props.headerHeight,
      hideFooter: props.hideFooter,
      hideFooterPagination: props.hideFooterPagination,
      hideFooterRowCount: props.hideFooterRowCount,
      hideFooterSelectedRowCount: props.hideFooterSelectedRowCount,
      showToolbar: props.showToolbar,
      logLevel: props.logLevel,
      onCellClick: props.onCellClick,
      onCellHover: props.onCellHover,
      onColumnHeaderClick: props.onColumnHeaderClick,
      onError: props.onError,
      onPageChange: props.onPageChange,
      onPageSizeChange: props.onPageSizeChange,
      onRowClick: props.onRowClick,
      onRowHover: props.onRowHover,
      onRowSelected: props.onRowSelected,
      onSelectionChange: props.onSelectionChange,
      onSortModelChange: props.onSortModelChange,
      onFilterModelChange: props.onFilterModelChange,
      onStateChange: props.onStateChange,
      page: props.page,
      pagination: props.pagination,
      paginationMode: props.paginationMode,
      rowCount: props.rowCount,
      rowHeight: props.rowHeight,
      rowsPerPageOptions: props.rowsPerPageOptions,
      scrollbarSize: props.scrollbarSize,
      showCellRightBorder: props.showCellRightBorder,
      showColumnRightBorder: props.showColumnRightBorder,
      sortingOrder: props.sortingOrder,
      sortModel: props.sortModel,
      density: props.density,
      filterModel: props.filterModel,
      localeText: { ...DEFAULT_LOCALE_TEXT, ...props.localeText },
    }),
    [
      props.pageSize,
      props.logger,
      props.sortingMode,
      props.filterMode,
      props.autoHeight,
      props.autoPageSize,
      props.checkboxSelection,
      props.columnBuffer,
      props.columnTypes,
      props.disableSelectionOnClick,
      props.disableMultipleColumnsSorting,
      props.disableMultipleSelection,
      props.disableMultipleColumnsFiltering,
      props.disableColumnResize,
      props.disableDensitySelector,
      props.disableColumnReorder,
      props.disableColumnFilter,
      props.disableColumnMenu,
      props.disableColumnSelector,
      props.disableExtendRowFullWidth,
      props.headerHeight,
      props.hideFooter,
      props.hideFooterPagination,
      props.hideFooterRowCount,
      props.hideFooterSelectedRowCount,
      props.showToolbar,
      props.logLevel,
      props.onCellClick,
      props.onCellHover,
      props.onColumnHeaderClick,
      props.onError,
      props.onPageChange,
      props.onPageSizeChange,
      props.onRowClick,
      props.onRowHover,
      props.onRowSelected,
      props.onSelectionChange,
      props.onSortModelChange,
      props.onFilterModelChange,
      props.onStateChange,
      props.page,
      props.pagination,
      props.paginationMode,
      props.rowCount,
      props.rowHeight,
      props.rowsPerPageOptions,
      props.scrollbarSize,
      props.showCellRightBorder,
      props.showColumnRightBorder,
      props.sortingOrder,
      props.sortModel,
      props.density,
      props.filterModel,
      props.localeText,
    ],
  );

  const { gridState, dispatch } = useGridReducer(apiRef, 'options', optionsReducer, {
    ...DEFAULT_GRID_OPTIONS,
  });

  const updateOptions = React.useCallback(
    (newOptions: Partial<GridOptions>) => {
      dispatch({ type: 'options::UPDATE', payload: newOptions });
    },
    [dispatch],
  );

  React.useEffect(() => {
    updateOptions(options);
  }, [options, updateOptions]);

  return gridState.options;
}
