import * as React from 'react';
import { GridApiRef } from '../../../models';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridPageSizeApi } from './gridPaginationInterfaces';
import { GridEvents } from '../../../models/events';
import {
  useGridLogger,
  useGridApiMethod,
  useGridApiEventHandler,
  useGridSelector,
} from '../../utils';
import { useGridStateInit } from '../../utils/useGridStateInit';
import { gridPageSizeSelector } from './gridPaginationSelector';
import { gridDensityRowHeightSelector } from '../density';

/**
 * @requires useGridDimensions (event) - can be after
 * @requires useGridFilter (state)
 */
export const useGridPageSize = (
  apiRef: GridApiRef,
  props: Pick<
    DataGridProcessedProps,
    'pageSize' | 'onPageSizeChange' | 'autoPageSize' | 'initialState'
  >,
) => {
  const logger = useGridLogger(apiRef, 'useGridPageSize');
  const rowHeight = useGridSelector(apiRef, gridDensityRowHeightSelector);

  useGridStateInit(apiRef, (state) => {
    let pageSize: number;
    if (props.pageSize != null) {
      pageSize = props.pageSize;
    } else if (props.initialState?.pagination?.pageSize != null) {
      pageSize = props.initialState.pagination.pageSize;
    } else if (props.autoPageSize) {
      pageSize = 0;
    } else {
      pageSize = 100;
    }

    return {
      ...state,
      pagination: {
        pageSize,
      },
    };
  });

  apiRef.current.unstable_updateControlState({
    stateId: 'pageSize',
    propModel: props.pageSize,
    propOnChange: props.onPageSizeChange,
    stateSelector: gridPageSizeSelector,
    changeEvent: GridEvents.pageSizeChange,
  });

  /**
   * API METHODS
   */
  const setPageSize = React.useCallback<GridPageSizeApi['setPageSize']>(
    (pageSize) => {
      if (pageSize === gridPageSizeSelector(apiRef.current.state)) {
        return;
      }

      logger.debug(`Setting page size to ${pageSize}`);

      apiRef.current.setState((state) => ({
        ...state,
        pagination: {
          ...state.pagination,
          pageSize,
        },
      }));
      apiRef.current.forceUpdate();
    },
    [apiRef, logger],
  );

  const pageSizeApi: GridPageSizeApi = {
    setPageSize,
  };

  useGridApiMethod(apiRef, pageSizeApi, 'GridPageSizeApi');

  /**
   * EVENTS
   */
  const handleUpdateAutoPageSize = React.useCallback(() => {
    const dimensions = apiRef.current.getRootDimensions();
    if (!props.autoPageSize || !dimensions) {
      return;
    }

    const maximumPageSizeWithoutScrollBar = Math.floor(
      dimensions.viewportInnerSize.height / rowHeight,
    );
    apiRef.current.setPageSize(maximumPageSizeWithoutScrollBar);
  }, [apiRef, props.autoPageSize, rowHeight]);

  useGridApiEventHandler(apiRef, GridEvents.viewportInnerSizeChange, handleUpdateAutoPageSize);

  /**
   * EFFECTS
   */
  React.useEffect(() => {
    if (props.pageSize != null && !props.autoPageSize) {
      apiRef.current.setPageSize(props.pageSize);
    }
  }, [apiRef, props.autoPageSize, props.pageSize]);

  React.useEffect(() => {
    handleUpdateAutoPageSize();
  }, [handleUpdateAutoPageSize]);
};
