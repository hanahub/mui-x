import { ApiRef, RowData, useApiRef, XGrid } from '@material-ui/x-grid';
import { expect } from 'chai';
import * as React from 'react';
import { useFakeTimers } from 'sinon';
import { getColumnValues } from 'test/utils/helperFn';
import { createClientRenderStrictMode } from 'test/utils';

describe('<XGrid /> - apiRef', () => {
  let clock;

  afterEach(() => {
    clock.restore();
  });

  before(function beforeHook() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // Need layouting
      this.skip();
    }
  });
  let baselineProps;

  // TODO v5: replace with createClientRender
  const render = createClientRenderStrictMode();
  beforeEach(() => {
    clock = useFakeTimers();

    baselineProps = {
      rows: [
        {
          id: 0,
          brand: 'Nike',
        },
        {
          id: 1,
          brand: 'Adidas',
        },
        {
          id: 2,
          brand: 'Puma',
        },
      ],
      columns: [{ field: 'brand' }],
    };
  });

  let apiRef: ApiRef;

  const TestCase = () => {
    apiRef = useApiRef();
    return (
      <div style={{ width: 300, height: 300 }}>
        <XGrid apiRef={apiRef} columns={baselineProps.columns} rows={baselineProps.rows} />
      </div>
    );
  };

  it('should allow to reset rows with setRows and render after 100ms', () => {
    render(<TestCase />);
    const newRows = [
      {
        id: 3,
        brand: 'Asics',
      },
    ];
    apiRef.current.setRows(newRows);

    clock.tick(50);
    expect(getColumnValues()).to.deep.equal(['Nike', 'Adidas', 'Puma']);
    clock.tick(50);
    expect(getColumnValues()).to.deep.equal(['Asics']);
  });

  it('should allow to update row data', () => {
    render(<TestCase />);
    apiRef.current.updateRows([{ id: 1, brand: 'Fila' }]);
    apiRef.current.updateRows([{ id: 0, brand: 'Pata' }]);
    apiRef.current.updateRows([{ id: 2, brand: 'Pum' }]);
    clock.tick(100);
    expect(getColumnValues()).to.deep.equal(['Pata', 'Fila', 'Pum']);
  });

  it('update row data can also add rows', () => {
    render(<TestCase />);
    apiRef.current.updateRows([{ id: 1, brand: 'Fila' }]);
    apiRef.current.updateRows([{ id: 0, brand: 'Pata' }]);
    apiRef.current.updateRows([{ id: 2, brand: 'Pum' }]);
    apiRef.current.updateRows([{ id: 3, brand: 'Jordan' }]);
    clock.tick(100);
    expect(getColumnValues()).to.deep.equal(['Pata', 'Fila', 'Pum', 'Jordan']);
  });

  it('update row data can also add rows in bulk', () => {
    render(<TestCase />);
    apiRef.current.updateRows([
      { id: 1, brand: 'Fila' },
      { id: 0, brand: 'Pata' },
      { id: 2, brand: 'Pum' },
      { id: 3, brand: 'Jordan' },
    ]);
    clock.tick(100);
    expect(getColumnValues()).to.deep.equal(['Pata', 'Fila', 'Pum', 'Jordan']);
  });

  it('update row data can also delete rows', () => {
    render(<TestCase />);
    apiRef.current.updateRows([{ id: 1, _action: 'delete' }]);
    apiRef.current.updateRows([{ id: 0, brand: 'Apple' }]);
    apiRef.current.updateRows([{ id: 2, _action: 'delete' }]);
    apiRef.current.updateRows([{ id: 5, brand: 'Atari' }]);
    clock.tick(100);
    expect(getColumnValues()).to.deep.equal(['Apple', 'Atari']);
  });

  it('update row data can also delete rows in bulk', () => {
    render(<TestCase />);
    apiRef.current.updateRows([
      { id: 1, _action: 'delete' },
      { id: 0, brand: 'Apple' },
      { id: 2, _action: 'delete' },
      { id: 5, brand: 'Atari' },
    ]);
    clock.tick(100);
    expect(getColumnValues()).to.deep.equal(['Apple', 'Atari']);
  });

  it('update row data should process getRowId', () => {
    const TestCaseGetRowId = () => {
      apiRef = useApiRef();
      const getRowId = React.useCallback((row: RowData) => row.idField, []);
      return (
        <div style={{ width: 300, height: 300 }}>
          <XGrid
            apiRef={apiRef}
            columns={baselineProps.columns}
            rows={baselineProps.rows.map((row) => ({ idField: row.id, brand: row.brand }))}
            getRowId={getRowId}
          />
        </div>
      );
    };

    render(<TestCaseGetRowId />);
    expect(getColumnValues()).to.deep.equal(['Nike', 'Adidas', 'Puma']);
    apiRef.current.updateRows([
      { idField: 1, _action: 'delete' },
      { idField: 0, brand: 'Apple' },
      { idField: 2, _action: 'delete' },
      { idField: 5, brand: 'Atari' },
    ]);
    clock.tick(100);
    expect(getColumnValues()).to.deep.equal(['Apple', 'Atari']);
  });
});
