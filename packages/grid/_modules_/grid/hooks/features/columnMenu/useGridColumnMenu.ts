import * as React from 'react';
import { GridApiRef } from '../../../models/api/gridApiRef';
import { useGridApiMethod } from '../../root/useGridApiMethod';
import { useLogger } from '../../utils/useLogger';
import { useGridState } from '../core/useGridState';

export const useGridColumnMenu = (apiRef: GridApiRef): void => {
  const logger = useLogger('useGridColumnMenu');
  const [gridState, setGridState, forceUpdate] = useGridState(apiRef);

  const showColumnMenu = React.useCallback(
    (field: string, id: string, labelledby: string) => {
      logger.debug('Opening Column Menu');
      setGridState((state) => ({
        ...state,
        columnMenu: { open: true, field, id, labelledby },
      }));
      apiRef.current.hidePreferences();
      forceUpdate();
    },
    [apiRef, forceUpdate, logger, setGridState],
  );

  const hideColumnMenu = React.useCallback(() => {
    logger.debug('Hiding Column Menu');
    setGridState((state) => ({
      ...state,
      columnMenu: { ...state.columnMenu, open: false, id: undefined, labelledby: undefined },
    }));
    forceUpdate();
  }, [forceUpdate, logger, setGridState]);

  React.useEffect(() => {
    if (gridState.isScrolling) {
      hideColumnMenu();
    }
  }, [gridState.isScrolling, hideColumnMenu]);

  useGridApiMethod(
    apiRef,
    {
      showColumnMenu,
      hideColumnMenu,
    },
    'ColumnMenuApi',
  );
};
