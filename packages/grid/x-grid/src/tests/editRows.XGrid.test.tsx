import {
  GRID_CELL_KEY_DOWN,
  GridApiRef,
  GridComponentProps,
  useGridApiRef,
  XGrid,
} from '@material-ui/x-grid';
import Portal from '@material-ui/unstyled/Portal';
import { expect } from 'chai';
import * as React from 'react';
import { getActiveCell, getCell, getColumnHeaderCell } from 'test/utils/helperFn';
import { stub } from 'sinon';
import {
  createClientRenderStrictMode,
  // @ts-expect-error need to migrate helpers to TypeScript
  fireEvent,
  // @ts-expect-error need to migrate helpers to TypeScript
  screen,
} from 'test/utils';

const isJSDOM = /jsdom/.test(window.navigator.userAgent);

describe('<XGrid /> - Edit Rows', () => {
  let baselineProps;

  // TODO v5: replace with createClientRender
  const render = createClientRenderStrictMode();
  beforeEach(() => {
    baselineProps = {
      autoHeight: isJSDOM,
      rows: [
        {
          id: 0,
          brand: 'Nike',
          year: 1941,
        },
        {
          id: 1,
          brand: 'Adidas',
          year: 1961,
        },
        {
          id: 2,
          brand: 'Puma',
          year: 1921,
        },
      ],
      columns: [
        { field: 'brand', editable: true },
        { field: 'year', editable: true },
      ],
    };
  });

  let apiRef: GridApiRef;

  const TestCase = (props: Partial<GridComponentProps>) => {
    apiRef = useGridApiRef();
    return (
      <div style={{ width: 300, height: 300 }}>
        <XGrid {...baselineProps} apiRef={apiRef} {...props} />
      </div>
    );
  };

  it('isCellEditable should add the class MuiDataGrid-cell--editable to editable cells but not prevent a cell from switching mode', () => {
    render(<TestCase isCellEditable={(params) => params.value === 'Adidas'} />);
    const cellNike = getCell(0, 0);
    expect(cellNike).not.to.have.class('MuiDataGrid-cell--editable');
    const cellAdidas = getCell(1, 0);
    expect(cellAdidas).to.have.class('MuiDataGrid-cell--editable');

    apiRef!.current.setCellMode(0, 'brand', 'edit');
    expect(cellNike).to.have.class('MuiDataGrid-cell--editing');
  });

  it('should allow to switch between cell mode', () => {
    render(<TestCase />);
    apiRef!.current.setCellMode(1, 'brand', 'edit');
    const cell = getCell(1, 0);

    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
    expect(cell.querySelector('input')!.value).to.equal('Adidas');

    apiRef!.current.setCellMode(1, 'brand', 'view');
    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell.querySelector('input')).to.equal(null);
  });

  it('should allow to switch between cell mode using double click', () => {
    render(<TestCase />);
    const cell = getCell(1, 0);
    cell.focus();
    fireEvent.doubleClick(cell);

    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
    expect(cell.querySelector('input')!.value).to.equal('Adidas');
  });

  it('should allow to stop double click using stopPropagation', () => {
    render(<TestCase onCellDoubleClick={(params, event) => event.stopPropagation()} />);
    const cell = getCell(1, 0);
    cell.focus();
    fireEvent.doubleClick(cell);

    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell.querySelector('input')).to.equal(null);
  });

  it('should be able to prevent the exit transition', () => {
    render(
      <TestCase
        onCellFocusOut={(params, event) => {
          (event as any).defaultMuiPrevented = true;
        }}
      />,
    );
    const cell = getCell(1, 1);
    cell.focus();
    fireEvent.doubleClick(cell);
    expect(cell).to.have.class('MuiDataGrid-cell--editing');

    const otherCell = getCell(2, 1);
    fireEvent.click(otherCell);
    fireEvent.focus(otherCell);
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
  });

  it('should allow to switch between cell mode using enter key', () => {
    render(<TestCase />);
    const cell = getCell(1, 0);
    cell.focus();
    fireEvent.keyDown(cell, { key: 'Enter' });

    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
    expect(cell.querySelector('input')!.value).to.equal('Adidas');
  });

  it('should allow to delete a cell directly if editable using delete key', () => {
    render(<TestCase />);
    const cell = getCell(1, 0);
    cell.focus();

    expect(cell).to.have.text('Adidas');
    fireEvent.keyDown(cell, { key: 'Delete' });
    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('');
  });

  it('should not allow to delete a cell directly if it is not editable', () => {
    render(<TestCase isCellEditable={() => false} />);
    const cell = getCell(1, 0);
    cell.focus();

    expect(cell).to.have.text('Adidas');
    fireEvent.keyDown(cell, { key: 'Delete' });
    expect(cell).not.to.have.class('MuiDataGrid-cell--editable');
    expect(cell).to.have.text('Adidas');
  });

  // Due to an issue with the keyDown event in test library, this test uses the apiRef to publish an event
  // https://github.com/testing-library/dom-testing-library/issues/405
  it('should allow to edit a cell value by typing an alpha char', () => {
    render(<TestCase />);
    const cell = getCell(1, 0);
    cell.focus();
    expect(cell).to.have.text('Adidas');
    const params = apiRef.current.getCellParams(1, 'brand');
    apiRef.current.publishEvent(GRID_CELL_KEY_DOWN, params, {
      key: 'a',
      code: 1,
      target: cell,
      isPropagationStopped: () => false,
    });
    // fireEvent.keyDown(cell, { key: 'a', code: 1, target: cell });

    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
    // we can't check input as we did not fire the real keyDown event
    // expect(cell.querySelector('input')!.value).to.equal('a');
  });

  it('should allow to rollback from edit changes using Escape', () => {
    render(<TestCase />);
    const cell = getCell(1, 0);
    cell.focus();
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('Adidas');

    fireEvent.change(input, { target: { value: 'n' } });
    expect(cell.querySelector('input')!.value).to.equal('n');

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('Adidas');
  });

  it('should allow to save an edit changes using Enter', () => {
    render(<TestCase />);
    const cell = getCell(1, 0);
    cell.focus();
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('Adidas');
    fireEvent.change(input, { target: { value: 'n' } });
    expect(cell.querySelector('input')!.value).to.equal('n');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('n');
    expect(getActiveCell()).to.equal('2-0');
  });

  it('should allow to save an edit changes using Tab', () => {
    render(<TestCase />);
    const cell = getCell(1, 0);
    cell.focus();
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('Adidas');

    fireEvent.change(input, { target: { value: 'n' } });
    expect(cell.querySelector('input')!.value).to.equal('n');

    fireEvent.keyDown(input, { key: 'Tab' });
    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('n');
    expect(getActiveCell()).to.equal('1-1');
  });

  it('should allow to save an edit changes using shift+Tab', () => {
    render(<TestCase />);
    const cell = getCell(1, 1);
    cell.focus();
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('1961');

    fireEvent.change(input, { target: { value: '1970' } });
    expect(cell.querySelector('input')!.value).to.equal('1970');

    fireEvent.keyDown(input, { key: 'Tab', shiftKey: true });
    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('1970');
    expect(getActiveCell()).to.equal('1-0');
  });

  it('should allow to save changes by clicking outside', () => {
    render(<TestCase />);
    const cell = getCell(1, 1);
    cell.focus();
    expect(getActiveCell()).to.equal('1-1');
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('1961');

    fireEvent.change(input, { target: { value: '1970' } });
    expect(cell.querySelector('input')!.value).to.equal('1970');

    const otherCell = getCell(2, 1);
    fireEvent.click(otherCell);
    fireEvent.focus(otherCell);
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('1970');
    expect(getActiveCell()).to.equal('2-1');
  });

  it('should save changes when a column header is dragged', () => {
    render(<TestCase />);
    const cell = getCell(1, 1);
    cell.focus();
    expect(getActiveCell()).to.equal('1-1');
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('1961');

    fireEvent.change(input, { target: { value: '1970' } });
    expect(cell.querySelector('input')!.value).to.equal('1970');

    const columnHeader = getColumnHeaderCell(0);
    fireEvent.dragStart(columnHeader.firstChild);
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('1970');
  });

  it('should save changes when a column header is focused', () => {
    render(<TestCase />);
    const cell = getCell(1, 1);
    cell.focus();
    expect(getActiveCell()).to.equal('1-1');
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('1961');

    fireEvent.change(input, { target: { value: '1970' } });
    expect(cell.querySelector('input')!.value).to.equal('1970');

    fireEvent.focus(getColumnHeaderCell(1));
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('1970');
  });

  it('should work correctly when the cell editing was initiated programmatically', () => {
    render(<TestCase />);
    apiRef.current.setCellMode(1, 'year', 'edit');
    expect(getActiveCell()).to.equal('1-1');
    const cell = getCell(1, 1);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('1961');

    fireEvent.change(input, { target: { value: '1970' } });
    expect(cell.querySelector('input')!.value).to.equal('1970');

    const otherCell = getCell(2, 1);
    fireEvent.click(otherCell);
    fireEvent.focus(otherCell);
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('1970');
    expect(getActiveCell()).to.equal('2-1');
  });

  it('should the focus to the new field', () => {
    const handleCellBlur = (params, event) => {
      if (params.cellMode === 'edit') {
        event?.stopPropagation();
      }
    };
    render(<TestCase onCellBlur={handleCellBlur} />);
    // Turn first cell into edit mode
    apiRef!.current.setCellMode(0, 'brand', 'edit');

    // Turn second cell into edit mode
    getCell(1, 0).focus();
    apiRef!.current.setCellMode(1, 'brand', 'edit');
    expect(document.querySelectorAll('input').length).to.equal(2);

    // Try to focus the first cell's input
    const input0 = getCell(0, 0).querySelector('input');
    input0!.focus();
    fireEvent.click(input0);
    expect(document.activeElement).to.have.property('value', 'Nike');
  });

  it('should apply the valueParser before saving the value', () => {
    const valueParser = stub().withArgs('62').returns(1962);
    render(
      <div style={{ width: 300, height: 300 }}>
        <XGrid
          {...baselineProps}
          columns={[
            { field: 'brand', editable: true },
            { field: 'year', editable: true, valueParser },
          ]}
        />
      </div>,
    );
    const cell = getCell(1, 1);
    cell.focus();
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('1961');

    fireEvent.change(input, { target: { value: '62' } });
    expect(cell.querySelector('input')!.value).to.equal('62');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('1962');
    expect(valueParser.callCount).to.equal(1);
    expect(valueParser.args[0][0]).to.equal('62');
    expect(valueParser.args[0][1]).to.deep.include({
      id: 1,
      field: 'year',
      value: 1961,
      row: {
        id: 1,
        brand: 'Adidas',
        year: 1961,
      },
    });
  });

  it('should stay in the edit mode when clicking in an element inside a portal', () => {
    render(
      <TestCase
        columns={[
          {
            field: 'brand',
            editable: true,
            renderEditCell: () => (
              <Portal>
                <button>Click me</button>
              </Portal>
            ),
          },
        ]}
      />,
    );
    const cell = getCell(0, 0);
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    fireEvent.doubleClick(cell);
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
    fireEvent.mouseUp(screen.getByRole('button', { name: /Click me/i }));
    fireEvent.click(screen.getByRole('button', { name: /Click me/i }));
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
  });

  it('should stay in the edit mode when the element inside the cell triggers click but no mouseup', () => {
    render(
      <TestCase
        columns={[
          {
            field: 'brand',
            editable: true,
            renderEditCell: () => <input type="checkbox" />,
          },
        ]}
      />,
    );
    const cell = getCell(0, 0);
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    fireEvent.doubleClick(cell);
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(cell).to.have.class('MuiDataGrid-cell--editing');
  });

  it('should support getRowId', () => {
    render(
      <TestCase
        getRowId={(row) => row.code}
        rows={baselineProps.rows.map((row) => ({ code: row.id, brand: row.brand }))}
      />,
    );
    expect(screen.queryAllByRole('row')).to.have.length(4);
    const cell = getCell(1, 0);
    cell.focus();
    fireEvent.doubleClick(cell);
    const input = cell.querySelector('input')!;
    expect(input.value).to.equal('Adidas');
    fireEvent.change(input, { target: { value: 'n' } });
    expect(cell.querySelector('input')!.value).to.equal('n');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(cell).to.have.class('MuiDataGrid-cell--editable');
    expect(cell).not.to.have.class('MuiDataGrid-cell--editing');
    expect(cell).to.have.text('n');
    expect(screen.queryAllByRole('row')).to.have.length(4);
  });
});
