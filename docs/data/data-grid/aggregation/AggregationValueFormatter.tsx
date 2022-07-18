import * as React from 'react';
import {
  DataGridPremium,
  PRIVATE_GRID_AGGREGATION_FUNCTIONS,
  GridAggregationFunction,
  GridColDef,
} from '@mui/x-data-grid-premium';
import { useMovieData } from '@mui/x-data-grid-generator';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const COLUMNS: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 200, groupable: false },
  {
    field: 'director',
    headerName: 'Director',
    width: 200,
  },
  {
    field: 'gross',
    headerName: 'Gross',
    type: 'number',
    width: 150,
    groupable: false,
    valueFormatter: ({ value }) => {
      if (!value) {
        return value;
      }
      return currencyFormatter.format(value);
    },
  },
];

const firstAlphabeticalAggregation: GridAggregationFunction<string, string | null> =
  {
    apply: (params) => {
      if (params.values.length === 0) {
        return null;
      }

      const sortedValue = params.values.sort((a = '', b = '') => a.localeCompare(b));

      return sortedValue[0];
    },
    label: 'first alphabetical',
    valueFormatter: (params) => `Agg: ${params.value}`,
    columnTypes: ['string'],
  };

export default function AggregationValueFormatter() {
  const data = useMovieData();

  return (
    <DataGridPremium
      // The 2 following props are here to avoid scroll in the demo while we don't have pinned rows
      rows={data.rows.slice(0, 3)}
      autoHeight
      columns={COLUMNS}
      private_aggregationFunctions={{
        ...PRIVATE_GRID_AGGREGATION_FUNCTIONS,
        firstAlphabetical: firstAlphabeticalAggregation,
      }}
      initialState={{
        private_aggregation: {
          model: {
            director: 'firstAlphabetical',
          },
        },
      }}
      experimentalFeatures={{
        private_aggregation: true,
      }}
    />
  );
}
