# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.0-alpha.24](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.23...v4.0.0-alpha.24)

_Apr 2, 2021_

Big thanks to the 8 contributors who made this release possible. Here are some highlights ✨:

- 🇬🇷 Add elGR locale (#1275) @clytras
- 🇪🇸 Add esES locale (#1286) @WiXSL
- 🇯🇵 Add jaJP locale (#1283) @seed-of-apricot
- 🇳🇱 Add nlNL locale (#1273) @wimdetroyer
- 🐞 Bugfixes

### @material-ui/x-grid@v4.0.0-alpha.24 / @material-ui/data-grid@v4.0.0-alpha.24

#### Breaking Changes

- [DataGrid] All slot components no longer get access to `GridBaseComponentProps` through the props. To use the `GridBaseComponentProps` call the `useGridSlotComponentProps` hook. (#1252) @DanailH
- [DataGrid] Type `GridSlotsComponent` changed (#1252) @DanailH
- [DataGrid] Rename `GridBaseComponentProps` type to `GridSlotComponentProps` (#1252) @DanailH
- [DataGrid] Rename `useGridBaseComponentProps` hook to `useGridSlotComponentProps` (#1252) @DanailH
- [DataGrid] Rename modules (#1292) @DanailH
- [DataGrid] Rename all events related to column reordering, e.g. `GRID_COL_REORDER_START` -> `GRID_COLUMN_REORDER_START` (#1299) @m4theushw
- [DataGrid] Methods `onColItemDragStart`, `onColHeaderDragOver`, `onColItemDragOver`, `onColItemDragEnter` removed from the grid API. Prefer listening to [column reordering events](https://material-ui.com/components/data-grid/columns/#column-reorder) (#1299) @m4theushw
- [DataGrid] Calling `apiRef.current.getColumnHeaderParams` returns a `GridColumnHeaderParams` instead of `GridColParams` (#1299) @m4theushw
- [DataGrid] Events that follow the pattern `GRID_COLUMN_HEADER_xxx` will be called with a `GridColumnHeaderParams` instead of `GridColParams` (#1299) @m4theushw
- [DataGrid] The `renderHeader` will be called with a `GridColumnHeaderParams` instead of `GridColParams` (#1299) @m4theushw
- [DataGrid] The `apiRef.current.moveColumn` was renamed to `apiRef.current.setColumnIndex` (#1299) @m4theushw

#### Changes

- [DataGrid] Fix loader flag from useDemoData hook (#1279) @DanailH
- [DataGrid] Fix page shift after toggling column (#1284) @m4theushw
- [DataGrid] Fix rendering issues (#1319, #1253) @dtassone
- [DataGrid] Refactor edit events to allow stop propagation (#1304) @dtassone

### Core

- [core] Batch small changes (#1310) @oliviertassinari

## [4.0.0-alpha.23](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.22...v4.0.0-alpha.23)

_Mar 22, 2021_

Big thanks to the 7 contributors who made this release possible. Here are some highlights ✨:

- 🎁 Add `onRowsScrollEnd` to support infinite loading (#1199) @DanailH
  This is an XGrid feature. Provides the ability to tap into the `onRowsScrollEnd` which is called when the scroll reaches the bottom of the grid viewport allowing developers to load additional data. It can be used with a combination of `scrollBottomThreshold` to control the area in which the `onRowsScrollEnd` is called.

  See the documentation for [more details](https://material-ui.com/components/data-grid/rows/#infinite-loading).
- 🕹 Provide the ability to sort by multiple columns using Shift+click (#1203) @dtassone
- 🇵🇱 Added plPL locale (#1117) @LarsKumbier
- ⚡️ Edit cell accessibility (#1205) @dtassone
- 🐞 Bugfixes

### @material-ui/x-grid@v4.0.0-alpha.23 / @material-ui/data-grid@v4.0.0-alpha.23

- [DataGrid] Add plPL locale (#1274) @michallukowski
- [DataGrid] Add onRowsScrollEnd to support infinite loading (#1199) @DanailH
- [DataGrid] Edit Cell Navigation (#1205) @dtassone
- [DataGrid] Fix Popper z-index (#1240) @m4theushw
- [DataGrid] Provide the ability to sort by multiple columns using Shift+click (#1203) @dtassone

### Docs

- [docs] Lazy generate fake data (#1170) @oliviertassinari
- [docs] Fix linking to sorting component in data-grid overview page (#1237) @SaskiaKeil
- [docs] Fix typos (#1198) @cthogg

### Core

- [core] Improve the handling of events (rm capture, add event, add new props) (#1158) @dtassone
- [core] Reinforce that columns are definitions (#1210) @oliviertassinari
- [core] Batch small changes (#1209) @oliviertassinari
- [core] No top-level imports (#1257) @oliviertassinari
- [core] Remove dead code (#1259) @oliviertassinari

## [4.0.0-alpha.22](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.21...v4.0.0-alpha.22)

_Mar 9, 2021_

Big thanks to the 6 contributors who made this release possible. Here are some highlights ✨:

- 🎁 Implement base foundation for editing a cell (#1025) @dtassone.
  This is the foundation on which the feature will be built. Currently, the newly added methods aren't yet ready for being used. This feature will be available in the coming weeks.
- 🇩🇪 Added deDE locale (#1117) @LarsKumbier
- 📜 Fix scrollbar related issue (#1146) @dtassone
- 🐛 Handle commas in cell values when doing CSV export (#1154) @DanailH

### @material-ui/x-grid@v4.0.0-alpha.22 / @material-ui/data-grid@v4.0.0-alpha.22

- [DataGrid] Add deDE locale (#1117) @LarsKumbier
- [DataGrid] Fix scrollbar on autopageSize (#1146) @dtassone
- [DataGrid] Fix handling of special chars when doing CSV export (#1154) @DanailH
- [DataGrid] Implement base foundation for editing a cell (#1025) @dtassone
- [DataGrid] Improve edit cell UI (#1168) @oliviertassinari

### Docs

- [docs] Add demo page (#1147) @DanailH
- [docs] Fix typo in localization.md (#1155) @michael-martin-al
- [docs] Improve the desciption of the individual packages (#1139) @oliviertassinari
- [docs] Fix rendering docs to solve custom pagination issue (#1159) @consDev

### Core

- [core] Add build in eslintignore (#1171) @dtassone
- [core] Increase timeout for XGrid demo (#1150) @oliviertassinari
- [core] Output warnings in the rendered components (#1153) @oliviertassinari
- [core] Update to the HEAD of the monorepo (#1138) @oliviertassinari

## [4.0.0-alpha.21](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.20...v4.0.0-alpha.21)

_Feb 27, 2021_

Big thanks to the 7 contributors who made this release possible. Here are some highlights ✨:

- 🎁 Add support for CSV export (#1030) @DanailH.
  This is the first iteration of the feature. You can either render the `GridToolbarExport` component in the toolbar or use the apiRef `exportDataAsCsv`/`getDataAsCsv` methods.

  See the documentation for [more details](https://material-ui.com/components/data-grid/export/#csv-export).
- 🌏 Improve the support for custom locales (#1096, #1079, #1109, #1077)
- ♿️ Fix a couple of accessibility issues with the popups (#1105, #1102)

### @material-ui/x-grid@v4.0.0-alpha.21 / @material-ui/data-grid@v4.0.0-alpha.21

#### Breaking changes

- [DataGrid] Prefix all public API to fit into the global Material-UI namespace (#1069) @DanailH
  This change gets the data grid one step closer to a stable release. It allows the data grid to fit into the global namespace of Material-UI. All the exported modules should have a unique name. It allows the search features, in Google, in the docs, and in the codebase to work effectively and efficiently.

  For the mirgration, prefixing a broken import with "grid" is often enough. In the case it's not working, head to the pull request's description. It [details all the changes](https://github.com/mui-org/material-ui-x/pull/1069).

#### Changes

- [DataGrid] Add frFR locale (#1079) @oliviertassinari
- [DataGrid] Add missing TablePagination localizations (#1109) @DanailH
- [DataGrid] Add ptBR locale (#1077) @erikian
- [DataGrid] Fix checked checkbox when empty rows (#1068) @bigandy
- [DataGrid] Fix issue with visible rows state (#1113) @dtassone
- [DataGrid] Fix last row (#1071) @dtassone
- [DataGrid] Fix menu accessible (#1105) @DanailH
- [DataGrid] Fix missing translation filterOperatorAfter key (#1096) @DanailH
- [DataGrid] Fix preferences panel accessibility (#1102) @DanailH
- [DataGrid] Implement CSV export (#1030) @DanailH

### Docs

- [docs] Add expand cell renderer demo (#1070) @dtassone
- [docs] Clarify align is separate from headerAlign (#1074) @alexdanilowicz
- [docs] Clarify product split (#1080) @oliviertassinari

### Core

- [core] Fix storybook pagination stories (#1099) @dtassone
- [core] Pin playwright image to known working version (#1110) @oliviertassinari
- [test] Add visual regression tests (#1081) @oliviertassinari
- [test] Avoid Rate Limit Exceeded (#1059) @oliviertassinari
- [test] Fix containers size for screenshots (#1111) @oliviertassinari
- [test] Fix visual regression flakiness (#1115) @oliviertassinari
- [test] Improve BrowserStack configuration (#1100) @oliviertassinari
- [test] Speed-up rebuild in Karma (#1064) @oliviertassinari

## [4.0.0-alpha.20](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.19...v4.0.0-alpha.20)

_Feb 17, 2021_

Big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

- 📍 Add support for default locales (#983) @DanailH
  We have built the infrastructure to support around 100 [default locales](https://material-ui.com/components/data-grid/localization/#supported-locales). If you have localized the data grid in your application. Please do consider contributing new translations back to Material-UI by opening a pull request.
- 🎁 Add new `selectionModel` prop (#986) @dtassone
  The prop can be used to control the selected rows in the data grid. [See the docs](https://material-ui.com/components/data-grid/selection/#controlled-selection).
- 💅 Add support for default props from theme (#1019) @DanailH
- 🙌 Fix scrollbar size on windows (#1061) @dtassone
- 🐛 Polish existing features, fix 9 issues.

### @material-ui/x-grid@v4.0.0-alpha.20 / @material-ui/data-grid@v4.0.0-alpha.20

#### Breaking changes

- [DataGrid] Remove `sortDirection` from column definitions. Consolidate around fewer ways of doing the same thing. (#1015) @dtassone

  ```diff
  -columns[1] = { ...columns[1], sortDirection: 'asc' };

  return (
    <div>
  -   <DataGrid rows={rows} columns={columns} />
  +   <DataGrid rows={rows} columns={columns} sortModel={[{ field: columns[1].field, sort: 'asc' }]} />
    </div>
  ```

- [DataGrid] Rename the `onSelectionChange` prop to `onSelectionModelChange` for consistency. (#986) @dtassone

  ```diff
  -<DataGrid onSelectionChange={selectionChangeHandler} />
  +<DataGrid onSelectionModelChange={onSelectionModelChangeHandler} />
  ```

- [DataGrid] Remove `showToolbar` prop (#948) @DanailH

  ```diff
  -import { DataGrid } from '@material-ui/data-grid';
  +import { DataGrid, GridToolbar } from '@material-ui/data-grid';

  -<DataGrid showToolbar />
  +<DataGrid components={{ Toolbar: GridToolbar }} />
  ```

- [DataGrid] Change page index base, from 1 to 0. (#1021) @dtassone
  This change is done for consistency with `TablePagination` and JavaScript arrays that are 0-based. Material-UI still uses a 1-base page for the `Pagination` component that matches the URL's query.

  ```diff
  -const [page, setPage] = React.useState(1);
  +const [page, setPage] = React.useState(0);

  return (
    <div className="grid-container">
      <DataGrid rows={rows} columns={columns} page={page} />
    </div>
  ```

#### Changes

- [DataGrid] Add bgBG locale (#983) @DanailH
- [DataGrid] Add last of the missing translations (#1033) @DanailH
- [DataGrid] Add support for default props from theme (#1019) @DanailH
- [DataGrid] Fix controllable filters and select all rows with filters (#1020) @dtassone
- [DataGrid] Fix onPageChange and onPageSizeChange event trigger (#1034) @dtassone
- [DataGrid] Fix process is not defined (EXPERIMENTAL_ENABLED) (#1027) @leontastic
- [DataGrid] Fix scrollbar size on windows (#1061) @dtassone
- [DataGrid] Fix warning with v5 (#1038) @oliviertassinari
- [DataGrid] Resolve the api ref at the same time as any other ref (#990) @oliviertassinari
- [DataGrid] Use the disableDensitySelector to disable the DensitySelector (#1031) @DanailH
- [DataGrid] Fix passing [] or undefined in sortModel prop (#1035) @dtassone
- [XGrid] Fix server-side multi filters (#1029) @dtassone

### Docs

- [docs] Add code snippet for localization docs in the data grid (#1024) @DanailH
- [docs] Fix usage of the wrong type (#1062) @oliviertassinari
- [docs] Reduce fears around license upfront @oliviertassinari
- [docs] Update streaming docs (#1013) @dtassone

### Core

- [core] Batch small changes (#991) @oliviertassinari
- [core] Save/restore actual yarn cache folder (#1039) @oliviertassinari
- [test] Increase yarn timeout (#1023) @oliviertassinari
- [test] Link CircleCI URL in BS (#1060) @oliviertassinari

## [4.0.0-alpha.19](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.18...v4.0.0-alpha.19)

###### _Feb 5, 2021_

Big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

- 🎁 Add getRowId prop (#972) @dtassone
- 🚀 Add streaming delete row api (#980) @dtassone
- 💅 Fix autoHeight (#940) @oliviertassinari
- 🙌 Enable the data grid to work under strict mode (#933) @dtassone
- ⚡️ Add component slots for toolbar and preference panel (#971) @DanailH
- 🐛 Polish existing features, fix 9 issues.

### @material-ui/x-grid@v4.0.0-alpha.19 / @material-ui/data-grid@v4.0.0-alpha.19

- [DataGrid] Add component slots for toolbar and preference panel (#971) @DanailH
- [DataGrid] Add getRowId prop (#972) @dtassone
- [DataGrid] Add streaming delete row api (#980) @dtassone
- [DataGrid] Fix autoHeight (#940) @oliviertassinari
- [DataGrid] Fix column reorder instability (#950) @dtassone
- [DataGrid] Fix footer visual regression (#932) @dtassone
- [DataGrid] Fix strict mode issue with apiRef (#933) @dtassone
- [DataGrid] Work on the accessibility of the column menu (#900) @zj9495
- [DataGrid] Fix timing guarentee (#981) @oliviertassinari
- [DataGrid] Fix unstable footer height (#937) @oliviertassinari
- [DataGrid] Fix usage of the prop-types API (#955) @oliviertassinari
- [DataGrid] Fix duplicate aria-label (#953) @oliviertassinari

### docs

- [docs] Add sorting page in datagrid docs (#931) @dtassone
- [docs] Api page update with component slots (#969) @dtassone
- [docs] Catch leaks ahread of time (#979) @oliviertassinari
- [docs] Fix immutability with filter operator demos (#975) @dtassone
- [docs] Improve docs of DataGrid about filter operators (#973) @SaskiaKeil
- [docs] Improve the docs for the filtering feature (#945) @dtassone

### core

- [core] Add 'Order id 💳' section in issues (#952) @oliviertassinari
- [core] Improve prop-types handling (#978) @oliviertassinari
- [core] Investigate bundle size (#954) @oliviertassinari

## [4.0.0-alpha.18](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.17...v4.0.0-alpha.18)

###### _Jan 26, 2021_

Big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

- 🎁 Add support for Material-UI v5-alpha (#855) @DanailH.
  The data grid supports Material-UI v4 and v5. We aim to retain the support for v4 as long as v5 hasn't reached the beta phase.
- 💅 Update the customization API to be closer to Material-UI v5.
  The data grid accepts two props: `components` and `componentsProps`.
  The first prop allows to swapping specific components used in slots the grid, like the checkboxes.
  The second one allows providing extra props to each slot. It avoids the need for using the React context to access information from outside the data grid.

  See the [RFC](https://github.com/mui-org/material-ui/issues/21453) for more details.
- 🐛 Polish existing features, fix 3 issues.

### @material-ui/x-grid@v4.0.0-alpha.18 / @material-ui/data-grid@v4.0.0-alpha.18

#### Breaking changes

- [DataGrid] Implement customization pattern of Material-UI v5 (#851, #879) @dtassone

  - Capitalize the keys of the `components` prop. This change aims to bring consistency with the customization pattern of Material-UI v5:

  ```diff
  <DataGrid
    components={{
  -   noRowsOverlay: CustomNoRowsOverlay,
  +   NoRowOverlay: CustomNoRowsOverlay,
    }}
  />
  ```

  - Move all the icon components overrides in the `components` prop. And added the suffix 'Icon' on each icon component. This change aims to bring consistency with the customization pattern of Material-UI v5:

  ```diff
  <DataGrid
  - icons: {{
  -   ColumnSortedAscending: SortedAscending,
  - }},
  + components={{
  +   ColumnSortedAscendingIcon: SortedAscending,
  + }}
  />
  ```

  - Change the props provided to the component of the `components` prop. Expose the whole state instead of an arbitrary set of props:

  ```diff
  -function CustomPagination(props: ComponentProps) {
  -  const { pagination, api } = props;
  +function CustomPagination(props: BaseComponentProps) {
  +  const { state, api } = props;

     return (
       <Pagination
  -      page={pagination.page}
  -      count={pagination.pageCount}
  +      page={state.pagination.page}
  +      count={state.pagination.pageCount}

  // ...

  <DataGrid components={{ Pagination: CustomPagination }} />
  ```

#### Changes

- [DataGrid] Add customisation on panels (#890) @dtassone
- [DataGrid] Add support for Material-UI v5-alpha (#855) @DanailH
- [DataGrid] Fix footer count not shown on small screen (#899) @mnajdova
- [DataGrid] Fix column selector crash when hiding columns (#875) @DanailH
- [DataGrid] Fix <kbd>Shift</kbd> + <kbd>Space</kbd> keyboard regression to select row (#897) @dtassone

### docs

- [docs] Fix imports for x-grid-data-generator (#887) @DanailH
- [docs] Skip download of playwright for docs @oliviertassinari
- [CHANGELOG] Polish @oliviertassinari

### core

- [core] Automation for duplicate issues (#878) @oliviertassinari
- [core] Replace commander with yargs (#872) @dependabot-preview
- [core] Update monorepo (#884) @oliviertassinari

## [4.0.0-alpha.17](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.15...v4.0.0-alpha.17)

###### _Jan 14, 2021_

Big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

- 🎛 Add support for Column selector (#837) @DanailH @dtassone.
  The feature can be triggered from the toolbar or the column menu. Check [the documentation](https://material-ui.com/components/data-grid/columns/#column-selector).

  ![column selector](https://user-images.githubusercontent.com/3165635/104791267-6ff77300-579a-11eb-9338-11a8fde83258.gif)

- 🐛 A focus on fixing regressions from previous releases refactoring and bugs.

### @material-ui/x-grid@v4.0.0-alpha.17 / @material-ui/data-grid@v4.0.0-alpha.17

- [DataGrid] Fix `onPageChange` firing too often (#838) @dtassone
- [DataGrid] Fix behavior of the `hideFooter` prop (#846) @dtassone
- [DataGrid] Fix the display logic for "error messages" (#843) @dtassone
- [DataGrid] Fix wrong initial sort order (#841) @dtassone
- [DataGrid] Remove tslib dependency from packages (#832) @oliviertassinari

### Docs

- [docs] Add docs for data grid column selector (#837) @DanailH
- [docs] Clarify feature split between pro and premium (#779) @oliviertassinari

### Core

- [core] Add tests for Column selector feature (#845) @DanailH

## [4.0.0-alpha.15](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.14...v4.0.0-alpha.15)

###### _Jan 7, 2021_

Big thanks to the 2 contributors who made this release possible. Here are some highlights ✨:

- 🔗 Update peer dependencies for React 17 (#814) @DanailH
- 🐛 Fix keyboard event collisions inside DataGrid cells (#794) @DanailH

### @material-ui/x-grid@v4.0.0-alpha.15 / @material-ui/data-grid@v4.0.0-alpha.15

- [DataGrid] Fix keyboard event collisions (#794) @DanailH

### Docs

- [docs] Add documentation for the column menu (#815) @DanailH

### Core

- [core] Update peer dependencies for React 17 (#814) @DanailH
- [core] Batch small changes (#800) @oliviertassinari
- [CHANGELOG] Use the format of the main repository @oliviertassinari

## [4.0.0-alpha.14](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.13...v4.0.0-alpha.14)

###### _Dec 31, 2020_

Big thanks to the 5 contributors who made this release possible. Here are some highlights ✨:

- 🌎 Add support for internationalization (#718) @DanailH

  You can use the `localeText` prop to provide custom wordings in the data grid.
  Check the documentation for [a demo](https://material-ui.com/components/data-grid/localization/#translation-keys).

- 📚 Start documenting the filtering feature 🧪 (#754) @dtassone

  The work in progress filtering feature and documentation can be found following [this link](https://material-ui.com/components/data-grid/filtering/). Early feedback are welcome.

### @material-ui/x-grid@v4.0.0-alpha.14 / @material-ui/data-grid@v4.0.0-alpha.14

- [DataGrid] Convert remaining text to use locale text API (#791) @DanailH
- [DataGrid] Fix column width calculation after data changes (#756) @DanailH
- [DataGrid] Setup internationalization (#718) @DanailH
- [DataGrid] getValueError in valueGetter if incorrect field is supplied (#755) @ZeeshanTamboli
- [XGrid] Fix support for custom class name generators (#793) @DanailH

### Docs

- [docs] Polish docs (#778) @oliviertassinari
- [docs] Start documentation for the data grid filter features (#754) @dtassone
- [docs] Sync with docs to fix images (#776) @oliviertassinari

### Core

- [test] We don't need to wait 100ms (#773) @oliviertassinari
- [core] Remove useless clone (#757) @oliviertassinari

## [4.0.0-alpha.13](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.12...v4.0.0-alpha.13)

###### _Dec 16, 2020_

Big thanks to the 4 contributors who made this release possible. Here are some highlights ✨:

- 🐛 Fix bugs from recently released features.
- 🧪 Continue the iteration on the data grid filtering feature, soon to be released @dtassone.

### @material-ui/x-grid@v4.0.0-alpha.13 / @material-ui/data-grid@v4.0.0-alpha.13

- [DataGrid] Fix density prop when toolbar is hidden (#717) @DanailH
- [DataGrid] Fix row cells leaking CSS 'text-align' from parent (#728) @ZeeshanTamboli
- [DataGrid] Add 'nonce' prop to allow inline style if user has CSP (#724) @ZeeshanTamboli

### Docs

- [docs] Add missing props to DataGrid and XGrid api pages (#721) @DanailH
- [docs] Fix wrong link anchor @oliviertassinari
- [docs] Proxy production version @oliviertassinari

### Core

- [security] Bump ini from 1.3.5 to 1.3.7 (#719) @dependabot-preview
- [core] Update monorepository (#725) @oliviertassinari
- [test] Polish refactor (#723) @oliviertassinari
- [test] Split data grid tests in multiple files (#722) @dtassone
- [test] Add tests for DataGrid filtering feature (#715) @dtassone

## [4.0.0-alpha.12](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.11...v4.0.0-alpha.12)

###### _Dec 9, 2020_

Big thanks to the 6 contributors who made this release possible. Here are some highlights ✨:

- 🔍 Add a new data grid [density selector](https://material-ui.com/components/data-grid/rendering/#density) feature (#606) @DanailH.
- 💄 A first iteration on the data grid's toolbar.
- 🧪 Continue the iteration on the data grid filtering feature, soon to be released @dtassone.

### @material-ui/x-grid@v4.0.0-alpha.12 / @material-ui/data-grid@v4.0.0-alpha.12

#### Changes

- [DataGrid] Add Density selector (#606) @DanailH
- [DataGrid] Fix swallowing of keyboard events (#673) @DanailH
- [DataGrid] Fix collision with react-virtualized on detectElementResize (#678) @tifosiblack
- [DataGrid] Fix component name, rm context,  refact gridComponent (#707) @dtassone
- [DataGrid] Fix infinite loop with multiple grid, and fix performance (#679) @dtassone
- [DataGrid] Fix keyboard navigation in column picker (#674) @oliviertassinari
- [DataGrid] Fix server-side sorting (#704) @akandels
- [DataGrid] Improve the DX of popups (#686) @oliviertassinari
- [DataGrid] Refactor cols (#682) @dtassone
- [DataGrid] Rename hideToolbar prop to showToolbar (#706) @DanailH
- [DataGrid] Prepare server filters (#649) @dtassone
- [DataGrid] Fix display of selected rows in footer (#676) @oliviertassinari

### Docs

- [docs] Enable codesandbox preview in PRs (#613) @oliviertassinari

### Core

- [core] Batch small changes (#683) @oliviertassinari
- [test] Add regression test (#705) @oliviertassinari
- [test] Allow running all the tests in strict mode (#684) @oliviertassinari

## [4.0.0-alpha.11](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.10...v4.0.0-alpha.11)

###### _Dec 2, 2020_

Big thanks to the 8 contributors who made this release possible. Here are some highlights ✨:

- 🐛 Fix bugs from recently released features.
- 🧪 Iterate on the upcoming filtering feature under an undocumented prop.

### @material-ui/x-grid@v4.0.0-alpha.11 / @material-ui/data-grid@v4.0.0-alpha.11

#### Breaking changes

- [XGrid] Rows refactoring, flatten RowModel, remove RowData (#668) @dtassone

  These changes simplify the API and avoid confusion between `RowData` and `RowModel`.
  Now we only have RowModel which is a flat object containing an id and the row data. It is the same object as the items of the `rows` prop array.

  The API to change update the rows using apiRef has changed:

  ```diff
  -apiRef.current.updateRowData()
  +apiRef.current.updateRows()
  ```
  ```diff
  -apiRef.current.setRowModels()
  +apiRef.current.setRows()
  ```

  `apiRef.current.updateRowModels` has been removed, please use `apiRef.current.updateRows`.

#### Changes

- [DataGrid] Fix server-side pagination (#639) @dtassone
- [DataGrid] Fix flex columns not taking into account "checkboxSelection" prop @DanailH
- [DataGrid] First iteration on filtering, basic support (#411) @dtassone
- [DataGrid] Improve filters (#635) @dtassone
- [DataGrid] Fix filters on rendering new rows (#642) @dtassone
- [DataGrid] Fix filters flex-shrink (#664) @oliviertassinari

### Docs

- [docs] Data Grid depends on side effects (#666) @oliviertassinari
- [docs] Clarify the purpose of x-grid-data-generator (#634) @Elius94
- [docs] Data Grid is in the lab (#612) @oliviertassinari
- [docs] Fix Demo app, downgrade webpack-cli, known issue in latest version (#647) @dtassone
- [docs] Fix typo in columns.md @stojy
- [docs] Reduce confusion on /export page (#646) @SerdarMustafa1

### Core

- [core] Introduce a feature toggle (#637) @oliviertassinari
- [core] Remove gitHead (#669) @oliviertassinari
- [core] Remove react-select (#658) @dependabot-preview
- [core] Replace Storybook knobs for args (#601) @tooppaaa
- [core] Update to Material-UI v4.11.1 (#636) @oliviertassinari

## [4.0.0-alpha.10](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.9...v4.0.0-alpha.10)

###### _Nov 20, 2020_

### @material-ui/x-grid@v4.0.0-alpha.10 / @material-ui/data-grid@v4.0.0-alpha.10

- [DataGrid] Add fluid columns width support (#566) @DanailH
- [DataGrid] Default toolbar setup (#574) @DanailH
- [DataGrid] Fix autoHeight computation for custom headers and footers (#597) @DanailH
- [DataGrid] Fix type definitions (#596) @tooppaaa
- [DataGrid] Reset sortedRows state on prop change (#599) @dtassone

### Docs

- [docs] Update feature comparison table for Column reorder @DanailH

### Core

- [core] Prepare work for a future public state api (#533) @dtassone
- [core] Fix yarn prettier write @oliviertassinari
- [test] Share karma setup (#576) @oliviertassinari

## [4.0.0-alpha.9](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.8...v4.0.0-alpha.9)

###### _Nov 9, 2020_

### @material-ui/x-grid@v4.0.0-alpha.9 / @material-ui/data-grid@v4.0.0-alpha.9

- [DataGrid] Fix keyboard with multiple grids (#562) @dtassone
- [DataGrid] Add touch support on column resize (#537) @danailH
- [DataGrid] Refactor containerSizes in smaller state (#544) @dtassone
- [DataGrid] Fix display of row count and selected rows on mobile (#508) @oliviertassinari
- [DataGrid] Apply review from #412 (#515) @oliviertassinari
- [DataGrid] Avoid paint step (#531) @oliviertassinari
- [DataGrid] Refactor rendering, remove rafUpdate (#532) @Dtassone
- [DataGrid] Add missing reselect dependency (#534) @dtassone
- [DataGrid] Raf Timer stored in apiRef (#506) @dtassone
- [DataGrid] Fix webpack v5 support (#449) @oliviertassinari
- [DataGrid] Rework columnReorder to work with the new state management (#505) @danailH
- [DataGrid] Fix performance issues (#501) @dtassone
- [DataGrid] Refactor columns scrolling (#500) @dtassone
- [DataGrid] Replace require with import (#455) @oliviertassinari
- [DataGrid] Restore regression test (#503) @oliviertassinari
- [DataGrid] Refactor state (#412) @dtassone

### Docs

- [docs] Fix links to GitHub (#538) @oliviertassinari
- [docs] Add more information to readme (#539) @An-prog-hub
- [docs] Fix the Netlify proxy for localization of X (#536) @oliviertassinari
- [docs] Add deploy script command @oliviertassinari

### Core

- [core] Batch small changes (#546) @oliviertassinari
- [core] Improve types (#448) @olivertassinari
- [core] Run prettier (#482) @oliviertassinari
- [core] Disable generation of changelogs @oliviertassinari
- [test] Karma should fail if errors are thrown (#543) @oliviertassinari

## [4.0.0-alpha.8](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.7...v4.0.0-alpha.8)

###### _Oct 23, 2020_

### @material-ui/x-grid@v4.0.0-alpha.8 / @material-ui/data-grid@v4.0.0-alpha.8

- [DataGrid] Fix header row tabIndex (#478) @DanailH
- [DataGrid] Reduce dependency on lodash, save 1kB gzipped (#450) @oliviertassinari
  The DataGrid goes from [28.2 kB](https://bundlephobia.com/result?p=@material-ui/data-grid@4.0.0-alpha.7) gzipped down to [27.3 kB](https://bundlephobia.com/result?p=@material-ui/data-grid@4.0.0-alpha.8) gzipped.
- [XGrid] Second iteration on resizing logic (#436) @oliviertassinari
  Fix 8 bugs with the resizing.

### Core

- [core] Remove usage of LESS (#467) @dependabot-preview
- [core] Update to the latest version of the main repo (#456) @oliviertassinari

## [4.0.0-alpha.7](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.6...v4.0.0-alpha.7)

###### _Oct 19, 2020_

### @material-ui/x-grid@v4.0.0-alpha.7 / @material-ui/data-grid@v4.0.0-alpha.7

- [DataGrid] Add column reorder support (#165) @DanailH
- [DataGrid] Fix iOS issue when scrolling left (#439) @DanailH
- [DataGrid] Improve sizing logic (#350) @oliviertassinari
- [DataGrid] Improve warning and docs for layouting (#405) @RobertAron

### Docs

- [docs] Remove id columns (#355) @oliviertassinari
- [docs] Swap words to better match users' query (#354) @oliviertassinari

### Core

- [storybook] Fix warning and improve perf (#407) @dtassone
- [core] Batch small changes (#403) @oliviertassinari
- [core] Fix yarn warning (#421) @oliviertassinari
- [core] Hoist duplicated dependencies (#341) @oliviertassinari
- [core] Remove dead code (#454) @oliviertassinari
- [core] Remove dead-code (#353) @oliviertassinari
- [core] Sync supported browser with v5 (#453) @oliviertassinari
- [test] Add end-to-end test missing id (#356) @oliviertassinari
- [test] Add missing types linting for x-grid (#357) @oliviertassinari
- [test] Run the karma tests in browserstack (#316) @oliviertassinari

## [4.0.0-alpha.6](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.2...v4.0.0-alpha.6)

###### _Sep 25, 2020_

### @material-ui/x-grid@v4.0.0-alpha.6 / @material-ui/data-grid@v4.0.0-alpha.6

- [DataGrid] Throw if rows id is missing (#349) @dtassone
- [DataGrid] Fix valueGetter sorting (#348) @dtassone
- [DataGrid] Fix typings and packages assets (#339) @dtassone
- [DataGrid] Add npm keywords (#304) @oliviertassinari

### Docs

- [docs] Avoid double borders (#340) @oliviertassinari
- [docs] Fix layout jump issue (#338) @oliviertassinari
- [docs] Fix short description warning (#302) @oliviertassinari

## [4.0.0-alpha.2](https://github.com/mui-org/material-ui-x/compare/v4.0.0-alpha.1...v4.0.0-alpha.2)

###### _Sep 18, 2020_

- [DataGrid] Fix wrongly exported types (#298) @dtassone

## [4.0.0-alpha.1](https://github.com/mui-org/material-ui-x/compare/v0.1.67...v4.0.0-alpha.1)

###### _Sep 17, 2020_

This is the first public alpha release of the component after 6 months of development since the initial commit (March 15th 2020).
`@material-ui/data-grid` is licensed under MIT while `@material-ui/x-grid` is licensed under a commercial license.
You can find the documentation at this address: https://material-ui.com/components/data-grid/.

### @material-ui/x-grid@v4.0.0-alpha.1 / @material-ui/data-grid@v4.0.0-alpha.1

- [DataGrid] Add api pages for data-grid and x-grid (#289) @dtassone
- [DataGrid] Add dark mode scrollbar (#282) @dtassone
- [DataGrid] Better explain the limits of MIT vs commercial (#225) @oliviertassinari
- [DataGrid] First v4 alpha version (#291) @dtassone
- [DataGrid] Fix CSS footer spacing (#268) @oliviertassinari
- [DataGrid] Fix checkbox selection issue (#285) @dtassone
- [DataGrid] Fix disableMultipleSelection (#286) @dtassone
- [DataGrid] Fix issue #254, focus cell fully visible (#256) @dtassone
- [DataGrid] Fix issues with path and import (#259) @dtassone
- [DataGrid] Fix setPage not working (#284) @dtassone
- [DataGrid] Move column resizing to XGrid only (#257) @dtassone
- [DataGrid] Remove apiRef in DataGrid, a XGrid only feature (#290) @dtassone
- [DataGrid] Replace style-components with @material-ui/styles (#168) @dtassone

### Docs

- [docs] Add issue templates (#222) @oliviertassinari
- [docs] Add more context on the ⚡️ icons (#265) @oliviertassinari
- [docs] Add pricing links (#266) @oliviertassinari
- [docs] Add Rendering section (#267) @oliviertassinari
- [docs] Add Resources section (#264) @oliviertassinari
- [docs] Apply review from Matt @oliviertassinari
- [docs] Continue the migration of the demos (#232) @oliviertassinari
- [docs] Disable ads on Enterprise features (#263) @oliviertassinari
- [docs] Improve documentation (#287) @oliviertassinari
- [docs] Matt review (#234) @oliviertassinari
- [docs] Migrate Getting Started section (#255) @oliviertassinari
- [docs] Migrate Selection pages (#248) @oliviertassinari
- [docs] Migrate more pages (#243) @oliviertassinari
- [docs] Migrate sorting (#233) @oliviertassinari
- [docs] Migration of the paginaton (#224) @oliviertassinari
- [docs] Polish the first experience (#261) @oliviertassinari
- [docs] Remove blank lines @tags @oliviertassinari
