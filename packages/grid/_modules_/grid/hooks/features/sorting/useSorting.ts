import * as React from 'react';
import {
  COLUMN_HEADER_CLICK,
  COLUMNS_UPDATED,
  MULTIPLE_KEY_PRESS_CHANGED,
  ROWS_CLEARED,
  ROWS_SET,
  ROWS_UPDATED,
  SORT_MODEL_CHANGE,
} from '../../../constants/eventsConstants';
import { ApiRef } from '../../../models/api/apiRef';
import { SortApi } from '../../../models/api/sortApi';
import { CellValue } from '../../../models/cell';
import { ColDef } from '../../../models/colDef/colDef';
import { FeatureModeConstant } from '../../../models/featureMode';
import { CellParams } from '../../../models/params/cellParams';
import { ColParams } from '../../../models/params/colParams';
import { SortModelParams } from '../../../models/params/sortModelParams';
import { RowModel, RowsProp } from '../../../models/rows';
import { FieldComparatorList, SortItem, SortModel, SortDirection } from '../../../models/sortModel';
import { buildCellParams } from '../../../utils/paramsUtils';
import { isDesc, nextSortDirection } from '../../../utils/sortingUtils';
import { isDeepEqual } from '../../../utils/utils';
import { useApiEventHandler } from '../../root/useApiEventHandler';
import { useApiMethod } from '../../root/useApiMethod';
import { optionsSelector } from '../../utils/optionsSelector';
import { useLogger } from '../../utils/useLogger';
import { allColumnsSelector, visibleColumnsSelector } from '../columns/columnsSelector';
import { GridState } from '../core/gridState';
import { useGridSelector } from '../core/useGridSelector';
import { useGridState } from '../core/useGridState';
import { rowCountSelector } from '../rows/rowsSelector';
import { SortingState } from './sortingState';

export const useSorting = (apiRef: ApiRef, rowsProp: RowsProp) => {
  const logger = useLogger('useSorting');
  const allowMultipleSorting = React.useRef<boolean>(false);
  const comparatorList = React.useRef<FieldComparatorList>([]);

  const [gridState, setGridState, forceUpdate] = useGridState(apiRef);
  const options = useGridSelector(apiRef, optionsSelector);
  const visibleColumns = useGridSelector(apiRef, visibleColumnsSelector);
  const rowCount = useGridSelector(apiRef, rowCountSelector);

  const getSortModelParams = React.useCallback(
    (sortModel: SortModel): SortModelParams => ({
      sortModel,
      api: apiRef.current,
      columns: apiRef.current.getAllColumns(),
    }),
    [apiRef],
  );

  const upsertSortModel = React.useCallback(
    (field: string, sortItem?: SortItem): SortModel => {
      const existingIdx = gridState.sorting.sortModel.findIndex((c) => c.field === field);
      let newSortModel = [...gridState.sorting.sortModel];
      if (existingIdx > -1) {
        if (!sortItem) {
          newSortModel.splice(existingIdx, 1);
        } else {
          newSortModel.splice(existingIdx, 1, sortItem);
        }
      } else {
        newSortModel = [...gridState.sorting.sortModel, sortItem!];
      }
      return newSortModel;
    },
    [gridState.sorting.sortModel],
  );

  const createSortItem = React.useCallback(
    (col: ColDef, directionOverride?: SortDirection): SortItem | undefined => {
      const existing = gridState.sorting.sortModel.find((c) => c.field === col.field);

      if (existing) {
        const nextSort =
          directionOverride === undefined
            ? nextSortDirection(options.sortingOrder, existing.sort)
            : directionOverride;

        return nextSort == null ? undefined : { ...existing, sort: nextSort };
      }
      return {
        field: col.field,
        sort:
          directionOverride === undefined
            ? nextSortDirection(options.sortingOrder)
            : directionOverride,
      };
    },
    [gridState.sorting.sortModel, options.sortingOrder],
  );

  const comparatorListAggregate = React.useCallback(
    (row1: RowModel, row2: RowModel) => {
      const result = comparatorList.current.reduce((res, colComparator) => {
        const { field, comparator } = colComparator;
        res =
          res ||
          comparator(
            row1[field],
            row2[field],
            buildCellParams({
              api: apiRef.current,
              colDef: apiRef.current.getColumnFromField(field),
              rowModel: row1,
              value: row1[field],
            }),
            buildCellParams({
              api: apiRef.current,
              colDef: apiRef.current.getColumnFromField(field),
              rowModel: row2,
              value: row2[field],
            }),
          );
        return res;
      }, 0);
      return result;
    },
    [apiRef],
  );

  const buildComparatorList = React.useCallback(
    (sortModel: SortModel): FieldComparatorList => {
      const comparators = sortModel.map((item) => {
        const column = apiRef.current.getColumnFromField(item.field);
        if (!column) {
          throw new Error(`Error sorting: column with field '${item.field}' not found. `);
        }
        const comparator = isDesc(item.sort)
          ? (v1: CellValue, v2: CellValue, cellParams1: CellParams, cellParams2: CellParams) =>
              -1 * column.sortComparator!(v1, v2, cellParams1, cellParams2)
          : column.sortComparator!;
        return { field: column.field, comparator };
      });
      return comparators;
    },
    [apiRef],
  );

  const applySorting = React.useCallback(() => {
    const rowModels = apiRef.current.getRowModels();

    if (options.sortingMode === FeatureModeConstant.server) {
      logger.debug('Skipping sorting rows as sortingMode = server');
      setGridState((oldState) => {
        return {
          ...oldState,
          sorting: { ...oldState.sorting, sortedRows: rowModels.map((row) => row.id) },
        };
      });
      return;
    }

    const sortModel = apiRef.current.getState<GridState>().sorting.sortModel;
    logger.debug('Sorting rows with ', sortModel);
    const sorted = [...rowModels];
    if (sortModel.length > 0) {
      comparatorList.current = buildComparatorList(sortModel);
      sorted.sort(comparatorListAggregate);
    }

    setGridState((oldState) => {
      return {
        ...oldState,
        sorting: { ...oldState.sorting, sortedRows: sorted.map((row) => row.id) },
      };
    });
    forceUpdate();
  }, [
    apiRef,
    logger,
    setGridState,
    forceUpdate,
    buildComparatorList,
    comparatorListAggregate,
    options.sortingMode,
  ]);

  const setSortModel = React.useCallback(
    (sortModel: SortModel) => {
      setGridState((oldState) => {
        const sortingState = { ...oldState.sorting, sortModel };
        return { ...oldState, sorting: { ...sortingState } };
      });
      forceUpdate();

      if (visibleColumns.length === 0) {
        return;
      }
      apiRef.current.publishEvent(SORT_MODEL_CHANGE, getSortModelParams(sortModel));
      apiRef.current.applySorting();
    },
    [setGridState, forceUpdate, visibleColumns.length, apiRef, getSortModelParams],
  );

  const sortColumn = React.useCallback(
    (column: ColDef, direction?: SortDirection) => {
      if (!column.sortable) {
        return;
      }
      const sortItem = createSortItem(column, direction);
      let sortModel: SortItem | SortItem[];
      if (!allowMultipleSorting.current) {
        sortModel = !sortItem ? [] : [sortItem];
      } else {
        sortModel = upsertSortModel(column.field, sortItem);
      }
      setSortModel(sortModel);
    },
    [upsertSortModel, setSortModel, createSortItem],
  );

  const headerClickHandler = React.useCallback(
    ({ colDef }: ColParams) => {
      sortColumn(colDef);
    },
    [sortColumn],
  );

  const onRowsCleared = React.useCallback(() => {
    setGridState((state) => {
      return { ...state, sorting: { ...state.sorting, sortedRows: [] } };
    });
  }, [setGridState]);

  const getSortModel = React.useCallback(() => gridState.sorting.sortModel, [
    gridState.sorting.sortModel,
  ]);

  const onMultipleKeyPressed = React.useCallback(
    (isPressed: boolean) => {
      allowMultipleSorting.current = !options.disableMultipleColumnsSorting && isPressed;
    },
    [options.disableMultipleColumnsSorting],
  );

  const onSortModelChange = React.useCallback(
    (handler: (param: SortModelParams) => void): (() => void) => {
      return apiRef.current.subscribeEvent(SORT_MODEL_CHANGE, handler);
    },
    [apiRef],
  );

  const onColUpdated = React.useCallback(() => {
    // When the columns change we check that the sorted columns are still part of the dataset
    setGridState((state) => {
      const sortModel = state.sorting.sortModel;
      const latestColumns = allColumnsSelector(state);
      let newModel = sortModel;
      if (sortModel.length > 0) {
        newModel = sortModel.reduce((model, sortedCol) => {
          const exist = latestColumns.find((col) => col.field === sortedCol.field);
          if (exist) {
            model.push(sortedCol);
          }
          return model;
        }, [] as SortModel);
      }

      return { ...state, sorting: { ...state.sorting, sortModel: newModel } };
    });
  }, [setGridState]);

  useApiEventHandler(apiRef, COLUMN_HEADER_CLICK, headerClickHandler);
  useApiEventHandler(apiRef, ROWS_SET, apiRef.current.applySorting);
  useApiEventHandler(apiRef, ROWS_CLEARED, onRowsCleared);
  useApiEventHandler(apiRef, ROWS_UPDATED, apiRef.current.applySorting);
  useApiEventHandler(apiRef, COLUMNS_UPDATED, onColUpdated);
  useApiEventHandler(apiRef, MULTIPLE_KEY_PRESS_CHANGED, onMultipleKeyPressed);

  useApiEventHandler(apiRef, SORT_MODEL_CHANGE, options.onSortModelChange);

  const sortApi: SortApi = {
    getSortModel,
    setSortModel,
    sortColumn,
    onSortModelChange,
    applySorting,
  };
  useApiMethod(apiRef, sortApi, 'SortApi');

  React.useEffect(() => {
    // When the rows prop change, we re apply the sorting.
    apiRef.current.applySorting();
  }, [apiRef, rowsProp]);

  React.useEffect(() => {
    if (rowCount > 0) {
      logger.debug('row changed, applying sortModel');
      apiRef.current.applySorting();
    }
  }, [rowCount, apiRef, logger]);

  // TODO Remove if we deprecate column.sortDirection
  React.useEffect(() => {
    if (visibleColumns.length > 0) {
      const sortedColumns = apiRef.current
        .getAllColumns()
        .filter((column) => column.sortDirection != null)
        .sort((a, b) => a.sortIndex! - b.sortIndex!);

      const sortModel = sortedColumns.map((column) => ({
        field: column.field,
        sort: column.sortDirection,
      }));

      if (
        sortModel.length > 0 &&
        !isDeepEqual(apiRef.current.getState<SortingState>('sorting').sortModel, sortModel)
      ) {
        // we use apiRef to avoid watching setSortModel as it will trigger an infinite loop
        apiRef.current.setSortModel(sortModel);
      }
    }
  }, [apiRef, visibleColumns]);

  React.useEffect(() => {
    const sortModel = options.sortModel || [];
    const oldSortModel = apiRef.current.state.sorting.sortModel;
    if (sortModel.length > 0 && !isDeepEqual(sortModel, oldSortModel)) {
      // we use apiRef to avoid watching setSortModel as it will trigger an update on every state change
      apiRef.current.setSortModel(sortModel);
    }
  }, [options.sortModel, apiRef]);
};
