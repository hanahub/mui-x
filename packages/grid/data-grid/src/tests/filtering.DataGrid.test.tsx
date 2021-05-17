import * as React from 'react';
import { createClientRenderStrictMode } from 'test/utils';
import { expect } from 'chai';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { getColumnValues } from 'test/utils/helperFn';

const isJSDOM = /jsdom/.test(window.navigator.userAgent);

describe('<DataGrid /> - Filter', () => {
  // TODO v5: replace with createClientRender
  const render = createClientRenderStrictMode();

  const baselineProps = {
    autoHeight: isJSDOM,
    rows: [
      {
        id: 0,
        brand: 'Nike',
        isPublished: false,
      },
      {
        id: 1,
        brand: 'Adidas',
        isPublished: true,
      },
      {
        id: 2,
        brand: 'Puma',
        isPublished: true,
      },
    ],
    columns: [{ field: 'brand' }, { field: 'isPublished', type: 'boolean' }],
  };

  const TestCase = (props: {
    rows?: any[];
    columns?: any[];
    operator?: string;
    value?: string;
    field?: string;
  }) => {
    const { operator, value, rows, columns, field = 'brand' } = props;
    return (
      <div style={{ width: 300, height: 300 }}>
        <DataGrid
          autoHeight={isJSDOM}
          columns={columns || baselineProps.columns}
          rows={rows || baselineProps.rows}
          filterModel={{
            items: [
              {
                columnField: field,
                value,
                operatorValue: operator,
              },
            ],
          }}
          disableColumnFilter={false}
        />
      </div>
    );
  };

  it('should apply the filterModel prop correctly', () => {
    render(<TestCase value={'a'} operator={'contains'} />);
    expect(getColumnValues()).to.deep.equal(['Adidas', 'Puma']);
  });

  it('should apply the filterModel prop correctly when row prop changes', () => {
    render(
      <TestCase
        value={'a'}
        operator={'contains'}
        rows={[
          {
            id: 3,
            brand: 'Asics',
          },
          {
            id: 4,
            brand: 'RedBull',
          },
          {
            id: 5,
            brand: 'Hugo',
          },
        ]}
      />,
    );
    expect(getColumnValues()).to.deep.equal(['Asics']);
  });

  describe('string operators', () => {
    it('should allow operator startsWith', () => {
      const { setProps } = render(<TestCase value={'a'} operator={'contains'} />);
      setProps({
        operator: 'startsWith',
      });
      expect(getColumnValues()).to.deep.equal(['Adidas']);
    });

    it('should allow operator endsWith', () => {
      const { setProps } = render(<TestCase value={'a'} operator={'contains'} />);
      setProps({
        operator: 'endsWith',
      });
      expect(getColumnValues()).to.deep.equal(['Puma']);
    });

    it('should allow operator equal', () => {
      const { setProps } = render(<TestCase value={'a'} operator={'contains'} />);
      setProps({
        operator: 'equals',
        value: 'nike',
      });
      expect(getColumnValues()).to.deep.equal(['Nike']);
    });

    [
      { operator: 'contains', value: 'a', expected: ['Asics'] },
      { operator: 'startsWith', value: 'r', expected: ['RedBull'] },
      { operator: 'equals', value: 'hugo', expected: ['Hugo'] },
      { operator: 'endsWith', value: 'ics', expected: ['Asics'] },
    ].forEach(({ operator, value, expected }) => {
      it(`should allow object as value and work with valueGetter, operator: ${operator}`, () => {
        render(
          <TestCase
            value={value}
            operator={operator}
            rows={[
              {
                id: 3,
                brand: { name: 'Asics' },
              },
              {
                id: 4,
                brand: { name: 'RedBull' },
              },
              {
                id: 5,
                brand: { name: 'Hugo' },
              },
            ]}
            columns={[{ field: 'brand', valueGetter: (params) => params.value.name }]}
          />,
        );
        expect(getColumnValues()).to.deep.equal(expected);
      });
    });
  });

  describe('Numeric operators', () => {
    [
      { operator: '=', value: 1984, expected: [1984] },
      { operator: '!=', value: 1984, expected: [1954, 1974] },
      { operator: '>', value: 1974, expected: [1984] },
      { operator: '>=', value: 1974, expected: [1984, 1974] },
      { operator: '<', value: 1974, expected: [1954] },
      { operator: '<=', value: 1974, expected: [1954, 1974] },
    ].forEach(({ operator, value, expected }) => {
      it(`should allow object as value and work with valueGetter, operator: ${operator}`, () => {
        render(
          <TestCase
            value={value.toString()}
            operator={operator}
            rows={[
              {
                id: 3,
                brand: { year: 1984 },
              },
              {
                id: 4,
                brand: { year: 1954 },
              },
              {
                id: 5,
                brand: { year: 1974 },
              },
            ]}
            columns={[
              { field: 'brand', valueGetter: (params) => params.value.year, type: 'number' },
            ]}
          />,
        );
        expect(getColumnValues()).to.deep.equal(expected.map((res) => res.toLocaleString()));
      });
    });
  });

  describe('Date operators', function test() {
    const isEdge = /Edg/.test(window.navigator.userAgent);
    before(function before() {
      if (isEdge) {
        // We need to skip edge as it does not handle the date the same way as other browsers.
        this.skip();
      }
    });
    [
      { operator: 'is', value: new Date(2000, 11, 1), expected: ['12/1/2000'] },
      { operator: 'not', value: new Date(2000, 11, 1), expected: ['1/1/2001', '1/1/2002'] },
      { operator: 'after', value: new Date(2001, 0, 1), expected: ['1/1/2002'] },
      { operator: 'onOrAfter', value: new Date(2001, 0, 1), expected: ['1/1/2001', '1/1/2002'] },
      { operator: 'before', value: new Date(2001, 0, 1), expected: ['12/1/2000'] },
      { operator: 'onOrBefore', value: new Date(2001, 0, 1), expected: ['12/1/2000', '1/1/2001'] },
    ].forEach(({ operator, value, expected }) => {
      it(`should allow object as value and work with valueGetter, operator: ${operator}`, function dateOpsTest() {
        render(
          <TestCase
            value={value.toLocaleDateString()}
            operator={operator}
            rows={[
              {
                id: 3,
                brand: { date: new Date(2000, 11, 1) },
              },
              {
                id: 4,
                brand: { date: new Date(2001, 0, 1) },
              },
              {
                id: 5,
                brand: { date: new Date(2002, 0, 1) },
              },
            ]}
            columns={[{ field: 'brand', valueGetter: (params) => params.value.date, type: 'date' }]}
          />,
        );
        expect(getColumnValues()).to.deep.equal(expected.map((res) => res));
      });
    });
  });

  describe('boolean operators', () => {
    it('should allow operator is', () => {
      const { setProps } = render(<TestCase value={'a'} operator={'contains'} />);
      setProps({
        field: 'isPublished',
        operator: 'is',
        value: 'false',
      });
      expect(getColumnValues()).to.deep.equal(['Nike']);
      setProps({
        field: 'isPublished',
        operator: 'is',
        value: 'true',
      });
      expect(getColumnValues()).to.deep.equal(['Adidas', 'Puma']);
      setProps({
        field: 'isPublished',
        operator: 'is',
        value: '',
      });
      expect(getColumnValues()).to.deep.equal(['Nike', 'Adidas', 'Puma']);
    });
  });

  it('should support new dataset', () => {
    const { setProps } = render(<TestCase value={'a'} operator={'contains'} />);
    expect(getColumnValues()).to.deep.equal(['Adidas', 'Puma']);
    setProps({
      rows: [
        {
          id: 0,
          country: 'France',
        },
        {
          id: 1,
          country: 'UK',
        },
        {
          id: 12,
          country: 'US',
        },
      ],
      columns: [{ field: 'country' }],
    });
    expect(getColumnValues()).to.deep.equal(['France', 'UK', 'US']);
  });

  it('should translate operators dynamically in toolbar without crashing ', () => {
    const Test = () => {
      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={[
              {
                id: 1,
                quantity: 1,
              },
            ]}
            columns={[{ field: 'quantity', type: 'number', width: 150 }]}
            filterModel={{
              items: [
                {
                  columnField: 'quantity',
                  id: 1619547587572,
                  operatorValue: '=',
                  value: '1',
                },
              ],
            }}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      );
    };
    render(<Test />);
  });
});
