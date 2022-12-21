import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function loadServerRows(page, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.rows.slice(page * 5, (page + 1) * 5));
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

export default function ControlledSelectionServerPaginationGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page, data);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, data]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        {...data}
        rows={rows}
        pagination
        checkboxSelection
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowCount={100}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        loading={loading}
        keepNonExistentRowsSelected
      />
    </div>
  );
}
