import * as React from 'react';
import { createClientRenderStrictMode } from 'test/utils';
import { expect } from 'chai';
import { spy } from 'sinon';
import { GridApiRef, GridComponentProps, useGridApiRef, XGrid } from '@material-ui/x-grid';

const isJSDOM = /jsdom/.test(window.navigator.userAgent);

describe('<XGrid /> - Selection', () => {
  // TODO v5: replace with createClientRender
  const render = createClientRenderStrictMode();

  let apiRef: GridApiRef;

  const baselineProps = {
    autoHeight: isJSDOM,
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

  const Test = (props: Partial<GridComponentProps>) => {
    apiRef = useGridApiRef();
    return (
      <div style={{ width: 300, height: 300 }}>
        <XGrid apiRef={apiRef} {...baselineProps} {...props} />
      </div>
    );
  };

  describe('getSelectedRows', () => {
    it('should return the latest values when called inside onSelectionModelChange', () => {
      render(
        <Test
          onSelectionModelChange={() => {
            expect(apiRef!.current.getSelectedRows().size).to.equal(1);
            expect(apiRef!.current.getSelectedRows().get(1)).to.equal(baselineProps.rows[1]);
          }}
        />,
      );
      expect(apiRef!.current.getSelectedRows().size).to.equal(0);
      apiRef!.current.selectRow(1);
    });
  });

  describe('selectRow', () => {
    it('should call onSelectionModelChange with the ids selected', () => {
      const onSelectionModelChange = spy();
      render(<Test onSelectionModelChange={onSelectionModelChange} />);
      apiRef!.current.selectRow(1);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([1]);
      apiRef!.current.selectRow(2);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([2]);
      // Keep old selection
      apiRef!.current.selectRow(3, true, true);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([2, 3]);
      apiRef!.current.selectRow(3, false, true);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([2]);
    });
  });

  describe('selectRows', () => {
    it('should call onSelectionModelChange with the ids selected', () => {
      const onSelectionModelChange = spy();
      render(<Test onSelectionModelChange={onSelectionModelChange} />);
      apiRef!.current.selectRows([1, 2]);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([1, 2]);
      apiRef!.current.selectRows([3]);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([1, 2, 3]);
      apiRef!.current.selectRows([1, 2], false);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([3]);
      // Deselect others
      apiRef!.current.selectRows([4, 5], true, true);
      expect(onSelectionModelChange.lastCall.args[0].selectionModel).to.deep.equal([4, 5]);
    });
  });

  it('should clean the selected ids when the rows prop changes', () => {
    const { setProps } = render(<Test selectionModel={[0, 1, 2]} checkboxSelection />);
    expect(apiRef.current.getSelectedRows()).to.have.keys([0, 1, 2]);
    setProps({
      rows: [
        {
          id: 0,
          brand: 'Nike',
        },
      ],
    });
    expect(apiRef.current.getSelectedRows()).to.have.keys([0]);
  });
});
