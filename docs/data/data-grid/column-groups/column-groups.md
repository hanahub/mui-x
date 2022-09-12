---
title: Data Grid - Column groups
---

# Data grid - Column groups

<p class="description">Group your columns.</p>

Grouping columns allows you to have a multi-level hierarchy of columns in your header.

:::warning
This feature is experimental, it needs to be explicitly activated using the `columnGrouping` experimental feature flag.

```tsx
<DataGrid experimentalFeatures={{ columnGrouping: true }} {...otherProps} />
```

:::

## Define column groups

You can define column groups with the `columnGroupingModel` prop.
This prop receives an array of column groups.

A column group is defined by at least two properties:

- `groupId`: a string used to identify the group
- `children`: an array containing the children of the group

The `children` attribute can contain two types of objects:

- leafs with type `{ field: string }`, which add the column with the corresponding `field` to this group.
- other column groups which allows you to have nested groups.

:::warning
A column can only be associated with one group.
:::

```jsx
<DataGrid
  columnGroupingModel={[
    {
      groupId: 'internal data',
      children: [{ field: 'id' }],
    },
    {
      groupId: 'character',
      children: [
        {
          groupId: 'naming',
          children: [{ field: 'lastName' }, { field: 'firstName' }],
        },
        { field: 'age' },
      ],
    },
  ]}
/>
```

{{"demo": "BasicGroupingDemo.js", "bg": "inline"}}

## Customize column group

In addition to the required `groupId` and `children`, you can use the following optional properties to customize a column group:

- `headerName`: the string displayed as the column's name (instead of `groupId`).
- `description`: a text for the tooltip.
- `headerClassName`: a CSS class for styling customization.
- `renderHeaderGroup`: a function returning custom React component.

{{"demo": "CustomizationDemo.js", "bg": "inline"}}

## Column reordering [<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan)

By default, the columns that are part of a group cannot be dragged to outside their group.
You can customize this behavior on specific groups by setting `freeReordering: true` in a column group object.

In the example below, the `Full name` column group can be divided, but not other column groups.

{{"demo": "BreakingGroupDemo.js", "disableAd": true, "bg": "inline"}}

## Manage group visibility 🚧

:::warning
This feature isn't implemented yet. It's coming.
:::

The column group should allow to switch between an extended/collapsed view which hide/show some columns

## Reordering groups 🚧[<span class="plan-pro"></span>](/x/introduction/licensing/#pro-plan)

:::warning
This feature isn't implemented yet. It's coming.
:::

Users could drag and drop group header to move all the group children at once

## API

- [DataGrid](/x/api/data-grid/data-grid/)
- [DataGridPro](/x/api/data-grid/data-grid-pro/)
- [DataGridPremium](/x/api/data-grid/data-grid-premium/)
