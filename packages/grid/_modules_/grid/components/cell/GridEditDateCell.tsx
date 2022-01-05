import * as React from 'react';
import { unstable_composeClasses as composeClasses } from '@mui/material';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
import { getDataGridUtilityClass } from '../../gridClasses';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';

type OwnerState = { classes: DataGridProcessedProps['classes'] };

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['editInputCell'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export function GridEditDateCell(props: GridRenderEditCellParams & Omit<InputBaseProps, 'id'>) {
  const {
    id,
    value: valueProp,
    formattedValue,
    api,
    field,
    row,
    rowNode,
    colDef,
    cellMode,
    isEditable,
    tabIndex,
    hasFocus,
    getValue,
    inputProps,
    ...other
  } = props;

  const isDateTime = colDef.type === 'dateTime';
  const inputRef = React.useRef<HTMLInputElement>();

  const valueTransformed = React.useMemo(() => {
    let parsedDate: Date | null;

    if (valueProp == null) {
      parsedDate = null;
    } else if (valueProp instanceof Date) {
      parsedDate = valueProp;
    } else {
      parsedDate = new Date((valueProp ?? '').toString());
    }

    let formattedDate: string;
    if (parsedDate == null || Number.isNaN(parsedDate.getTime())) {
      formattedDate = '';
    } else {
      const localDate = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60 * 1000);
      formattedDate = localDate.toISOString().substr(0, isDateTime ? 16 : 10);
    }

    return {
      parsed: parsedDate,
      formatted: formattedDate,
    };
  }, [valueProp, isDateTime]);

  const [valueState, setValueState] = React.useState(valueTransformed);
  const rootProps = useGridRootProps();
  const ownerState = { classes: rootProps.classes };
  const classes = useUtilityClasses(ownerState);

  const handleChange = React.useCallback(
    (event) => {
      const newFormattedDate = event.target.value;
      let newParsedDate: Date | null;

      if (newFormattedDate === '') {
        newParsedDate = null;
      } else {
        const [date, time] = newFormattedDate.split('T');
        const [year, month, day] = date.split('-');
        newParsedDate = new Date();
        newParsedDate.setFullYear(year, Number(month) - 1, day);
        newParsedDate.setHours(0, 0, 0, 0);
        if (time) {
          const [hours, minutes] = time.split(':');
          newParsedDate.setHours(Number(hours), Number(minutes), 0, 0);
        }
      }

      setValueState({ parsed: newParsedDate, formatted: newFormattedDate });
      api.setEditCellValue({ id, field, value: newParsedDate }, event);
    },
    [api, field, id],
  );

  React.useEffect(() => {
    setValueState((state) => {
      if (
        valueTransformed.parsed !== state.parsed &&
        valueTransformed.parsed?.getTime() !== state.parsed?.getTime()
      ) {
        return valueTransformed;
      }
      return state;
    });
  }, [valueTransformed]);

  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current!.focus();
    }
  }, [hasFocus]);

  return (
    <InputBase
      inputRef={inputRef}
      fullWidth
      className={classes.root}
      type={isDateTime ? 'datetime-local' : 'date'}
      inputProps={{
        max: isDateTime ? '9999-12-31T23:59' : '9999-12-31',
        ...inputProps,
      }}
      value={valueState.formatted}
      onChange={handleChange}
      {...other}
    />
  );
}
export const renderEditDateCell = (params) => <GridEditDateCell {...params} />;
