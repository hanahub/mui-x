import { PaginationState } from '../../hooks/features/pagination/paginationReducer';
import { Rows } from '../rows';
import { Columns } from '../colDef/colDef';
import { GridOptions } from '../gridOptions';
import { RootContainerRef } from '../rootContainerRef';
import { ApiRef } from '../api';

/**
 * Object passed as React prop in the component override.
 */
export interface ComponentProps {
  /**
   * The object containing all pagination details in [[PaginationState]].
   */
  pagination: PaginationState;
  /**
   * The full set of rows.
   */
  rows: Rows;
  /**
   * The full set of columns.
   */
  columns: Columns;
  /**
   * The full set of options.
   */
  options: GridOptions;
  /**
   * ApiRef that let you manipulate the grid.
   */
  api: ApiRef;
  /**
   * The ref of the inner div Element of the grid.
   */
  rootElement: RootContainerRef;
}
