import * as React from 'react';
import { DEFAULT_X_AXIS_KEY } from '../constants';
import { CartesianContext } from '../context/CartesianContextProvider';
import { DrawingContext } from '../context/DrawingProvider';
import useTicks from '../hooks/useTicks';

export interface XAxisProps {
  /**
   * Position of the axis.
   */
  position?: 'top' | 'bottom';
  /**
   * Id of the axis to render.
   */
  axisId?: string;
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine?: boolean;
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks?: boolean;
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill?: string;
  /**
   * The font size of the axis text.
   * @default 12
   */
  fontSize?: number;
  /**
   * The label of the axis.
   */
  label?: string;
  /**
   * The font size of the axis label.
   * @default 14
   */
  labelFontSize?: number;
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke?: string;
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize?: number;
}

export function XAxis(props: XAxisProps) {
  const {
    position = 'bottom',
    axisId = DEFAULT_X_AXIS_KEY,
    disableLine = false,
    disableTicks = false,
    fill = 'currentColor',
    fontSize = 10,
    label,
    labelFontSize = 14,
    stroke = 'currentColor',
    tickSize: tickSizeProp = 6,
  } = props;
  const {
    xAxis: {
      [axisId]: { scale: xScale },
    },
  } = React.useContext(CartesianContext) as any;

  const { left, top, width, height } = React.useContext(DrawingContext);

  const tickSize = disableTicks ? 4 : tickSizeProp;

  const xTicks = useTicks({ scale: xScale });

  const positionSigne = position === 'bottom' ? 1 : -1;

  return (
    <g transform={`translate(0, ${position === 'bottom' ? top + height : top})`}>
      {!disableLine && (
        <line
          x1={xScale.range()[0]}
          x2={xScale.range()[1]}
          stroke={stroke}
          shapeRendering="crispEdges"
        />
      )}
      {xTicks.map(({ value, offset }, index) => (
        <g key={index} transform={`translate(${offset}, 0)`}>
          {!disableTicks && (
            <line y2={positionSigne * tickSize} stroke={stroke} shapeRendering="crispEdges" />
          )}
          <text
            fill={fill}
            transform={`translate(0, ${positionSigne * (fontSize + tickSize + 2)})`}
            textAnchor="middle"
            fontSize={fontSize}
          >
            {value}
          </text>
        </g>
      ))}
      {label && (
        <text
          fill={fill}
          transform={`translate(${left + width / 2}, ${
            positionSigne * (fontSize + tickSize + 20)
          })`}
          fontSize={labelFontSize}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
}
