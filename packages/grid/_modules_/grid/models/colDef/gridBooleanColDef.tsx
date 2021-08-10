import { GRID_STRING_COL_DEF } from './gridStringColDef';
import { GridColTypeDef } from './gridColDef';
import { renderBooleanCell } from '../../components/cell/GridBooleanCell';
import { renderEditBooleanCell } from '../../components/cell/GridEditBooleanCell';
import { gridNumberComparer } from '../../utils/sortingUtils';
import { getGridBooleanOperators } from './gridBooleanOperators';
import { GridValueFormatterParams } from '../params/gridCellParams';

function gridBooleanFormatter({ value, api }: GridValueFormatterParams) {
  return value
    ? api.getLocaleText('booleanCellTrueLabel')
    : api.getLocaleText('booleanCellFalseLabel');
}

export const GRID_BOOLEAN_COL_DEF: GridColTypeDef = {
  ...GRID_STRING_COL_DEF,
  type: 'boolean',
  align: 'center',
  headerAlign: 'center',
  renderCell: renderBooleanCell,
  renderEditCell: renderEditBooleanCell,
  sortComparator: gridNumberComparer,
  valueFormatter: gridBooleanFormatter,
  filterOperators: getGridBooleanOperators(),
};
