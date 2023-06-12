import { styled } from '@mui/material/styles';

export const AxisRoot = styled('g', {
  name: 'MuiChartsAxis',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  '&.MuiAxis-directionY': {
    '.MuiAxis-tickLabel': { alignmentBaseline: 'middle' },
    '.MuiAxis-label': { alignmentBaseline: 'baseline', textAnchor: 'middle' },
  },
  '&.MuiAxis-left': {
    '.MuiAxis-tickLabel': { alignmentBaseline: 'central', textAnchor: 'end' },
  },
  '&.MuiAxis-right': {
    '.MuiAxis-tickLabel': { alignmentBaseline: 'central', textAnchor: 'start' },
  },
  '&.MuiAxis-bottom': {
    '.MuiAxis-tickLabel, .MuiAxis-label': { alignmentBaseline: 'hanging', textAnchor: 'middle' },
  },
  '&.MuiAxis-top': {
    '.MuiAxis-tickLabel, .MuiAxis-label': { alignmentBaseline: 'baseline', textAnchor: 'middle' },
  },
});

export const Line = styled('line', {
  name: 'MuiAxis',
  slot: 'Line',
  overridesResolver: (props, styles) => styles.line,
})(({ theme }) => ({
  stroke: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
  strokeWidth: 1,
}));

export const Tick = styled('line', {
  name: 'MuiAxis',
  slot: 'Tick',
  overridesResolver: (props, styles) => styles.tick,
})(({ theme }) => ({
  stroke: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
}));

export const TickLabel = styled('text', {
  name: 'MuiAxis',
  slot: 'TickLabel',
  overridesResolver: (props, styles) => styles.tickLabel,
})(({ theme }) => ({
  ...theme.typography.caption,
  fill: theme.palette.text.primary,
}));

export const Label = styled('text', {
  name: 'MuiAxis',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})(({ theme }) => ({
  ...theme.typography.body1,
  fill: theme.palette.text.primary,
}));
