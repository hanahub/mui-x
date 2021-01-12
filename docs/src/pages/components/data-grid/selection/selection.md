---
title: Data Grid - Selection
components: DataGrid, XGrid
---

# Data Grid - Selection

<p class="description">Selection allows the user to select and highlight a number of rows that they can then take action on.</p>

## Row selection

<!--
- https://ag-grid.com/javascript-grid-selection/
- https://ej2.syncfusion.com/react/demos/#/material/grid/selection
- https://ant.design/components/table/#components-table-demo-row-selection
- https://demos.telerik.com/kendo-ui/grid/selection
- https://www.telerik.com/kendo-react-ui/components/grid/selection/
- https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/RowSelection/React/Light/
- https://www.jqwidgets.com/react/react-grid/#https://www.jqwidgets.com/react/react-grid/react-grid-rowselection.htm
- http://tabulator.info/docs/4.5/select#setup-range
- https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/selection/
- https://ej2.syncfusion.com/react/demos/#/material/grid/checkbox-selection
- https://demos.telerik.com/kendo-ui/grid/checkbox-selection
-->

Row selection can be performed with a simple mouse click, or using the [keyboard shortcuts](/components/data-grid/accessibility/#selection). The grid supports single and multiple row selection.

### Single row selection

Single row selection is enable by default with the `DataGrid` component.
For the `XGrid`, you need to disable multiple row selection with `disableMultipleSelection={true}`.

{{"demo": "pages/components/data-grid/selection/SingleRowSelectionGrid.js", "bg": "inline"}}

### Multiple row selection [<span class="pro"></span>](https://material-ui.com/store/items/material-ui-x/)

To activate multiple selection, put focus the `XGrid` component and hold the <kbd>CTRL</kbd> key while selecting rows.

{{"demo": "pages/components/data-grid/selection/MultipleRowSelectionGrid.js", "disableAd": true, "bg": "inline"}}

## Checkbox selection

To activate checkbox selection set `checkboxSelection={true}`.

{{"demo": "pages/components/data-grid/selection/CheckboxSelectionGrid.js", "bg": "inline"}}

## Disable selection on click

You might have interactive content in the cells and need to disable the selection of the row on click. Use the `disableClickEventBubbling` option in this case.

{{"demo": "pages/components/data-grid/selection/DisableClickSelectionGrid.js", "bg": "inline"}}

## Controlled selection

{{"demo": "pages/components/data-grid/selection/ControlledSelectionGrid.js", "bg": "inline"}}

## apiRef [<span class="pro"></span>](https://material-ui.com/store/items/material-ui-x/)

The grid exposes a set of methods that enables all of these features using the imperative apiRef.

> ⚠️ Only use this API when you have no alternative. Always start from the declarative API that the grid exposes.

- `onSelectionChange`: Callback fired when the selection state of one or multiple rows changes.

## 🚧 Range selection [<span class="premium"></span>](https://material-ui.com/store/items/material-ui-x/)

> ⚠️ This feature isn't implemented yet. It's coming.
>
> 👍 Upvote [issue #208](https://github.com/mui-org/material-ui-x/issues/208) if you want to see it land faster.

With this feature, you will be able to select ranges of cells across the Grid.
