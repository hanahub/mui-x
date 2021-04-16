import {
  GridCellValue,
  gridCheckboxSelectionColDef,
  GridColumns,
  GridRowId,
  GridRowModel,
} from '../../../../models';

const serialiseCellValue = (value) => {
  if (typeof value === 'string') {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(',') ? `"${formattedValue}"` : formattedValue;
  }
  return value;
};

export function serialiseRow(
  id: GridRowId,
  columns: GridColumns,
  getCellValue: (id: GridRowId, field: string) => GridCellValue,
): Array<string> {
  const mappedRow: string[] = [];
  columns.forEach(
    (column) =>
      column.field !== gridCheckboxSelectionColDef.field &&
      mappedRow.push(serialiseCellValue(getCellValue(id, column.field))),
  );
  return mappedRow;
}

export function buildCSV(
  columns: GridColumns,
  rows: Map<GridRowId, GridRowModel>,
  selectedRows: Record<string, GridRowId>,
  getCellValue: (id: GridRowId, field: string) => GridCellValue,
): string {
  let rowIds = [...rows.keys()];
  const selectedRowIds = Object.keys(selectedRows);

  if (selectedRowIds.length) {
    rowIds = rowIds.filter((id) => selectedRowIds.includes(`${id}`));
  }

  const CSVHead = `${columns
    .filter((column) => column.field !== gridCheckboxSelectionColDef.field)
    .map((column) => serialiseCellValue(column.headerName || column.field))
    .toString()}\r\n`;
  const CSVBody = rowIds
    .reduce<string>((acc, id) => `${acc}${serialiseRow(id, columns, getCellValue)}\r\n`, '')
    .trim();
  const csv = `${CSVHead}${CSVBody}`.trim();

  return csv;
}
