# Data Grid - Performance

<p class="description">Improve the performance of the DataGrid using the recommendations from this guide.</p>

## Memoize inner components with `React.memo`

The `DataGrid` component is composed of a central state object where all data is stored.
When an API method is called, a prop changes, or the user interacts with the UI (e.g. filtering a column), this state object is updated with the changes made.
To reflect the changes in the interface, the component must re-render.
Since the state behaves like `React.useState`, the `DataGrid` component will re-render its children, including column headers, rows, and cells.
With smaller datasets, this is not a problem for concern, but it can become a bottleneck if the number of rows increases, especially if many columns render [custom content](/x/react-data-grid/column-definition/#rendering-cells).
One way to overcome this issue is using `React.memo` to only re-render the child components when their props have changed.
To start using memoization, import the inner components, then pass their memoized version to the respective slots, as follow:

```tsx
import {
  GridRow,
  GridColumnHeaders,
  DataGrid, // or DataGridPro, DataGridPremium
} from '@mui/x-data-grid';

const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);

<DataGrid
  slots={{
    row: MemoizedRow,
    columnHeaders: MemoizedColumnHeaders,
  }}
/>;
```

The following demo show this trick in action.
It also contains additional logic to highlight the components when they re-render.

{{"demo": "GridWithReactMemo.js", "bg": "inline", "defaultCodeOpen": false}}

:::warning
We do not ship the components above already wrapped with `React.memo` because if you have rows whose cells display custom content not derived from the received props, e.g. selectors, these cells may display outdated information.
If you define a column with a custom cell renderer where content comes from a [selector](/x/react-data-grid/state/#catalog-of-selectors) that changes more often than the props passed to `GridRow`, the row component should not be memoized.
:::

## API

- [DataGrid](/x/api/data-grid/data-grid/)
- [DataGridPro](/x/api/data-grid/data-grid-pro/)
- [DataGridPremium](/x/api/data-grid/data-grid-premium/)
