// @ts-ignore Remove once the test utils are typed
import { createRenderer, act, GridApiPro } from '@mui/monorepo/test/utils';
import { getColumnValues } from 'test/utils/helperFn';
import * as React from 'react';
import { expect } from 'chai';
import { DataGridPro, GridApi, useGridApiRef } from '@mui/x-data-grid-pro';
import { useData } from 'packages/storybook/src/hooks/useData';

describe('<DataGridPro /> - Pagination', () => {
  const { render, clock } = createRenderer({ clock: 'fake' });

  describe('setPage', () => {
    it('should apply valid value', () => {
      let apiRef: React.MutableRefObject<GridApi>;

      const GridTest = () => {
        const basicData = useData(20, 2);
        apiRef = useGridApiRef();

        return (
          <div style={{ width: 300, height: 300 }}>
            <DataGridPro
              {...basicData}
              apiRef={apiRef}
              pagination
              pageSize={1}
              rowsPerPageOptions={[1]}
            />
          </div>
        );
      };

      render(<GridTest />);

      expect(getColumnValues(0)).to.deep.equal(['0']);
      act(() => {
        apiRef.current.setPage(1);
      });

      expect(getColumnValues(0)).to.deep.equal(['1']);
    });

    it('should apply last page if trying to go to a non-existing page', () => {
      let apiRef: React.MutableRefObject<GridApi>;
      const GridTest = () => {
        const basicData = useData(20, 2);
        apiRef = useGridApiRef();

        return (
          <div style={{ width: 300, height: 300 }}>
            <DataGridPro
              {...basicData}
              apiRef={apiRef}
              pagination
              pageSize={1}
              rowsPerPageOptions={[1]}
            />
          </div>
        );
      };

      render(<GridTest />);

      expect(getColumnValues(0)).to.deep.equal(['0']);
      act(() => {
        apiRef.current.setPage(50);
      });

      expect(getColumnValues(0)).to.deep.equal(['19']);
    });
  });

  describe('setPageSize', () => {
    it('should apply value', () => {
      let apiRef: React.MutableRefObject<GridApiPro>;
      const GridTest = () => {
        const [pageSize, setPageSize] = React.useState(5);
        const basicData = useData(20, 2);
        apiRef = useGridApiRef();

        return (
          <div style={{ width: 300, height: 300 }}>
            <DataGridPro
              {...basicData}
              apiRef={apiRef}
              pageSize={pageSize}
              rowsPerPageOptions={[pageSize]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
              disableVirtualization
            />
          </div>
        );
      };

      render(<GridTest />);
      clock.runToLast();

      expect(getColumnValues(0)).to.deep.equal(['0', '1', '2', '3', '4']);
      act(() => {
        apiRef.current.setPageSize(2);
      });

      expect(getColumnValues(0)).to.deep.equal(['0', '1']);
    });
  });
});
