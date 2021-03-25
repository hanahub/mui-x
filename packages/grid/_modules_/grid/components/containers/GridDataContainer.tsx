import * as React from 'react';
import { GRID_DATA_CONTAINER_CSS_CLASS } from '../../constants/cssClassesConstants';
import { useGridState } from '../../hooks/features/core/useGridState';
import { classnames } from '../../utils';
import { GridApiContext } from '../GridApiContext';

type GridDataContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function GridDataContainer(props: GridDataContainerProps) {
  const { className, ...other } = props;
  const apiRef = React.useContext(GridApiContext);
  const [gridState] = useGridState(apiRef!);

  const style: any = {
    minWidth: gridState.containerSizes?.dataContainerSizes?.width,
  };

  if (gridState.scrollBar.hasScrollY) {
    style.minHeight = gridState.containerSizes?.dataContainerSizes?.height!;
  }

  return (
    <div
      className={classnames('MuiDataGrid-dataContainer', GRID_DATA_CONTAINER_CSS_CLASS, className)}
      style={style}
      {...other}
    />
  );
}
