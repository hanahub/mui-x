---
title: Data Grid - Getting started
---

# Data Grid - Getting started

<p class="description">Get started with the last React data grid you will need. Install the package, configure the columns, provide rows, and you are set.</p>

## Installation

Using your favorite package manager, install `@mui/x-data-grid-pro` for the full-featured enterprise grid, or `@mui/x-data-grid` for the free community version.

```sh
// with npm
npm install @mui/x-data-grid

// with yarn
yarn add @mui/x-data-grid
```

The grid package has a peer dependency on `@mui/material`.
If you are not already using it in your project, you can install it with:

```sh
// with npm
npm install @mui/material @emotion/react @emotion/styled

// with yarn
yarn add @mui/material @emotion/react @emotion/styled
```

<!-- #react-peer-version -->

Please note that [react](https://www.npmjs.com/package/react) >= 17.0.0 and [react-dom](https://www.npmjs.com/package/react-dom) >= 17.0.0 are peer dependencies.

MUI is using [emotion](https://emotion.sh/docs/introduction) as a styling engine by default. If you want to use [`styled-components`](https://styled-components.com/) instead, run:

```sh
// with npm
npm install @mui/material @mui/styled-engine-sc styled-components

// with yarn
yarn add @mui/material @mui/styled-engine-sc styled-components
```

> 💡 Take a look at the [Styled Engine guide](/guides/styled-engine/) for more information about how to configure `styled-components` as the style engine.

## Quickstart

First, you have to import the component as below.
To avoid name conflicts the component is named `DataGridPro` for the full-featured enterprise grid, and `DataGrid` for the free community version.

```js
import { DataGrid } from '@mui/x-data-grid';
```

### Define rows

Rows are key-value pair objects, mapping column names as keys with their values.
You should also provide an `id` property on each row to allow delta updates and better performance.

Here is an example

```js
const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];
```

### Define columns

Comparable to rows, columns are objects defined with a set of attributes of the `GridColDef` interface.
They are mapped to the rows through their `field` property.

```tsx
const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];
```

You can import `GridColDef` to see all column properties.

### Demo

Putting it together, this is all you need to get started, as you can see in this live and interactive demo:

```tsx
import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function App() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
```

{{"demo": "Codesandbox.js", "hideToolbar": true, "bg": true}}

## TypeScript

In order to benefit from the [CSS overrides](/customization/theme-components/#global-style-overrides) and [default prop customization](/customization/theme-components/#default-props) with the theme, TypeScript users need to import the following types.
Internally, it uses module augmentation to extend the default theme structure.

```tsx
// When using TypeScript 4.x and above
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';

const theme = createTheme({
  components: {
    // Use `MuiDataGrid` on both DataGrid and DataGridPro
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: 'red',
        },
      },
    },
  },
});
```

## Licenses

While MUI Core is entirely licensed under MIT, MUI X serves a part of its components under a commercial license.
Please pay attention to the license.

### Plans

The component comes [in different plans](/pricing/):

- **Community** Plan: [`@mui/x-data-grid`](https://www.npmjs.com/package/@mui/x-data-grid), published under the [MIT license](https://tldrlegal.com/license/mit-license) and [free forever](https://mui-org.notion.site/Stewardship-542a2226043d4f4a96dfb429d16cf5bd).
- **Pro** Plan: [`@mui/x-data-grid-pro`](https://www.npmjs.com/package/@mui/x-data-grid-pro) published under a [Commercial license](/x/license/).

More information about the various plans on [the dedicated section](/x/advanced-components#plans)

### Feature comparison

The following table summarizes the features available in the community `DataGrid` and enterprise `DataGridPro` components.
All the features of the community version are available in the enterprise one.
The enterprise components come in two plans: Pro and Premium.

| Features                                                                                  | Community | Pro <span class="plan-pro"></span> | Premium <span class="plan-premium"></span> |
| :---------------------------------------------------------------------------------------- | :-------: | :--------------------------------: | :----------------------------------------: |
| **Column**                                                                                |           |                                    |
| [Column groups](/components/data-grid/columns/#column-groups)                             |    🚧     |                 🚧                 |                     🚧                     |
| [Column spanning](/components/data-grid/columns/#column-spanning)                         |    🚧     |                 🚧                 |                     🚧                     |
| [Column resizing](/components/data-grid/columns/#resizing)                                |    ❌     |                 ✅                 |                     ✅                     |
| [Column reorder](/components/data-grid/columns/#column-reorder)                           |    ❌     |                 ✅                 |                     ✅                     |
| [Column pinning](/components/data-grid/columns/#column-pinning)                           |    ❌     |                 ✅                 |                     ✅                     |
| **Row**                                                                                   |           |                                    |                                            |
| [Row height](/components/data-grid/rows/#row-height)                                      |    ✅     |                 ✅                 |                     ✅                     |
| [Row spanning](/components/data-grid/rows/#row-spanning)                                  |    🚧     |                 🚧                 |                     🚧                     |
| [Row reordering](/components/data-grid/rows/#row-reorder)                                 |    ❌     |                 🚧                 |                     🚧                     |
| [Row pinning](/components/data-grid/rows/#row-pinning)                                    |    ❌     |                 🚧                 |                     🚧                     |
| **Selection**                                                                             |           |                                    |                                            |
| [Single row selection](/components/data-grid/selection/#single-row-selection)             |    ✅     |                 ✅                 |                     ✅                     |
| [Checkbox selection](/components/data-grid/selection/#checkbox-selection)                 |    ✅     |                 ✅                 |                     ✅                     |
| [Multiple row selection](/components/data-grid/selection/#multiple-row-selection)         |    ❌     |                 ✅                 |                     ✅                     |
| [Cell range selection](/components/data-grid/selection/#range-selection)                  |    ❌     |                 ❌                 |                     🚧                     |
| **Filtering**                                                                             |           |                                    |                                            |
| [Quick filter](/components/data-grid/filtering/#quick-filter)                             |    🚧     |                 🚧                 |                     🚧                     |
| [Column filters](/components/data-grid/filtering/#single-and-multi-filtering)             |    ✅     |                 ✅                 |                     ✅                     |
| [Multi-column filtering](/components/data-grid/filtering/#multi-filtering)                |    ❌     |                 ✅                 |                     ✅                     |
| **Sorting**                                                                               |           |                                    |                                            |
| [Column sorting](/components/data-grid/sorting/)                                          |    ✅     |                 ✅                 |                     ✅                     |
| [Multi-column sorting](/components/data-grid/sorting/#multi-sorting)                      |    ❌     |                 ✅                 |                     ✅                     |
| **Pagination**                                                                            |           |                                    |                                            |
| [Pagination](/components/data-grid/pagination/)                                           |    ✅     |                 ✅                 |                     ✅                     |
| [Pagination > 100 rows per page](/components/data-grid/pagination/#size-of-the-page)      |    ❌     |                 ✅                 |                     ✅                     |
| **Editing**                                                                               |           |                                    |                                            |
| [Row editing](/components/data-grid/editing/#row-editing)                                 |    ✅     |                 ✅                 |                     ✅                     |
| [Cell editing](/components/data-grid/editing/#cell-editing)                               |    ✅     |                 ✅                 |                     ✅                     |
| **Import & export**                                                                       |           |                                    |                                            |
| [CSV export](/components/data-grid/export/#csv-export)                                    |    ✅     |                 ✅                 |                     ✅                     |
| [Print](/components/data-grid/export/#print-export)                                       |    ✅     |                 ✅                 |                     ✅                     |
| [Clipboard](/components/data-grid/export/#clipboard)                                      |    ❌     |                 🚧                 |                     🚧                     |
| [Excel export](/components/data-grid/export/#excel-export)                                |    ❌     |                 ❌                 |                     🚧                     |
| **Rendering**                                                                             |           |                                    |                                            |
| [Customizable components](/components/data-grid/components/)                              |    ✅     |                 ✅                 |                     ✅                     |
| [Column virtualization](/components/data-grid/virtualization/#column-virtualization)      |    ✅     |                 ✅                 |                     ✅                     |
| [Row virtualization > 100 rows](/components/data-grid/virtualization/#row-virtualization) |    ❌     |                 ✅                 |                     ✅                     |
| **Group & Pivot**                                                                         |           |                                    |                                            |
| [Tree data](/components/data-grid/group-pivot/#tree-data)                                 |    ❌     |                 ✅                 |                     ✅                     |
| [Master detail](/components/data-grid/group-pivot/#master-detail)                         |    ❌     |                 ✅                 |                     ✅                     |
| [Grouping](/components/data-grid/group-pivot/#row-grouping)                               |    ❌     |                 ❌                 |                     🚧                     |
| [Aggregation](/components/data-grid/group-pivot/#aggregation)                             |    ❌     |                 ❌                 |                     🚧                     |
| [Pivoting](/components/data-grid/group-pivot/#pivoting)                                   |    ❌     |                 ❌                 |                     🚧                     |
| **Misc**                                                                                  |           |                                    |                                            |
| [Accessibility](/components/data-grid/accessibility/)                                     |    ✅     |                 ✅                 |                     ✅                     |
| [Keyboard navigation](/components/data-grid/accessibility/#keyboard-navigation)           |    ✅     |                 ✅                 |                     ✅                     |
| [Localization](/components/data-grid/localization/)                                       |    ✅     |                 ✅                 |                     ✅                     |

## API

- [DataGrid](/api/data-grid/data-grid/)
- [DataGridPro](/api/data-grid/data-grid-pro/)
