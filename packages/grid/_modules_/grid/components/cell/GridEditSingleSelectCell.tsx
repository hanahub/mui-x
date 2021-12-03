import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  GridRenderEditCellParams,
  GridValueFormatterParams,
} from '../../models/params/gridCellParams';
import { isEscapeKey } from '../../utils/keyboardUtils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { GridEditModes } from '../../models/gridEditRowModel';
import { GridEvents } from '../../models/events/gridEvents';

const renderSingleSelectOptions = (option) =>
  typeof option === 'object' ? (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ) : (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  );

function GridEditSingleSelectCell(props: GridRenderEditCellParams & Omit<SelectProps, 'id'>) {
  const {
    id,
    value,
    formattedValue,
    api,
    field,
    row,
    rowNode,
    colDef,
    cellMode,
    isEditable,
    tabIndex,
    className,
    getValue,
    hasFocus,
    error,
    ...other
  } = props;

  const ref = React.useRef<any>();
  const inputRef = React.useRef<any>();
  const rootProps = useGridRootProps();
  const [open, setOpen] = React.useState(rootProps.editMode === 'cell');

  let valueOptionsFormatted;
  if (typeof colDef.valueOptions === 'function') {
    valueOptionsFormatted = colDef.valueOptions({ id, row, field });
  } else {
    valueOptionsFormatted = colDef.valueOptions;
  }

  if (colDef.valueFormatter) {
    valueOptionsFormatted = valueOptionsFormatted.map((option) => {
      if (typeof option === 'object') {
        return option;
      }

      const params: GridValueFormatterParams = { field, api, value: option };
      return {
        value: option,
        label: String(colDef.valueFormatter(params)),
      };
    });
  }

  const handleChange = async (event) => {
    setOpen(false);
    api.setEditCellValue({ id, field, value: event.target.value }, event);

    if (rootProps.editMode === GridEditModes.Row) {
      return;
    }

    const isValid = await Promise.resolve(api.commitCellChange({ id, field }, event));
    if (isValid) {
      api.setCellMode(id, field, 'view');

      if (event.key) {
        // TODO v6: remove once we stop ignoring events fired from portals
        const params = api.getCellParams(id, field);
        api.publishEvent(GridEvents.cellNavigationKeyDown, params, event);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (rootProps.editMode === GridEditModes.Row) {
      setOpen(false);
      return;
    }
    if (reason === 'backdropClick' || isEscapeKey(event.key)) {
      api.setCellMode(id, field, 'view');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current.focus();
    }
  }, [hasFocus]);

  return (
    <Select
      ref={ref}
      inputRef={inputRef}
      value={value}
      onChange={handleChange}
      open={open}
      onOpen={handleOpen}
      MenuProps={{
        onClose: handleClose,
      }}
      error={error}
      fullWidth
      {...other}
    >
      {valueOptionsFormatted.map(renderSingleSelectOptions)}
    </Select>
  );
}

GridEditSingleSelectCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * GridApi that let you manipulate the grid.
   */
  api: PropTypes.object.isRequired,
} as any;

export { GridEditSingleSelectCell };
export const renderEditSingleSelectCell = (params) => <GridEditSingleSelectCell {...params} />;
