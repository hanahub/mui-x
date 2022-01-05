import * as React from 'react';
import { GridApiRef } from '../../../models/api/gridApiRef';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { GridPreferencePanelsValue } from './gridPreferencePanelsValue';
import { useGridStateInit } from '../../utils/useGridStateInit';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';

export const useGridPreferencesPanel = (
  apiRef: GridApiRef,
  props: Pick<DataGridProcessedProps, 'initialState'>,
): void => {
  const logger = useGridLogger(apiRef, 'useGridPreferencesPanel');

  useGridStateInit(apiRef, (state) => ({
    ...state,
    preferencePanel: props.initialState?.preferencePanel ?? { open: false },
  }));
  const hideTimeout = React.useRef<any>();
  const immediateTimeout = React.useRef<any>();

  const hidePreferences = React.useCallback(() => {
    logger.debug('Hiding Preferences Panel');
    apiRef.current.setState((state) => ({ ...state, preferencePanel: { open: false } }));
    apiRef.current.forceUpdate();
  }, [apiRef, logger]);

  // This is to prevent the preferences from closing when you open a select box or another panel,
  // The issue is in MUI core V4 => Fixed in V5
  const doNotHidePanel = React.useCallback(() => {
    immediateTimeout.current = setTimeout(() => clearTimeout(hideTimeout.current), 0);
  }, []);

  // This is a hack for the issue with Core V4, by delaying hiding the panel on the clickAwayListener,
  // we can cancel the action if the trigger element still need the panel...
  const hidePreferencesDelayed = React.useCallback(() => {
    hideTimeout.current = setTimeout(hidePreferences, 100);
  }, [hidePreferences]);

  const showPreferences = React.useCallback(
    (newValue: GridPreferencePanelsValue) => {
      logger.debug('Opening Preferences Panel');
      doNotHidePanel();
      apiRef.current.setState((state) => ({
        ...state,
        preferencePanel: { ...state.preferencePanel, open: true, openedPanelValue: newValue },
      }));
      apiRef.current.forceUpdate();
    },
    [doNotHidePanel, apiRef, logger],
  );

  useGridApiMethod(
    apiRef,
    {
      showPreferences,
      hidePreferences: hidePreferencesDelayed,
    },
    'ColumnMenuApi',
  );

  React.useEffect(() => {
    return () => {
      clearTimeout(hideTimeout.current);
      clearTimeout(immediateTimeout.current);
    };
  }, []);
};
