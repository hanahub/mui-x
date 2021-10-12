/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { GridEvents } from '../constants/eventsConstants';
import { GridRowId } from '../models/gridRows';
import { GridEditModes, GridRowModes } from '../models/gridEditRowModel';
import { gridDensityRowHeightSelector } from '../hooks/features/density';
import { useGridApiContext } from '../hooks/root/useGridApiContext';
import { useGridSelector } from '../hooks/features/core/useGridSelector';
import { composeClasses } from '../utils/material-ui-utils';
import { getDataGridUtilityClass } from '../gridClasses';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';
import { GridComponentProps } from '../GridComponentProps';

export interface GridRowProps {
  id: GridRowId;
  selected: boolean;
  rowIndex: number;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

type OwnerState = GridRowProps & {
  editable: boolean;
  editing: boolean;
  classes?: GridComponentProps['classes'];
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { editable, editing, selected, classes } = ownerState;

  const slots = {
    root: ['row', selected && 'selected', editable && 'row--editable', editing && 'row--editing'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

function GridRow(props: GridRowProps) {
  const { selected, id, rowIndex, children, onClick, onDoubleClick, ...other } = props;
  const ariaRowIndex = rowIndex + 2; // 1 for the header row and 1 as it's 1 based
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const rowHeight = useGridSelector(apiRef, gridDensityRowHeightSelector);

  const ownerState = {
    ...props,
    classes: rootProps.classes,
    editing: apiRef.current.getRowMode(id) === GridRowModes.Edit,
    editable: rootProps.editMode === GridEditModes.Row,
  };

  const classes = useUtilityClasses(ownerState);

  const publish = React.useCallback(
    (eventName: string, propHandler: any) => (event: React.MouseEvent) => {
      // Ignore portal
      // The target is not an element when triggered by a Select inside the cell
      // See https://github.com/mui-org/material-ui/issues/10534
      if (
        (event.target as any).nodeType === 1 &&
        !event.currentTarget.contains(event.target as Element)
      ) {
        return;
      }

      // The row might have been deleted
      if (!apiRef.current.getRow(id)) {
        return;
      }

      apiRef.current.publishEvent(eventName, apiRef.current.getRowParams(id), event);

      if (propHandler) {
        propHandler(event);
      }
    },
    [apiRef, id],
  );

  const style = {
    maxHeight: rowHeight,
    minHeight: rowHeight,
  };

  const rowClassName =
    typeof rootProps.getRowClassName === 'function' &&
    rootProps.getRowClassName(apiRef.current.getRowParams(id));

  return (
    <div
      key={id}
      data-id={id}
      data-rowindex={rowIndex}
      role="row"
      className={clsx(rowClassName, classes.root)}
      aria-rowindex={ariaRowIndex}
      aria-selected={selected}
      style={style}
      onClick={publish(GridEvents.rowClick, onClick)}
      onDoubleClick={publish(GridEvents.rowDoubleClick, onDoubleClick)}
      {...other}
    >
      {children}
    </div>
  );
}

GridRow.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
} as any;

export { GridRow };
