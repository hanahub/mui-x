import * as React from 'react';
import { XGrid, GridOptionsProp, SortDirection } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Button from '@material-ui/core/Button';
import { array, boolean, number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { randomInt } from '../../data/random-generator';
import '@material-ui/x-grid-data-generator/style/real-data-stories.css';

export default {
  title: 'X-Grid Demos/Playground',
  component: XGrid,
  decorators: [withKnobs],
  parameters: {
    options: { selectedPanel: 'storybook/knobs/panel' },
    docs: {
      page: null,
    },
  },
};

const getGridOptions: () => GridOptionsProp = () => {
  const rowsPerPageOptions = array('rowsPerPageOptions', ['25', '50', '100'], ', ');
  const sortingOrder = array('sortingOrder', ['asc', 'desc', 'null'], ', ');

  return {
    onRowClick: (params) => action('onRowClick')(params),
    onCellClick: (params) => action('onCellClick')(params),
    onColumnHeaderClick: (params) => action('onColumnHeaderClick')(params),
    onRowSelected: (params) => action('onRowSelected')(params),
    onSelectionChange: (params) =>
      action('onSelectionChange', {
        depth: 1,
      })(params),
    onPageChange: (params) => action('onPageChange')(params),
    onPageSizeChange: (params) => action('onPageSizeChange')(params),

    pagination: boolean('pagination', false),
    pageSize: number('pageSize', 100),
    autoPageSize: boolean('autoPageSize', false),
    rowsPerPageOptions: rowsPerPageOptions.map((value) => parseInt(value, 10)),
    hideFooterRowCount: boolean('hideFooterRowCount', false),
    hideFooterPagination: boolean('hideFooterPagination', false),
    hideFooter: boolean('hideFooter', false),
    disableExtendRowFullWidth: boolean('disableExtendRowFullWidth', false),
    showCellRightBorder: boolean('showCellRightBorder', false),
    showColumnRightBorder: boolean('showColumnRightBorder', false),
    disableMultipleSelection: boolean('disableMultipleSelection', false),
    checkboxSelection: boolean('checkboxSelection', true),
    disableSelectionOnClick: boolean('disableSelectionOnClick', true),
    disableMultipleColumnsSorting: boolean('disableMultipleColumnsSorting', false),
    sortingOrder: sortingOrder.map((value) => (value === 'null' ? null : (value as SortDirection))),
    headerHeight: number('headerHeight', 56),
    rowHeight: number('rowHeight', 52),
  };
};

export function Commodity() {
  const { data, setRowLength, loadNewData } = useDemoData({ dataSet: 'Commodity', rowLength: 100 });

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button color="primary" onClick={loadNewData}>
          Load New Rows
        </Button>
        <Button color="primary" onClick={() => setRowLength(randomInt(100, 500))}>
          Load New Rows with new length
        </Button>
      </div>
      <div className="grid-container">
        <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
      </div>
    </React.Fragment>
  );
}

export function Commodity500() {
  const { data } = useDemoData({ dataSet: 'Commodity', rowLength: 500 });

  return (
    <div className="grid-container">
      <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
    </div>
  );
}

export function Commodity1000() {
  const { data } = useDemoData({ dataSet: 'Commodity', rowLength: 1000 });

  return (
    <div className="grid-container">
      <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
    </div>
  );
}

export function Commodity10000() {
  const { data } = useDemoData({ dataSet: 'Commodity', rowLength: 10000 });

  return (
    <div className="grid-container">
      <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
    </div>
  );
}

export function Employee100() {
  const { data } = useDemoData({ dataSet: 'Employee', rowLength: 100 });

  return (
    <div className="grid-container">
      <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
    </div>
  );
}

export function Employee1000() {
  const { data } = useDemoData({ dataSet: 'Employee', rowLength: 1000 });

  return (
    <div className="grid-container">
      <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
    </div>
  );
}

export function Employee10000() {
  const { data } = useDemoData({ dataSet: 'Employee', rowLength: 10000 });

  return (
    <div className="grid-container">
      <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
    </div>
  );
}

export function MultipleEmployee100() {
  const { data } = useDemoData({ dataSet: 'Employee', rowLength: 100 });

  return (
    <div className="grid-container" style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 'auto' }}>
        <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
      </div>
      <div style={{ display: 'flex', flex: 'auto' }}>
        <XGrid rows={data.rows} columns={data.columns} {...getGridOptions()} />
      </div>
    </div>
  );
}

export function XGridDemo() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
  });

  return (
    <div className="grid-container">
      <XGrid {...data} loading={data.rows.length === 0} rowHeight={38} checkboxSelection />
    </div>
  );
}
