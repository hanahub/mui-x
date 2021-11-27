import * as React from 'react';
import { GridApiRef } from '../../../models/api/gridApiRef';
import { GridComponentProps } from '../../../GridComponentProps';
import {
  GRID_TREE_DATA_GROUP_COL_DEF,
  GRID_TREE_DATA_GROUP_COL_DEF_FORCED_FIELDS,
} from './gridTreeDataGroupColDef';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { GridEvents, GridEventListener } from '../../../models/events';
import { GridColDef, GridColDefOverrideParams, GridColumns } from '../../../models';
import { isSpaceKey } from '../../../utils/keyboardUtils';
import { useFirstRender } from '../../utils/useFirstRender';
import { buildRowTree } from '../../../utils/rowTreeUtils';
import { GridRowGroupingPreProcessing } from '../../core/rowGroupsPerProcessing';
import { gridFilteredDescendantCountLookupSelector } from '../filter';
import { GridPreProcessingGroup, useGridRegisterPreProcessor } from '../../core/preProcessing';

/**
 * Only available in DataGridPro
 * @requires useGridPreProcessing (method)
 * @requires useGridRowGroupsPreProcessing (method)
 */
export const useGridTreeData = (
  apiRef: GridApiRef,
  props: Pick<
    GridComponentProps,
    'treeData' | 'getTreeDataPath' | 'groupingColDef' | 'defaultGroupingExpansionDepth'
  >,
) => {
  const groupingColDef = React.useMemo<GridColDef>(() => {
    const propGroupingColDef = props.groupingColDef;

    const baseColDef: GridColDef = {
      ...GRID_TREE_DATA_GROUP_COL_DEF,
      headerName: apiRef.current.getLocaleText('treeDataGroupingHeaderName'),
      ...GRID_TREE_DATA_GROUP_COL_DEF_FORCED_FIELDS,
    };
    let colDefOverride: Partial<GridColDef>;

    if (typeof propGroupingColDef === 'function') {
      const params: GridColDefOverrideParams = {
        colDef: baseColDef,
      };

      colDefOverride = propGroupingColDef(params);
    } else {
      colDefOverride = propGroupingColDef ?? {};
    }

    return {
      ...baseColDef,
      ...colDefOverride,
    };
  }, [apiRef, props.groupingColDef]);

  const addGroupingColumn = React.useCallback(
    (columns: GridColumns) => {
      if (!props.treeData) {
        return columns;
      }

      const index = columns[0]?.field === '__check__' ? 1 : 0;

      return [...columns.slice(0, index), groupingColDef, ...columns.slice(index)];
    },
    [props.treeData, groupingColDef],
  );

  const updateRowGrouping = React.useCallback(() => {
    if (!props.treeData) {
      return apiRef.current.unstable_registerRowGroupsBuilder('treeData', null);
    }

    const groupRows: GridRowGroupingPreProcessing = (params) => {
      if (!props.getTreeDataPath) {
        throw new Error('MUI: No getTreeDataPath given.');
      }

      const rows = params.ids
        .map((rowId) => ({
          id: rowId,
          path: props.getTreeDataPath!(params.idRowsLookup[rowId]),
        }))
        .sort((a, b) => a.path.length - b.path.length);

      return buildRowTree({
        rows,
        ...params,
        defaultGroupingExpansionDepth: props.defaultGroupingExpansionDepth,
      });
    };

    return apiRef.current.unstable_registerRowGroupsBuilder('treeData', groupRows);
  }, [apiRef, props.getTreeDataPath, props.treeData, props.defaultGroupingExpansionDepth]);

  useFirstRender(() => {
    updateRowGrouping();
  });

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    updateRowGrouping();
  }, [updateRowGrouping]);

  useGridRegisterPreProcessor(apiRef, GridPreProcessingGroup.hydrateColumns, addGroupingColumn);

  const handleCellKeyDown = React.useCallback<GridEventListener<GridEvents.cellKeyDown>>(
    (params, event) => {
      const cellParams = apiRef.current.getCellParams(params.id, params.field);
      if (cellParams.colDef.type === 'treeDataGroup' && isSpaceKey(event.key)) {
        event.stopPropagation();
        event.preventDefault();

        const node = apiRef.current.getRowNode(params.id);
        const filteredDescendantCount =
          gridFilteredDescendantCountLookupSelector(apiRef.current.state)[params.id] ?? 0;

        if (!node || filteredDescendantCount === 0) {
          return;
        }

        apiRef.current.setRowChildrenExpansion(params.id, !node.childrenExpanded);
      }
    },
    [apiRef],
  );

  useGridApiEventHandler(apiRef, GridEvents.cellKeyDown, handleCellKeyDown);
};
