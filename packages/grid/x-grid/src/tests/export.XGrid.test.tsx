import { GridApiRef, useGridApiRef, XGrid } from '@material-ui/x-grid';
import { expect } from 'chai';
import * as React from 'react';
import { createClientRenderStrictMode } from 'test/utils';

describe('<XGrid /> - Export', () => {
  before(function beforeHook() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // Need layouting
      this.skip();
    }
  });

  // TODO v5: replace with createClientRender
  const render = createClientRenderStrictMode();

  let apiRef: GridApiRef;

  it('getDataAsCsv should return the correct string representation of the grid data', () => {
    const TestCaseCSVExport = () => {
      apiRef = useGridApiRef();
      return (
        <div style={{ width: 300, height: 300 }}>
          <XGrid
            apiRef={apiRef}
            columns={[{ field: 'brand', headerName: 'Brand' }]}
            rows={[
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
            ]}
          />
        </div>
      );
    };

    render(<TestCaseCSVExport />);
    expect(apiRef.current.getDataAsCsv()).to.equal('Brand\r\nNike\r\nAdidas\r\nPuma');
    apiRef.current.updateRows([
      {
        id: 1,
        brand: 'Adidas,Reebok',
      },
    ]);
    expect(apiRef.current.getDataAsCsv()).to.equal('Brand\r\nNike\r\n"Adidas,Reebok"\r\nPuma');
  });

  it('getDataAsCsv should return the correct string representation of the grid data if cell contains comma', () => {
    const TestCaseCSVExport = () => {
      apiRef = useGridApiRef();
      return (
        <div style={{ width: 300, height: 300 }}>
          <XGrid
            apiRef={apiRef}
            columns={[{ field: 'brand', headerName: 'Brand' }]}
            rows={[
              {
                id: 0,
                brand: 'Nike',
              },
              {
                id: 1,
                brand: 'Adidas,Puma',
              },
            ]}
          />
        </div>
      );
    };

    render(<TestCaseCSVExport />);
    expect(apiRef.current.getDataAsCsv()).to.equal('Brand\r\nNike\r\n"Adidas,Puma"');
  });

  it('getDataAsCsv should return the correct string representation of the grid data if cell contains comma and double quotes', () => {
    const TestCaseCSVExport = () => {
      apiRef = useGridApiRef();
      return (
        <div style={{ width: 300, height: 300 }}>
          <XGrid
            apiRef={apiRef}
            columns={[{ field: 'brand', headerName: 'Brand' }]}
            rows={[
              {
                id: 0,
                brand: 'Nike,"Adidas",Puma',
              },
            ]}
          />
        </div>
      );
    };

    render(<TestCaseCSVExport />);
    expect(apiRef.current.getDataAsCsv()).to.equal('Brand\r\n"Nike,""Adidas"",Puma"');
  });
});
