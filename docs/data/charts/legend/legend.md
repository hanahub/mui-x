---
product: charts
title: Charts - Legend
---

# Charts - Legend

<p class="description">Legend is the UI element mapping symbols and colors to the series' label.</p>

## Basic display

In chart components, the legend links series with `label` properties and their color.

{{"demo": "BasicLegend.js", "bg": "inline"}}

## Placement

The legend can either be displayed in a `'column'` or `'row'` layout controlled with the `direction` property.

It can also be moved by a combination of `position: { vertical, horizontal }` properties and the legend offset values.
The `position` places the legend tight to the drawing area, and offset values move it relative to this base position.

- `vertical` can be `'top'`, `'middle'`, or `'bottom'`.
- `horizontal` can be `'left'`, `'middle'`, or `'right'`.
- offsets are set with CSS variables `--Legend-rootOffsetX` and `--Legend-rootOffsetY`.

Defaults are such that the legend is placed on top of the charts.

{{"demo": "LegendCustomizationNoSnap.js", "bg": "inline"}}

## Dimensions

The dimension of the legend is defined by some CSS variables:

- `--Legend-itemWidth`: The width of one series (including the mark and the label).
- `--Legend-itemMarkSize`: The size of the mark square.
- `--Legend-labelSpacing`: The space between the mark and the label.
- `--Legend-rootSpacing`: The space between two series.

{{"demo": "DimensionsNoSnap.js", "bg": "inline"}}
