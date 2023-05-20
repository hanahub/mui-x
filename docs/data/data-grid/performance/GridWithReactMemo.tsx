import * as React from 'react';
import Box from '@mui/material/Box';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { DataGridPro, GridRow, GridColumnHeaders } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';

const TraceUpdates = React.forwardRef<any, any>((props, ref) => {
  const { Component, ...other } = props;
  const rootRef = React.useRef<HTMLElement>();
  const handleRef = useForkRef(rootRef, ref);

  React.useEffect(() => {
    const root = rootRef.current;
    root!.classList.add('updating');
    root!.classList.add('updated');

    const timer = setTimeout(() => {
      root!.classList.remove('updating');
    }, 360);

    return () => {
      clearTimeout(timer);
    };
  });

  return <Component ref={handleRef} {...other} />;
});

const RowWithTracer = React.forwardRef((props, ref) => {
  return <TraceUpdates ref={ref} Component={GridRow} {...props} />;
});

const ColumnHeadersWithTracer = React.forwardRef((props, ref) => {
  return <TraceUpdates ref={ref} Component={GridColumnHeaders} {...props} />;
});

const MemoizedRow = React.memo(RowWithTracer);
const MemoizedColumnHeaders = React.memo(ColumnHeadersWithTracer);

export default function GridWithReactMemo() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    editable: true,
    maxColumns: 15,
  });

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
        '&&& .updated': {
          transition: (theme) =>
            theme.transitions.create(['background-color', 'outline'], {
              duration: theme.transitions.duration.standard,
            }),
        },
        '&&& .updating': {
          backgroundColor: 'rgb(92 199 68 / 25%)',
          outline: '1px solid rgb(92 199 68 / 35%)',
          outlineOffset: '-1px',
          transition: 'none',
        },
      }}
    >
      <DataGridPro
        {...data}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          row: MemoizedRow,
          columnHeaders: MemoizedColumnHeaders,
        }}
      />
    </Box>
  );
}
