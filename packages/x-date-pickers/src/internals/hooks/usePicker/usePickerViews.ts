import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useEventCallback from '@mui/utils/useEventCallback';
import { DateOrTimeView } from '../../models';
import { useViews } from '../useViews';
import { WrapperVariant } from '../../components/wrappers/WrapperVariantContext';
import type { UsePickerValueViewsResponse } from './usePickerValue';
import { useFocusManagement } from '../../components/CalendarOrClockPicker/useFocusManagement';

type PickerViewRenderer<
  TValue,
  TView extends DateOrTimeView,
  TExternalProps extends UsePickerViewsProps<TView>,
  TAdditionalProps extends {},
> = (
  props: PickerViewsRendererProps<TValue, TView, TExternalProps, TAdditionalProps>,
) => React.ReactNode;

export type PickerViewRendererLookup<
  TValue,
  TView extends DateOrTimeView,
  TExternalProps extends UsePickerViewsProps<TView>,
  TAdditionalProps extends {},
> = {
  [K in TView]: PickerViewRenderer<TValue, TView, TExternalProps, TAdditionalProps> | null;
};

/**
 * Props used to handle the views that are common to all pickers.
 */
export interface UsePickerViewsBaseProps<TView extends DateOrTimeView> {
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * First view to show.
   */
  openTo: TView;
  /**
   * Callback fired on view change.
   * @template View
   * @param {View} view The new view.
   */
  onViewChange?: (view: TView) => void;
  /**
   * Array of views to show.
   */
  views: readonly TView[];
}

/**
 * Props used to handle the views of the pickers.
 */
export interface UsePickerViewsNonStaticProps {
  /**
   * Do not render open picker button (renders only the field).
   * @default false
   */
  disableOpenPicker?: boolean;
}

/**
 * Props used to handle the value of the pickers.
 */
export interface UsePickerViewsProps<TView extends DateOrTimeView>
  extends UsePickerViewsBaseProps<TView>,
    UsePickerViewsNonStaticProps {}

export interface UsePickerViewParams<
  TValue,
  TView extends DateOrTimeView,
  TExternalProps extends UsePickerViewsProps<TView>,
  TAdditionalProps extends {},
> {
  props: TExternalProps;
  propsFromPickerValue: UsePickerValueViewsResponse<TValue>;
  /**
   * Define the view renderer for each section.
   * If no component is defined, then the view will be editing with the field.
   */
  viewLookup: PickerViewRendererLookup<TValue, TView, TExternalProps, TAdditionalProps>;
  additionalViewProps: TAdditionalProps;
  inputRef?: React.RefObject<HTMLInputElement>;
  wrapperVariant: WrapperVariant;
  autoFocusView: boolean;
}

export interface UsePickerViewsResponse<TView extends DateOrTimeView> {
  /**
   * Does the picker have at least one view that should be rendered in UI mode ?
   * If not, we can hide the icon to open the picker.
   */
  hasUIView: boolean;
  renderCurrentView: () => React.ReactNode;
  shouldRestoreFocus: () => boolean;
  layoutProps: UsePickerViewsLayoutResponse<TView>;
}

export type PickerViewsRendererProps<
  TValue,
  TView extends DateOrTimeView,
  TExternalProps extends UsePickerViewsProps<TView>,
  TAdditionalProps extends {},
> = TExternalProps &
  TAdditionalProps &
  UsePickerValueViewsResponse<TValue> & {
    view: TView;
    views: readonly TView[];
    wrapperVariant: WrapperVariant;
    focusedView: TView | null;
    onFocusedViewChange?: (view: TView) => (newHasFocus: boolean) => void;
  };

export interface UsePickerViewsLayoutResponse<TView extends DateOrTimeView> {
  view: TView | null;
  onViewChange: (view: TView) => void;
  views: readonly TView[];
}

let warnedOnceNotValidOpenTo = false;

/**
 * Manage the views of all the pickers:
 * - Handles the view switch
 * - Handles the switch between UI views and field views
 * - Handles the focus management when switching views
 */
export const usePickerViews = <
  TValue,
  TView extends DateOrTimeView,
  TExternalProps extends UsePickerViewsProps<TView>,
  TAdditionalProps extends {},
>({
  props,
  propsFromPickerValue,
  viewLookup,
  additionalViewProps,
  inputRef,
  wrapperVariant,
  autoFocusView,
}: UsePickerViewParams<
  TValue,
  TView,
  TExternalProps,
  TAdditionalProps
>): UsePickerViewsResponse<TView> => {
  const { onChange, open, onSelectedSectionsChange, onClose } = propsFromPickerValue;
  const { views, openTo, onViewChange, disableOpenPicker } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnceNotValidOpenTo && !views.includes(openTo)) {
      console.warn(
        `MUI: \`openTo="${openTo}"\` is not a valid prop.`,
        `It must be an element of \`views=["${views.join('", "')}"]\`.`,
      );
      warnedOnceNotValidOpenTo = true;
    }
  }

  const { openView, setOpenView, handleChangeAndOpenNext } = useViews({
    view: undefined,
    views,
    openTo,
    onChange,
    onViewChange,
  });

  // TODO v6: Move `useFocusManagement` here
  const { focusedView, setFocusedView } = useFocusManagement<TView>({
    autoFocus: autoFocusView,
    openView,
  });

  const { hasUIView, viewModeLookup } = React.useMemo(
    () =>
      views.reduce(
        (acc, view) => {
          let viewMode: 'field' | 'UI';
          if (disableOpenPicker) {
            viewMode = 'field';
          } else if (viewLookup[view] != null) {
            viewMode = 'UI';
          } else {
            viewMode = 'field';
          }

          acc.viewModeLookup[view] = viewMode;
          if (viewMode === 'UI') {
            acc.hasUIView = true;
          }

          return acc;
        },
        { hasUIView: false, viewModeLookup: {} as Record<TView, 'field' | 'UI'> },
      ),
    [disableOpenPicker, viewLookup, views],
  );

  const currentViewMode = viewModeLookup[openView];
  const shouldRestoreFocus = useEventCallback(() => currentViewMode === 'UI');

  const [popperView, setPopperView] = React.useState<TView | null>(
    currentViewMode === 'UI' ? openView : null,
  );
  if (popperView !== openView && viewModeLookup[openView] === 'UI') {
    setPopperView(openView);
  }

  useEnhancedEffect(() => {
    if (currentViewMode === 'field' && open) {
      onClose();
      onSelectedSectionsChange('hours');

      setTimeout(() => {
        inputRef?.current!.focus();
      });
    }
  }, [openView]); // eslint-disable-line react-hooks/exhaustive-deps

  useEnhancedEffect(() => {
    if (!open) {
      return;
    }

    if (currentViewMode === 'field' && popperView != null) {
      setOpenView(popperView);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const layoutProps: UsePickerViewsLayoutResponse<TView> = {
    views,
    view: popperView,
    onViewChange: setOpenView,
  };

  return {
    hasUIView,
    shouldRestoreFocus,
    layoutProps,
    renderCurrentView: () => {
      if (popperView == null) {
        return null;
      }

      const renderer = viewLookup?.[popperView];
      if (renderer == null) {
        return null;
      }

      return renderer({
        ...props,
        ...additionalViewProps,
        ...propsFromPickerValue,
        wrapperVariant,
        views,
        onChange: handleChangeAndOpenNext,
        view: popperView,
        onViewChange: setOpenView,
        focusedView,
        onFocusedViewChange: setFocusedView,
      });
    },
  };
};
