import * as React from 'react';
import { GridVirtualScroller } from '../../_modules_/grid/components/virtualization/GridVirtualScroller';
import { GridVirtualScrollerContent } from '../../_modules_/grid/components/virtualization/GridVirtualScrollerContent';
import { GridVirtualScrollerRenderZone } from '../../_modules_/grid/components/virtualization/GridVirtualScrollerRenderZone';
import { useGridVirtualScroller } from '../../_modules_/grid/hooks/features/virtualization/useGridVirtualScroller';

interface DataGridVirtualScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  disableVirtualization?: boolean;
}

const DataGridVirtualScroller = React.forwardRef<HTMLDivElement, DataGridVirtualScrollerProps>(
  function DataGridVirtualScroller(props, ref) {
    const { className, disableVirtualization, ...other } = props;

    const { getRootProps, getContentProps, getRenderZoneProps, getRows } = useGridVirtualScroller({
      ref,
      disableVirtualization,
    });

    return (
      <GridVirtualScroller className={className} {...getRootProps(other)}>
        <GridVirtualScrollerContent {...getContentProps()}>
          <GridVirtualScrollerRenderZone {...getRenderZoneProps()}>
            {getRows()}
          </GridVirtualScrollerRenderZone>
        </GridVirtualScrollerContent>
      </GridVirtualScroller>
    );
  },
);

export { DataGridVirtualScroller };
