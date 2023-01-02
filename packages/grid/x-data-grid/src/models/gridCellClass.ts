import { GridCellParams } from './params/gridCellParams';

/**
 * A function used to process cellClassName params.
 */
export type GridCellClassFn<V = any> = (params: GridCellParams<V>) => string;

/**
 * The union type representing the [[GridColDef]] cell class type.
 */
export type GridCellClassNamePropType<V = any> = string | GridCellClassFn<V>;
