import * as React from 'react';
import { ownerDocument } from '@material-ui/core/utils';
import { GridColDef } from '../../../models/colDef';
import { useLogger } from '../../utils';
import { useEventCallback } from '../../../utils/material-ui-utils';
import {
  GRID_COLUMN_SEPARATOR_MOUSE_DOWN,
  GRID_COLUMN_RESIZE_START,
  GRID_COLUMN_RESIZE_STOP,
  GRID_COLUMN_RESIZE,
  GRID_COLUMN_RESIZE_COMMITTED,
} from '../../../constants/eventsConstants';
import {
  GRID_HEADER_CELL_CSS_CLASS,
  GRID_HEADER_CELL_SEPARATOR_RESIZABLE_CSS_CLASS,
} from '../../../constants/cssClassesConstants';
import {
  findGridCellElementsFromCol,
  findParentElementFromClassName,
  getFieldFromHeaderElem,
  findHeaderElementFromField,
} from '../../../utils/domUtils';
import { GridApiRef, CursorCoordinates, GridColumnHeaderParams } from '../../../models';
import { useGridApiEventHandler, useGridApiOptionHandler } from '../../root/useGridApiEventHandler';
import { optionsSelector } from '../../utils/optionsSelector';
import { useGridSelector } from '../core/useGridSelector';
import { useGridState } from '../core/useGridState';

const MIN_COL_WIDTH = 50;
let cachedSupportsTouchActionNone = false;

// TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
function doesSupportTouchActionNone(): boolean {
  if (!cachedSupportsTouchActionNone) {
    const element = document.createElement('div');
    element.style.touchAction = 'none';
    document.body.appendChild(element);
    cachedSupportsTouchActionNone = window.getComputedStyle(element).touchAction === 'none';
    element.parentElement!.removeChild(element);
  }
  return cachedSupportsTouchActionNone;
}

function trackFinger(event, currentTouchId): CursorCoordinates | boolean {
  if (currentTouchId !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === currentTouchId) {
        return {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }

    return false;
  }

  return {
    x: event.clientX,
    y: event.clientY,
  };
}

// TODO improve experience for last column
export const useGridColumnResize = (
  columnsRef: React.RefObject<HTMLDivElement>,
  apiRef: GridApiRef,
) => {
  const logger = useLogger('useGridColumnResize');
  const [, setGridState, forceUpdate] = useGridState(apiRef);
  const colDefRef = React.useRef<GridColDef>();
  const colElementRef = React.useRef<HTMLDivElement>();
  const colCellElementsRef = React.useRef<NodeListOf<Element>>();
  const initialOffset = React.useRef<number>();
  const stopResizeEventTimeout = React.useRef<any>();
  const touchId = React.useRef<number>();
  const options = useGridSelector(apiRef, optionsSelector);
  const columnsHeaderElement = columnsRef.current;

  const updateWidth = (newWidth: number) => {
    logger.debug(`Updating width to ${newWidth} for col ${colDefRef.current!.field}`);

    colDefRef.current!.width = newWidth;

    colElementRef.current!.style.width = `${newWidth}px`;
    colElementRef.current!.style.minWidth = `${newWidth}px`;
    colElementRef.current!.style.maxWidth = `${newWidth}px`;

    colCellElementsRef.current!.forEach((element) => {
      const div = element as HTMLDivElement;
      div.style.width = `${newWidth}px`;
      div.style.minWidth = `${newWidth}px`;
      div.style.maxWidth = `${newWidth}px`;
    });
  };

  const handleResizeMouseUp = useEventCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();

    apiRef.current!.updateColumn(colDefRef.current as GridColDef);

    clearTimeout(stopResizeEventTimeout.current);
    stopResizeEventTimeout.current = setTimeout(() => {
      apiRef.current.publishEvent(GRID_COLUMN_RESIZE_STOP);
      apiRef.current.publishEvent(GRID_COLUMN_RESIZE_COMMITTED, {
        element: colElementRef.current,
        colDef: colDefRef.current,
        api: apiRef,
        width: colDefRef.current?.width,
      });
    });

    logger.debug(
      `Updating col ${colDefRef.current!.field} with new width: ${colDefRef.current!.width}`,
    );
  });

  const handleResizeMouseMove = useEventCallback((nativeEvent) => {
    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    if (nativeEvent.buttons === 0) {
      handleResizeMouseUp();
      return;
    }

    let newWidth =
      initialOffset.current +
      nativeEvent.clientX -
      colElementRef.current!.getBoundingClientRect().left;
    newWidth = Math.max(MIN_COL_WIDTH, newWidth);

    updateWidth(newWidth);
    apiRef.current.publishEvent(GRID_COLUMN_RESIZE, {
      element: colElementRef.current,
      colDef: colDefRef.current,
      api: apiRef,
      width: newWidth,
    });
  });

  const handleColumnResizeMouseDown = useEventCallback(
    ({ colDef }: GridColumnHeaderParams, event: React.MouseEvent<HTMLDivElement>) => {
      // Only handle left clicks
      if (event.button !== 0) {
        return;
      }

      // Skip if the column isn't resizable
      if (!event.currentTarget.classList.contains(GRID_HEADER_CELL_SEPARATOR_RESIZABLE_CSS_CLASS)) {
        return;
      }

      // Avoid text selection
      event.preventDefault();

      colElementRef.current = findParentElementFromClassName(
        event.currentTarget,
        GRID_HEADER_CELL_CSS_CLASS,
      ) as HTMLDivElement;

      logger.debug(`Start Resize on col ${colDef.field}`);
      apiRef.current.publishEvent(GRID_COLUMN_RESIZE_START, { field: colDef.field });

      colDefRef.current = colDef;
      colElementRef.current = columnsHeaderElement!.querySelector(
        `[data-field="${colDef.field}"]`,
      ) as HTMLDivElement;

      colCellElementsRef.current = findGridCellElementsFromCol(
        colElementRef.current,
      ) as NodeListOf<Element>;

      const doc = ownerDocument(apiRef.current.rootElementRef!.current as HTMLElement);
      doc.body.style.cursor = 'col-resize';

      initialOffset.current =
        (colDefRef.current!.width as number) -
        (event.clientX - colElementRef.current!.getBoundingClientRect().left);

      doc.addEventListener('mousemove', handleResizeMouseMove);
      doc.addEventListener('mouseup', handleResizeMouseUp);
    },
  );

  const handleTouchEnd = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId.current);

    if (!finger) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();

    apiRef.current!.updateColumn(colDefRef.current as GridColDef);

    clearTimeout(stopResizeEventTimeout.current);
    stopResizeEventTimeout.current = setTimeout(() => {
      apiRef.current.publishEvent(GRID_COLUMN_RESIZE_STOP);
    });

    logger.debug(
      `Updating col ${colDefRef.current!.field} with new width: ${colDefRef.current!.width}`,
    );
  });

  const handleTouchMove = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId.current);
    if (!finger) {
      return;
    }

    // Cancel move in case some other element consumed a touchmove event and it was not fired.
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }

    let newWidth =
      initialOffset.current! +
      (finger as CursorCoordinates).x -
      colElementRef.current!.getBoundingClientRect().left;
    newWidth = Math.max(MIN_COL_WIDTH, newWidth);

    updateWidth(newWidth);
    apiRef.current.publishEvent(GRID_COLUMN_RESIZE, {
      element: colElementRef.current,
      colDef: colDefRef.current,
      api: apiRef,
      width: newWidth,
    });
  });

  const handleTouchStart = useEventCallback((event) => {
    const cellSeparator = findParentElementFromClassName(
      event.target,
      GRID_HEADER_CELL_SEPARATOR_RESIZABLE_CSS_CLASS,
    );
    // Let the event bubble if the target is not a col separator
    if (!cellSeparator) return;
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      event.preventDefault();
    }

    const touch = event.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }

    colElementRef.current = findParentElementFromClassName(
      event.target,
      GRID_HEADER_CELL_CSS_CLASS,
    ) as HTMLDivElement;
    const field = getFieldFromHeaderElem(colElementRef.current!);
    const colDef = apiRef.current.getColumn(field);

    logger.debug(`Start Resize on col ${colDef.field}`);
    apiRef.current.publishEvent(GRID_COLUMN_RESIZE_START, { field });

    colDefRef.current = colDef;
    colElementRef.current = findHeaderElementFromField(
      columnsHeaderElement!,
      colDef.field,
    ) as HTMLDivElement;
    colCellElementsRef.current = findGridCellElementsFromCol(
      colElementRef.current,
    ) as NodeListOf<Element>;

    initialOffset.current =
      (colDefRef.current.width as number) -
      (touch.clientX - colElementRef.current!.getBoundingClientRect().left);

    const doc = ownerDocument(event.currentTarget as HTMLElement);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });

  const stopListening = React.useCallback(() => {
    const doc = ownerDocument(apiRef.current.rootElementRef!.current as HTMLElement);
    doc.body.style.removeProperty('cursor');
    doc.removeEventListener('mousemove', handleResizeMouseMove);
    doc.removeEventListener('mouseup', handleResizeMouseUp);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [apiRef, handleResizeMouseMove, handleResizeMouseUp, handleTouchMove, handleTouchEnd]);

  const handleResizeStart = React.useCallback(
    ({ field }) => {
      setGridState((oldState) => ({
        ...oldState,
        columnResize: { ...oldState.columnResize, resizingColumnField: field },
      }));
      forceUpdate();
    },
    [setGridState, forceUpdate],
  );

  const handleResizeStop = React.useCallback(() => {
    setGridState((oldState) => ({
      ...oldState,
      columnResize: { ...oldState.columnResize, resizingColumnField: '' },
    }));
    forceUpdate();
  }, [setGridState, forceUpdate]);

  React.useEffect(() => {
    columnsHeaderElement?.addEventListener('touchstart', handleTouchStart, {
      passive: doesSupportTouchActionNone(),
    });

    return () => {
      columnsHeaderElement?.removeEventListener('touchstart', handleTouchStart);

      clearTimeout(stopResizeEventTimeout.current);
      stopListening();
    };
  }, [columnsHeaderElement, handleTouchStart, stopListening]);

  useGridApiEventHandler(apiRef, GRID_COLUMN_SEPARATOR_MOUSE_DOWN, handleColumnResizeMouseDown);
  useGridApiEventHandler(apiRef, GRID_COLUMN_RESIZE_START, handleResizeStart);
  useGridApiEventHandler(apiRef, GRID_COLUMN_RESIZE_STOP, handleResizeStop);

  useGridApiOptionHandler(apiRef, GRID_COLUMN_RESIZE, options.onColumnResize);
  useGridApiOptionHandler(apiRef, GRID_COLUMN_RESIZE_COMMITTED, options.onColumnResizeCommitted);
};
