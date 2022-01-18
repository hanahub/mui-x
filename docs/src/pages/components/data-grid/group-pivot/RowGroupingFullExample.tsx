import { useDemoData } from '@mui/x-data-grid-generator';
import * as React from 'react';
import {
  DataGridPro,
  GridApiRef,
  GridColumns,
  GridEvents,
  GridRowGroupingModel,
  useGridApiRef,
} from '@mui/x-data-grid-pro';

const INITIAL_GROUPING_COLUMN_MODEL = ['commodity'];

const useKeepGroupingColumnsHidden = (
  apiRef: GridApiRef,
  columns: GridColumns,
  initialModel: GridRowGroupingModel,
  leafField?: string,
) => {
  const prevModel = React.useRef(initialModel);

  React.useEffect(() => {
    apiRef.current.subscribeEvent(GridEvents.rowGroupingModelChange, (newModel) => {
      apiRef.current.updateColumns([
        ...newModel
          .filter((field) => !prevModel.current.includes(field))
          .map((field) => ({ field, hide: true })),
        ...prevModel.current
          .filter((field) => !newModel.includes(field))
          .map((field) => ({ field, hide: false })),
      ]);
      prevModel.current = initialModel;
    });
  }, [apiRef, initialModel]);

  return React.useMemo(
    () =>
      columns.map((colDef) =>
        initialModel.includes(colDef.field) ||
        (leafField && colDef.field === leafField)
          ? { ...colDef, hide: true }
          : colDef,
      ),
    [columns, initialModel, leafField],
  );
};

export default function RowGroupingFullExample() {
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 25,
  });
  const apiRef = useGridApiRef();

  const columns = useKeepGroupingColumnsHidden(
    apiRef,
    data.columns,
    INITIAL_GROUPING_COLUMN_MODEL,
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridPro
        {...data}
        apiRef={apiRef}
        columns={columns}
        loading={loading}
        disableSelectionOnClick
        initialState={{
          rowGrouping: {
            model: INITIAL_GROUPING_COLUMN_MODEL,
          },
          sorting: {
            sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
          },
        }}
        groupingColDef={{
          leafField: 'traderEmail',
        }}
        experimentalFeatures={{
          rowGrouping: true,
        }}
      />
    </div>
  );
}
