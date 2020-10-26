import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, ComponentProps } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

function CustomPagination(props: ComponentProps) {
  const { pagination, api } = props;
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      page={pagination.page}
      count={pagination.pageCount}
      onChange={(event, value) => api.current.setPage(value)}
    />
  );
}

export default function CustomPaginationGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        pagination
        pageSize={5}
        components={{
          pagination: CustomPagination,
        }}
        {...data}
      />
    </div>
  );
}
