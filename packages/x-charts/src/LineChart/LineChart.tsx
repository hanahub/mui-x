import * as React from 'react';
import PropTypes from 'prop-types';
import { LinePlot } from './LinePlot';
import { ChartContainer, ChartContainerProps } from '../ChartContainer';
import { Axis, AxisProps } from '../Axis/Axis';
import { LineSeriesType } from '../models/seriesType/line';
import { MakeOptional } from '../models/helpers';
import { DEFAULT_X_AXIS_KEY } from '../constants';
import { Tooltip, TooltipProps } from '../Tooltip';
import { Highlight, HighlightProps } from '../Highlight';

export interface LineChartProps extends Omit<ChartContainerProps, 'series'>, AxisProps {
  series: MakeOptional<LineSeriesType, 'type'>[];
  tooltip?: TooltipProps;
  highlight?: HighlightProps;
}
function LineChart(props: LineChartProps) {
  const {
    xAxis,
    yAxis,
    series,
    width,
    height,
    margin,
    colors,
    sx,
    tooltip,
    highlight,
    topAxis,
    leftAxis,
    rightAxis,
    bottomAxis,
    children,
  } = props;

  return (
    <ChartContainer
      series={series.map((s) => ({ type: 'line', ...s }))}
      width={width}
      height={height}
      margin={margin}
      xAxis={
        xAxis ?? [
          {
            id: DEFAULT_X_AXIS_KEY,
            scaleType: 'band',
            data: [...new Array(Math.max(...series.map((s) => s.data.length)))].map(
              (_, index) => index,
            ),
          },
        ]
      }
      yAxis={yAxis}
      colors={colors}
      sx={sx}
      disableAxisListener={
        tooltip?.trigger !== 'axis' && highlight?.x === 'none' && highlight?.y === 'none'
      }
    >
      <Axis topAxis={topAxis} leftAxis={leftAxis} rightAxis={rightAxis} bottomAxis={bottomAxis} />
      <LinePlot />
      <Highlight {...highlight} />
      <Tooltip {...tooltip} />
      {children}
    </ChartContainer>
  );
}

LineChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Indicate which axis to display the the bottom of the charts.
   * Can be a string (the id of the axis) or an object `XAxisProps`
   * @default xAxisIds[0] The id of the first provided axis
   */
  bottomAxis: PropTypes.oneOfType([
    PropTypes.shape({
      axisId: PropTypes.string.isRequired,
      classes: PropTypes.object,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      position: PropTypes.oneOf(['bottom', 'top']),
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickSize: PropTypes.number,
    }),
    PropTypes.string,
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  desc: PropTypes.string,
  disableAxisListener: PropTypes.bool,
  height: PropTypes.number.isRequired,
  highlight: PropTypes.shape({
    x: PropTypes.oneOf(['band', 'line', 'none']),
    y: PropTypes.oneOf(['line', 'none']),
  }),
  /**
   * Indicate which axis to display the the left of the charts.
   * Can be a string (the id of the axis) or an object `YAxisProps`
   * @default yAxisIds[0] The id of the first provided axis
   */
  leftAxis: PropTypes.oneOfType([
    PropTypes.shape({
      axisId: PropTypes.string.isRequired,
      classes: PropTypes.object,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      position: PropTypes.oneOf(['left', 'right']),
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickSize: PropTypes.number,
    }),
    PropTypes.string,
  ]),
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  /**
   * Indicate which axis to display the the right of the charts.
   * Can be a string (the id of the axis) or an object `YAxisProps`
   * @default null
   */
  rightAxis: PropTypes.oneOfType([
    PropTypes.shape({
      axisId: PropTypes.string.isRequired,
      classes: PropTypes.object,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      position: PropTypes.oneOf(['left', 'right']),
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickSize: PropTypes.number,
    }),
    PropTypes.string,
  ]),
  series: PropTypes.arrayOf(
    PropTypes.shape({
      area: PropTypes.bool,
      curve: PropTypes.oneOf([
        'catmullRom',
        'linear',
        'monotoneX',
        'monotoneY',
        'natural',
        'step',
        'stepAfter',
        'stepBefore',
      ]),
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      id: PropTypes.string,
      label: PropTypes.string,
      stack: PropTypes.string,
      type: PropTypes.oneOf(['line']),
      xAxisKey: PropTypes.string,
      yAxisKey: PropTypes.string,
    }),
  ).isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.string,
  tooltip: PropTypes.shape({
    axisContent: PropTypes.elementType,
    itemContent: PropTypes.elementType,
    trigger: PropTypes.oneOf(['axis', 'item', 'none']),
  }),
  /**
   * Indicate which axis to display the the top of the charts.
   * Can be a string (the id of the axis) or an object `XAxisProps`
   * @default null
   */
  topAxis: PropTypes.oneOfType([
    PropTypes.shape({
      axisId: PropTypes.string.isRequired,
      classes: PropTypes.object,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      position: PropTypes.oneOf(['bottom', 'top']),
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickSize: PropTypes.number,
    }),
    PropTypes.string,
  ]),
  viewBox: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  width: PropTypes.number.isRequired,
  xAxis: PropTypes.arrayOf(
    PropTypes.shape({
      axisId: PropTypes.string,
      classes: PropTypes.object,
      data: PropTypes.array,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      max: PropTypes.number,
      maxTicks: PropTypes.number,
      min: PropTypes.number,
      minTicks: PropTypes.number,
      position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
      scaleType: PropTypes.oneOf(['band', 'linear', 'log', 'pow', 'sqrt', 'time', 'utc']),
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickSize: PropTypes.number,
      tickSpacing: PropTypes.number,
      valueFormatter: PropTypes.func,
    }),
  ),
  yAxis: PropTypes.arrayOf(
    PropTypes.shape({
      axisId: PropTypes.string,
      classes: PropTypes.object,
      data: PropTypes.array,
      disableLine: PropTypes.bool,
      disableTicks: PropTypes.bool,
      fill: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      labelFontSize: PropTypes.number,
      max: PropTypes.number,
      maxTicks: PropTypes.number,
      min: PropTypes.number,
      minTicks: PropTypes.number,
      position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
      scaleType: PropTypes.oneOf(['band', 'linear', 'log', 'pow', 'sqrt', 'time', 'utc']),
      stroke: PropTypes.string,
      tickFontSize: PropTypes.number,
      tickSize: PropTypes.number,
      tickSpacing: PropTypes.number,
      valueFormatter: PropTypes.func,
    }),
  ),
} as any;

export { LineChart };
