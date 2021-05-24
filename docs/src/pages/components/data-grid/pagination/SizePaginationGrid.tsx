import * as React from 'react';
import { DataGrid, GridPageChangeParams } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

export default function SizePaginationGrid() {
  const [pageSize, setPageSize] = React.useState<number>(5);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  const handlePageSizeChange = (params: GridPageChangeParams) => {
    setPageSize(params.pageSize);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        {...data}
      />
    </div>
  );
}
