import { deDE as deDECore } from '@material-ui/core/locale';
import { GridLocaleText } from '../models/api/gridLocaleTextApi';
import { getGridLocalization, Localization } from '../utils';

const deDEGrid: Partial<GridLocaleText> = {
  // Root
  rootGridLabel: 'grid',
  noRowsLabel: 'Keine Einträge',
  errorOverlayDefaultLabel: 'Ein unvorhergesehener Fehler ist passiert.',

  // Density selector toolbar button text
  toolbarDensity: 'Zeilenhöhe',
  toolbarDensityLabel: 'Zeilenhöhe',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Breit',

  // Columns selector toolbar button text
  toolbarColumns: 'Spalten',
  toolbarColumnsLabel: 'Zeige Spaltenauswahl',

  // Filters toolbar button text
  toolbarFilters: 'Filter',
  toolbarFiltersLabel: 'Zeige Filter',
  toolbarFiltersTooltipHide: 'Verstecke Filter',
  toolbarFiltersTooltipShow: 'Zeige Filter',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktive Filter` : `${count} aktiver Filter`,

  // Columns panel text
  columnsPanelTextFieldLabel: 'Finde Spalte',
  columnsPanelTextFieldPlaceholder: 'Spaltenüberschrift',
  columnsPanelDragIconLabel: 'Spalte umsortieren',
  columnsPanelShowAllButton: 'Zeige alle',
  columnsPanelHideAllButton: 'Verstecke alle',

  // Filter panel text
  filterPanelAddFilter: 'Filter hinzufügen',
  filterPanelDeleteIconLabel: 'Löschen',
  filterPanelOperators: 'Operatoren',
  filterPanelOperatorAnd: 'Und',
  filterPanelOperatorOr: 'Oder',
  filterPanelColumns: 'Spalten',
  filterPanelInputLabel: 'Wert',
  filterPanelInputPlaceholder: 'Wert filtern',

  // Filter operators text
  filterOperatorContains: 'beinhaltet',
  filterOperatorEquals: 'ist gleich',
  filterOperatorStartsWith: 'beginnt mit',
  filterOperatorEndsWith: 'endet mit',
  filterOperatorIs: 'ist',
  filterOperatorNot: 'ist nicht',
  filterOperatorOnOrAfter: 'ist an oder nach',
  filterOperatorBefore: 'ist vor',
  filterOperatorOnOrBefore: 'ist an oder vor',
  filterOperatorAfter: 'ist nach',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Zeige alle Spalten',
  columnMenuFilter: 'Filter',
  columnMenuHideColumn: 'Verstecken',
  columnMenuUnsort: 'Sortierung deaktivieren',
  columnMenuSortAsc: 'Sortiere aufsteigend',
  columnMenuSortDesc: 'Sortiere absteigend',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} aktive Filter` : `${count} aktiver Filter`,
  columnHeaderFiltersLabel: 'Zeige Filter',
  columnHeaderSortIconLabel: 'Sortieren',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} Einträge ausgewählt`
      : `${count.toLocaleString()} Eintrag ausgewählt`,

  // Total rows footer text
  footerTotalRows: 'Gesamt:',
};

export const deDE: Localization = getGridLocalization(deDEGrid, deDECore);
