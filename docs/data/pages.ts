import type { MuiPage } from '@mui/monorepo/docs/src/MuiPage';

const pages: MuiPage[] = [
  {
    pathname: '/x/introduction',
    scopePathnames: ['/x/introduction'],
    icon: 'DescriptionIcon',
    children: [
      { pathname: `/x/introduction`, title: 'Overview' },
      { pathname: `/x/introduction/installation` },
      { pathname: `/x/introduction/licensing` },
      { pathname: `/x/introduction/support` },
      { pathname: `/x/introduction/roadmap` },
    ],
  },
  {
    pathname: '/x/react-data-grid',
    scopePathnames: ['/x/api/data-grid'],
    title: 'Data Grid',
    icon: 'TableViewIcon',
    children: [
      { pathname: '/x/react-data-grid', title: 'Overview' },
      { pathname: '/x/react-data-grid/demo' },
      { pathname: '/x/react-data-grid/getting-started' },
      { pathname: '/x/react-data-grid/layout' },
      {
        pathname: '/x/react-data-grid/columns',
        scopePathnames: ['/x/react-data-grid/column-'],
        children: [
          { pathname: '/x/react-data-grid/column-definition' },
          { pathname: '/x/react-data-grid/column-dimensions' },
          { pathname: '/x/react-data-grid/column-visibility' },
          { pathname: '/x/react-data-grid/column-header' },
          { pathname: '/x/react-data-grid/column-ordering', plan: 'pro' },
          { pathname: '/x/react-data-grid/column-pinning', plan: 'pro' },
          { pathname: '/x/react-data-grid/column-spanning' },
          { pathname: '/x/react-data-grid/column-groups' },
        ],
      },
      {
        pathname: '/x/react-data-grid/rows',
        scopePathnames: ['/x/react-data-grid/row-', '/x/react-data-grid/master-detail'],
        children: [
          { pathname: '/x/react-data-grid/row-definition' },
          { pathname: '/x/react-data-grid/row-updates' },
          { pathname: '/x/react-data-grid/row-height' },
          { pathname: '/x/react-data-grid/master-detail', plan: 'pro' },
          { pathname: '/x/react-data-grid/row-ordering', plan: 'pro' },
          { pathname: '/x/react-data-grid/row-pinning', plan: 'pro' },
          { pathname: '/x/react-data-grid/row-spanning', title: 'Row spanning 🚧' },
        ],
      },
      { pathname: '/x/react-data-grid/editing' },
      { pathname: '/x/react-data-grid/sorting' },
      { pathname: '/x/react-data-grid/filtering' },
      { pathname: '/x/react-data-grid/pagination' },
      { pathname: '/x/react-data-grid/selection' },
      { pathname: '/x/react-data-grid/export' },
      { pathname: '/x/react-data-grid/components' },
      { pathname: '/x/react-data-grid/style' },
      { pathname: '/x/react-data-grid/localization' },
      { pathname: '/x/react-data-grid/scrolling' },
      { pathname: '/x/react-data-grid/virtualization' },
      { pathname: '/x/react-data-grid/accessibility' },
      {
        pathname: '/x/react-data-grid/row-grouping',
        title: 'Group & Pivot',
        scopePathnames: [
          '/x/react-data-grid/row-grouping',
          '/x/react-data-grid/tree-data',
          '/x/react-data-grid/aggregation',
          '/x/react-data-grid/pivoting',
        ],
        children: [
          { pathname: '/x/react-data-grid/row-grouping', plan: 'premium' },
          { pathname: '/x/react-data-grid/tree-data', plan: 'pro' },
          { pathname: '/x/react-data-grid/aggregation', title: 'Aggregation', plan: 'premium' },
          { pathname: '/x/react-data-grid/pivoting', title: 'Pivoting 🚧', plan: 'premium' },
        ],
      },
      {
        title: 'Advanced',
        pathname: '/x/react-data-grid/api-object',
        scopePathnames: [
          '/x/react-data-grid/api-object',
          '/x/react-data-grid/events',
          '/x/react-data-grid/state',
        ],
        children: [
          { pathname: '/x/react-data-grid/api-object', title: 'API object' },
          { pathname: '/x/react-data-grid/events' },
          { pathname: '/x/react-data-grid/state' },
        ],
      },
      {
        title: 'Recipes',
        pathname: '/x/react-data-grid/recipes',
        scopePathnames: ['/x/react-data-grid/recipes-'],
        children: [
          { pathname: '/x/react-data-grid/recipes-editing', title: 'Editing' },
          { pathname: '/x/react-data-grid/recipes-row-grouping', title: 'Row grouping' },
        ],
      },
      {
        pathname: '/x/api/data-grid',
        title: 'API Reference',
        children: [
          { pathname: '/x/api/data-grid', title: 'Index' },
          { pathname: '/x/api/data-grid/data-grid', title: 'DataGrid' },
          { pathname: '/x/api/data-grid/data-grid-pro', title: 'DataGridPro' },
          { pathname: '/x/api/data-grid/data-grid-premium', title: 'DataGridPremium' },
          { pathname: '/x/api/data-grid/grid-api', title: 'GridApi' },
          { pathname: '/x/api/data-grid/grid-cell-params', title: 'GridCellParams' },
          { pathname: '/x/api/data-grid/grid-col-def', title: 'GridColDef' },
          { pathname: '/x/api/data-grid/grid-export-state-params', title: 'GridExportStateParams' },
          { pathname: '/x/api/data-grid/grid-filter-form', title: 'GridFilterForm' },
          { pathname: '/x/api/data-grid/grid-filter-item', title: 'GridFilterItem' },
          { pathname: '/x/api/data-grid/grid-filter-model', title: 'GridFilterModel' },
          { pathname: '/x/api/data-grid/grid-filter-operator', title: 'GridFilterOperator' },
          { pathname: '/x/api/data-grid/grid-filter-panel', title: 'GridFilterPanel' },
          {
            pathname: '/x/api/data-grid/grid-row-class-name-params',
            title: 'GridRowClassNameParams',
          },
          { pathname: '/x/api/data-grid/grid-row-params', title: 'GridRowParams' },
          { pathname: '/x/api/data-grid/grid-row-spacing-params', title: 'GridRowSpacingParams' },
          {
            pathname: '/x/api/data-grid/grid-aggregation-function',
            title: 'GridAggregationFunction',
          },
          { pathname: '/x/api/data-grid/grid-csv-export-options', title: 'GridCsvExportOptions' },
          {
            pathname: '/x/api/data-grid/grid-print-export-options',
            title: 'GridPrintExportOptions',
          },
          {
            pathname: '/x/api/data-grid/grid-excel-export-options',
            title: 'GridExcelExportOptions',
          },
        ],
      },
    ],
  },
  {
    pathname: '/x/react-date-pickers',
    scopePathnames: ['/x/api/date-pickers'],
    title: 'Date and Time Pickers',
    icon: 'DatePickerIcon',
    children: [
      { pathname: '/x/react-date-pickers/getting-started' },
      {
        pathname: '/x/react-date-pickers/date-picker',
        title: 'Date components',
        scopePathnames: [
          '/x/react-date-pickers/date-picker',
          '/x/react-date-pickers/date-field',
          '/x/react-date-pickers/legacy-date-picker',
        ],
        children: [
          { pathname: '/x/react-date-pickers/date-picker', title: 'Date Picker', newFeature: true },
          { pathname: '/x/react-date-pickers/date-field', title: 'Date Field', newFeature: true },
          { pathname: '/x/react-date-pickers/legacy-date-picker', title: 'Legacy Date Picker' },
        ],
      },
      {
        pathname: '/x/react-date-pickers/time-picker',
        title: 'Time components',
        scopePathnames: [
          '/x/react-date-pickers/time-picker',
          '/x/react-date-pickers/time-field',
          '/x/react-date-pickers/legacy-time-picker',
        ],
        children: [
          { pathname: '/x/react-date-pickers/time-picker', title: 'Time Picker' },
          { pathname: '/x/react-date-pickers/time-field', title: 'Time Field', newFeature: true },
          { pathname: '/x/react-date-pickers/legacy-time-picker', title: 'Legacy Time Picker' },
        ],
      },
      {
        pathname: '/x/react-date-pickers/date-time-picker',
        title: 'Date Time components',
        scopePathnames: [
          '/x/react-date-pickers/date-time-picker',
          '/x/react-date-pickers/date-time-field',
          '/x/react-date-pickers/legacy-date-time-picker',
        ],
        children: [
          { pathname: '/x/react-date-pickers/date-time-picker', title: 'Date Time Picker' },
          {
            pathname: '/x/react-date-pickers/date-time-field',
            title: 'Date Time Field',
            newFeature: true,
          },
          {
            pathname: '/x/react-date-pickers/legacy-date-time-picker',
            title: 'Legacy Date Time Picker',
          },
        ],
      },
      {
        pathname: '/x/react-date-pickers/date-range-picker',
        title: 'Date Range components',
        plan: 'pro',
        scopePathnames: [
          '/x/react-date-pickers/date-range-picker',
          '/x/react-date-pickers/date-range-field',
          '/x/react-date-pickers/legacy-date-range-picker',
        ],
        children: [
          { pathname: '/x/react-date-pickers/date-range-picker', title: 'Date Range Picker' },
          {
            pathname: '/x/react-date-pickers/date-range-field',
            title: 'Date Range Field',
            newFeature: true,
          },
          {
            pathname: '/x/react-date-pickers/legacy-date-range-picker',
            title: 'Legacy Date Range Picker',
          },
        ],
      },
      {
        pathname: '/x/react-date-pickers/time-range-picker',
        title: 'Time Range components',
        plan: 'pro',
        scopePathnames: [
          '/x/react-date-pickers/time-range-picker',
          '/x/react-date-pickers/time-range-field',
        ],
        children: [
          { pathname: '/x/react-date-pickers/time-range-picker', title: 'Time Range Picker 🚧' },
          {
            pathname: '/x/react-date-pickers/time-range-field',
            title: 'Time Range Field',
            newFeature: true,
          },
        ],
      },
      {
        pathname: '/x/react-date-pickers/date-time-range-picker',
        title: 'Date Time Range components',
        plan: 'pro',
        scopePathnames: [
          '/x/react-date-pickers/date-time-range-picker',
          '/x/react-date-pickers/date-time-range-field',
        ],
        children: [
          {
            pathname: '/x/react-date-pickers/date-time-range-picker',
            title: 'Date Time Range Picker 🚧',
          },
          {
            pathname: '/x/react-date-pickers/date-time-range-field',
            title: 'Date Time Range Field',
            newFeature: true,
          },
        ],
      },
      { pathname: '/x/react-date-pickers/validation' },
      {
        pathname: '/x/react-date-pickers/localization',
        title: 'Localization',
        scopePathnames: [
          '/x/react-date-pickers/adapters-locale',
          '/x/react-date-pickers/localization',
          '/x/react-date-pickers/calendar-systems',
        ],
        children: [
          {
            pathname: '/x/react-date-pickers/adapters-locale',
            title: 'Date localization',
          },
          {
            pathname: '/x/react-date-pickers/localization',
            title: 'Component localization',
          },
          { pathname: '/x/react-date-pickers/calendar-systems' },
        ],
      },
      { pathname: '/x/react-date-pickers/fields', title: 'Field components', newFeature: true },
      { pathname: '/x/react-date-pickers/custom-components', title: 'Custom sub-components' },
      {
        pathname: '/x/api/date-pickers',
        title: 'API Reference',
        children: [
          { pathname: '/x/api/date-pickers/date-calendar', title: 'DateCalendar' },
          { pathname: '/x/api/date-pickers/date-field', title: 'DateField' },
          { pathname: '/x/api/date-pickers/date-picker', title: 'DatePicker' },
          {
            pathname: '/x/api/date-pickers/date-range-calendar',
            title: 'DateRangeCalendar',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/date-range-picker-day',
            title: 'DateRangePickerDay',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/date-range-picker',
            title: 'DateRangePicker',
            plan: 'pro',
          },
          { pathname: '/x/api/date-pickers/date-time-field', title: 'DateTimeField' },
          {
            pathname: '/x/api/date-pickers/static-date-time-picker-tabs',
            title: 'DateTimePickerTabs',
          },
          { pathname: '/x/api/date-pickers/date-time-picker', title: 'DateTimePicker' },
          { pathname: '/x/api/date-pickers/day-calendar-skeleton', title: 'DayCalendarSkeleton' },
          { pathname: '/x/api/date-pickers/desktop-date-picker', title: 'DesktopDatePicker' },
          {
            pathname: '/x/api/date-pickers/desktop-date-range-picker',
            title: 'DesktopDateRangePicker',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/desktop-date-time-picker',
            title: 'DesktopDateTimePicker',
          },
          {
            pathname: '/x/api/date-pickers/desktop-next-date-picker',
            title: 'DesktopNextDatePicker',
          },
          {
            pathname: '/x/api/date-pickers/desktop-next-date-range-picker',
            title: 'DesktopNextDateRangePicker',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/desktop-next-date-time-picker',
            title: 'DesktopNextDateTimePicker',
          },
          {
            pathname: '/x/api/date-pickers/desktop-next-time-picker',
            title: 'DesktopNextTimePicker',
          },
          { pathname: '/x/api/date-pickers/desktop-time-picker', title: 'DesktopTimePicker' },
          { pathname: '/x/api/date-pickers/localization-provider', title: 'LocalizationProvider' },
          { pathname: '/x/api/date-pickers/mobile-date-picker', title: 'MobileDatePicker' },
          {
            pathname: '/x/api/date-pickers/mobile-date-range-picker',
            title: 'MobileDateRangePicker',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/mobile-date-time-picker',
            title: 'MobileDateTimePicker',
          },
          {
            pathname: '/x/api/date-pickers/mobile-next-date-picker',
            title: 'MobileNextDatePicker',
          },
          {
            pathname: '/x/api/date-pickers/mobile-next-date-range-picker',
            title: 'MobileNextDateRangePicker',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/mobile-next-date-time-picker',
            title: 'MobileNextDateTimePicker',
          },
          {
            pathname: '/x/api/date-pickers/mobile-next-time-picker',
            title: 'MobileNextTimePicker',
          },
          { pathname: '/x/api/date-pickers/mobile-time-picker', title: 'MobileTimePicker' },
          { pathname: '/x/api/date-pickers/month-calendar', title: 'MonthCalendar' },
          {
            pathname: '/x/api/date-pickers/multi-input-date-range-field',
            title: 'MultiInputDateRangeField',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/multi-input-date-time-range-field',
            title: 'MultiInputDateTimeRangeField',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/multi-input-time-range-field',
            title: 'MultiInputTimeRangeField',
            plan: 'pro',
          },
          { pathname: '/x/api/date-pickers/next-date-picker', title: 'NextDatePicker' },
          {
            pathname: '/x/api/date-pickers/next-date-range-picker',
            title: 'NextDateRangePicker',
            plan: 'pro',
          },
          { pathname: '/x/api/date-pickers/next-date-time-picker', title: 'NextDateTimePicker' },
          { pathname: '/x/api/date-pickers/next-time-picker', title: 'NextTimePicker' },
          { pathname: '/x/api/date-pickers/pickers-day', title: 'PickersDay' },
          {
            pathname: '/x/api/date-pickers/single-input-date-range-field',
            title: 'SingleInputDateRangeField',
            plan: 'pro',
          },
          { pathname: '/x/api/date-pickers/static-date-picker', title: 'StaticDatePicker' },
          {
            pathname: '/x/api/date-pickers/static-date-range-picker',
            title: 'StaticDateRangePicker',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/static-date-time-picker',
            title: 'StaticDateTimePicker',
          },
          {
            pathname: '/x/api/date-pickers/static-next-date-picker',
            title: 'StaticNextDatePicker',
          },
          {
            pathname: '/x/api/date-pickers/static-next-date-range-picker',
            title: 'StaticNextDateRangePicker',
            plan: 'pro',
          },
          {
            pathname: '/x/api/date-pickers/static-next-date-time-picker',
            title: 'StaticNextDateTimePicker',
          },
          {
            pathname: '/x/api/date-pickers/static-next-time-picker',
            title: 'StaticNextTimePicker',
          },
          { pathname: '/x/api/date-pickers/static-time-picker', title: 'StaticTimePicker' },
          { pathname: '/x/api/date-pickers/time-clock', title: 'TimeClock' },
          { pathname: '/x/api/date-pickers/time-field', title: 'TimeField' },
          { pathname: '/x/api/date-pickers/time-picker', title: 'TimePicker' },
          { pathname: '/x/api/date-pickers/year-calendar', title: 'YearCalendar' },
        ],
      },
    ],
  },
  {
    pathname: '/x/migration',
    title: 'Migration',
    icon: 'BookIcon',
    children: [
      {
        pathname: '/x/migration',
        subheader: 'Upgrade to v6',
        children: [
          { pathname: '/x/migration/migration-data-grid-v5', title: 'Breaking changes: Data Grid' },
          {
            pathname: '/x/migration/migration-pickers-v5',
            title: 'Breaking changes: Date and Time Pickers',
          },
        ],
      },
      {
        pathname: '/x/migration',
        subheader: 'Earlier versions',
        children: [
          {
            pathname: '/x/migration/migration-pickers-lab',
            title: 'Migration from lab to v5 (Date & Time Pickers)',
          },
          {
            pathname: '/x/migration/migration-data-grid-v4',
            title: 'Migration from v4 to v5 (Data Grid)',
          },
        ],
      },
    ],
  },
];

export default pages;
