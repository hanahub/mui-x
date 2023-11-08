import { styled, SxProps, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useAxisEvents } from './hooks/useAxisEvents';

type ViewBox = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};
export interface ChartsSurfaceProps {
  /**
   * The width of the chart in px.
   */
  width: number;
  /**
   * The height of the chart in px.
   */
  height: number;
  viewBox?: ViewBox;
  className?: string;
  title?: string;
  desc?: string;
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener?: boolean;
}

const ChartChartsSurfaceStyles = styled('svg', {
  name: 'MuiChartsSurface',
  slot: 'Root',
})(() => ({}));

export const ChartsSurface = React.forwardRef<SVGSVGElement, ChartsSurfaceProps>(
  function ChartsSurface(props: ChartsSurfaceProps, ref) {
    const {
      children,
      width,
      height,
      viewBox,
      disableAxisListener = false,
      className,
      ...other
    } = props;
    const svgView = { width, height, x: 0, y: 0, ...viewBox };

    useAxisEvents(disableAxisListener);

    return (
      <ChartChartsSurfaceStyles
        width={width}
        height={height}
        viewBox={`${svgView.x} ${svgView.y} ${svgView.width} ${svgView.height}`}
        ref={ref}
        {...other}
      >
        <title>{props.title}</title>
        <desc>{props.desc}</desc>
        {children}
      </ChartChartsSurfaceStyles>
    );
  },
);
