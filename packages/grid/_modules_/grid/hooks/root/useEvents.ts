import * as React from 'react';
import { ApiRef } from '../../models/api/apiRef';
import { CellParams } from '../../models/params/cellParams';
import { ColParams } from '../../models/params/colParams';
import { RowParams } from '../../models/params/rowParams';
import { useGridSelector } from '../features/core/useGridSelector';
import { optionsSelector } from '../utils/optionsSelector';
import { useLogger } from '../utils/useLogger';
import {
  CELL_CLICK,
  CLICK,
  COL_RESIZE_START,
  COL_RESIZE_STOP,
  COLUMN_HEADER_CLICK,
  UNMOUNT,
  KEYDOWN,
  KEYUP,
  RESIZE,
  ROW_CLICK,
  MOUSE_HOVER,
  CELL_HOVER,
  ROW_HOVER,
  COLUMN_HEADER_HOVER,
  FOCUS_OUT,
  GRID_FOCUS_OUT,
  COMPONENT_ERROR,
  STATE_CHANGE,
} from '../../constants/eventsConstants';
import { CELL_CSS_CLASS, ROW_CSS_CLASS } from '../../constants/cssClassesConstants';
import { findParentElementFromClassName, getIdFromRowElem, isCell } from '../../utils/domUtils';
import { useApiMethod } from './useApiMethod';
import { useApiEventHandler } from './useApiEventHandler';
import { buildCellParams, buildRowParams } from '../../utils/paramsUtils';
import { EventsApi } from '../../models/api/eventsApi';

export function useEvents(gridRootRef: React.RefObject<HTMLDivElement>, apiRef: ApiRef): void {
  //  We use the isResizingRef to prevent the click on column header when the user is resizing the column
  const isResizingRef = React.useRef(false);
  const logger = useLogger('useEvents');
  const options = useGridSelector(apiRef, optionsSelector);

  const getHandler = React.useCallback(
    (name: string) => (...args: any[]) => apiRef.current.publishEvent(name, ...args),
    [apiRef],
  );

  const getEventParams = React.useCallback(
    (event: MouseEvent) => {
      if (event.target == null) {
        throw new Error(
          `Event target null - Target has been removed or component might already be unmounted.`,
        );
      }

      const elem = event.target as HTMLElement;
      const eventParams: { cell?: CellParams; row?: RowParams; header?: ColParams } = {};

      if (isCell(elem)) {
        const cellEl = findParentElementFromClassName(elem, CELL_CSS_CLASS)! as HTMLElement;
        const rowEl = findParentElementFromClassName(elem, ROW_CSS_CLASS)! as HTMLElement;
        if (rowEl == null) {
          return null;
        }
        const id = getIdFromRowElem(rowEl);
        const rowModel = apiRef.current.getRowFromId(id);
        const rowIndex = apiRef.current.getRowIndexFromId(id);
        const field = cellEl.getAttribute('data-field') as string;
        const value = cellEl.getAttribute('data-value');
        const column = apiRef.current.getColumnFromField(field);
        if (!column || !column.disableClickEventBubbling) {
          const commonParams = {
            data: rowModel,
            rowIndex,
            colDef: column,
            rowModel,
            api: apiRef.current,
          };
          eventParams.cell = buildCellParams({
            ...commonParams,
            element: cellEl,
            value,
          });
          eventParams.row = buildRowParams({
            ...commonParams,
            element: rowEl,
          });
        }
      }
      return eventParams;
    },
    [apiRef],
  );

  const onClickHandler = React.useCallback(
    (event: MouseEvent) => {
      const eventParams = getEventParams(event);

      if (!eventParams) {
        return;
      }

      if (eventParams.cell) {
        apiRef.current.publishEvent(CELL_CLICK, eventParams.cell);
      }
      if (eventParams.row) {
        apiRef.current.publishEvent(ROW_CLICK, eventParams.row);
      }
    },
    [apiRef, getEventParams],
  );

  const onHoverHandler = React.useCallback(
    (event: MouseEvent) => {
      const eventParams = getEventParams(event);

      if (!eventParams) {
        return;
      }

      if (eventParams.cell) {
        apiRef.current.publishEvent(CELL_HOVER, eventParams.cell);
      }
      if (eventParams.row) {
        apiRef.current.publishEvent(ROW_HOVER, eventParams.row);
      }
      if (eventParams.header) {
        apiRef.current.publishEvent(COLUMN_HEADER_HOVER, eventParams.header);
      }
    },
    [apiRef, getEventParams],
  );

  const onFocusOutHandler = React.useCallback(
    (event: FocusEvent) => {
      apiRef.current.publishEvent(FOCUS_OUT, event);
      if (event.relatedTarget === null) {
        apiRef.current.publishEvent(GRID_FOCUS_OUT, event);
      }
    },
    [apiRef],
  );

  const onUnmount = React.useCallback(
    (handler: (param: any) => void): (() => void) => {
      return apiRef.current.subscribeEvent(UNMOUNT, handler);
    },
    [apiRef],
  );
  const onResize = React.useCallback(
    (handler: (param: any) => void): (() => void) => {
      return apiRef.current.subscribeEvent(RESIZE, handler);
    },
    [apiRef],
  );

  const handleResizeStart = React.useCallback(() => {
    isResizingRef.current = true;
  }, []);

  const handleResizeStop = React.useCallback(() => {
    isResizingRef.current = false;
  }, []);

  const resize = React.useCallback(() => apiRef.current.publishEvent(RESIZE), [apiRef]);
  const eventsApi: EventsApi = { resize, onUnmount, onResize };
  useApiMethod(apiRef, eventsApi, 'EventsApi');

  useApiEventHandler(apiRef, COL_RESIZE_START, handleResizeStart);
  useApiEventHandler(apiRef, COL_RESIZE_STOP, handleResizeStop);

  useApiEventHandler(apiRef, COLUMN_HEADER_CLICK, options.onColumnHeaderClick);
  useApiEventHandler(apiRef, CELL_CLICK, options.onCellClick);
  useApiEventHandler(apiRef, ROW_CLICK, options.onRowClick);
  useApiEventHandler(apiRef, CELL_HOVER, options.onCellHover);
  useApiEventHandler(apiRef, ROW_HOVER, options.onRowHover);
  useApiEventHandler(apiRef, COMPONENT_ERROR, options.onError);
  useApiEventHandler(apiRef, STATE_CHANGE, options.onStateChange);

  React.useEffect(() => {
    if (gridRootRef && gridRootRef.current && apiRef.current?.isInitialised) {
      logger.debug('Binding events listeners');
      const keyDownHandler = getHandler(KEYDOWN);
      const keyUpHandler = getHandler(KEYUP);
      const gridRootElem = gridRootRef.current;

      gridRootElem.addEventListener(CLICK, onClickHandler, { capture: true });
      gridRootElem.addEventListener(MOUSE_HOVER, onHoverHandler, { capture: true });
      gridRootElem.addEventListener(FOCUS_OUT, onFocusOutHandler);

      gridRootElem.addEventListener(KEYDOWN, keyDownHandler);
      gridRootElem.addEventListener(KEYUP, keyUpHandler);
      apiRef.current.isInitialised = true;
      const api = apiRef.current;

      return () => {
        logger.debug('Clearing all events listeners');
        api.publishEvent(UNMOUNT);
        gridRootElem.removeEventListener(CLICK, onClickHandler, { capture: true });
        gridRootElem.removeEventListener(MOUSE_HOVER, onHoverHandler, { capture: true });
        gridRootElem.removeEventListener(FOCUS_OUT, onFocusOutHandler);
        gridRootElem.removeEventListener(KEYDOWN, keyDownHandler);
        gridRootElem.removeEventListener(KEYUP, keyUpHandler);
        api.removeAllListeners();
      };
    }
    return undefined;
  }, [
    gridRootRef,
    apiRef.current?.isInitialised,
    getHandler,
    logger,
    onClickHandler,
    onHoverHandler,
    onFocusOutHandler,
    apiRef,
  ]);
}
