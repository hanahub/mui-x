import { GridRowId, GridValidRowModel } from '../gridRows';
import { GridCellParams } from './gridCellParams';

/**
 * Params passed to `apiRef.current.setEditCellValue`.
 */
export interface GridEditCellValueParams {
  /**
   * The row id.
   */
  id: GridRowId;
  /**
   * The field.
   */
  field: string;
  /**
   * The new value for the cell.
   */
  value: any;
  /**
   * The debounce time in milliseconds.
   */
  debounceMs?: number;
  /**
   * TBD
   */
  unstable_skipValueParser?: boolean;
}

enum GridCellEditStartReasons {
  enterKeyDown = 'enterKeyDown',
  cellDoubleClick = 'cellDoubleClick',
  printableKeyDown = 'printableKeyDown',
  deleteKeyDown = 'deleteKeyDown',
}

/**
 * Params passed to the `cellEditStart` event.
 */
export interface GridCellEditStartParams<V = any, R extends GridValidRowModel = any, F = V>
  extends GridCellParams<V, R, F> {
  /**
   * The reason for this event to be triggered.
   */
  reason?: GridCellEditStartReasons;
}

enum GridCellEditStopReasons {
  cellFocusOut = 'cellFocusOut',
  escapeKeyDown = 'escapeKeyDown',
  enterKeyDown = 'enterKeyDown',
  tabKeyDown = 'tabKeyDown',
  shiftTabKeyDown = 'shiftTabKeyDown',
}

/**
 * Params passed to the `cellEditStop event.
 */
export interface GridCellEditStopParams<V = any, R extends GridValidRowModel = any, F = V>
  extends GridCellParams<V, R, F> {
  /**
   * The reason for this event to be triggered.
   */
  reason?: GridCellEditStopReasons;
}

// https://github.com/mui/mui-x/pull/3738#discussion_r798504277
export { GridCellEditStartReasons, GridCellEditStopReasons };
