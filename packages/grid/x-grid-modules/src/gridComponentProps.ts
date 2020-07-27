import { Columns, ApiRef, GridComponentOverridesProp, GridOptions, RowsProp } from './models';

/**
 * Partial set of [[GridOptions]].
 */
export type GridOptionsProp = Partial<GridOptions>;

/**
 * The grid component react props interface.
 */
export interface GridComponentProps {
  /**
   * Set of rows of type [[RowsProp]].
   */
  rows: RowsProp;
  /**
   * Set of columns of type [[Columns]].
   */
  columns: Columns;
  /**
   * Set of options of type [[GridOptionsProp]].
   */
  options?: GridOptionsProp;
  /**
   * Overrideable components.
   */
  components?: GridComponentOverridesProp;
  /**
   * The ref object that allows grid manipulation. Can be instantiated with [[gridApiRef()]].
   */
  apiRef?: ApiRef;
  /**
   * Boolean prop that toggle the loading overlay.
   */
  loading?: boolean;
  /**
   * @ignore
   */
  className?: string;
  /**
   * @internal enum
   */
  licenseStatus: string;
}
