import { nlNL as nlNLCore } from '@material-ui/core/locale';
import { GridLocaleText } from '../models/api/gridLocaleTextApi';
import { getGridLocalization, Localization } from '../utils';

const nlNLGrid: Partial<GridLocaleText> = {
  // Root
  rootGridLabel: 'grid',
  noRowsLabel: 'Geen resultaten.',
  errorOverlayDefaultLabel: 'Er deed zich een fout voor.',

  // Density selector toolbar button text
  toolbarDensity: 'Grootte',
  toolbarDensityLabel: 'Grootte',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Normaal',
  toolbarDensityComfortable: 'Breed',

  // Columns selector toolbar button text
  toolbarColumns: 'Kolommen',
  toolbarColumnsLabel: 'Kies kolommen',

  // Filters toolbar button text
  toolbarFilters: 'Filters',
  toolbarFiltersLabel: 'Toon filters',
  toolbarFiltersTooltipHide: 'Verberg filters',
  toolbarFiltersTooltipShow: 'Toon filters',
  toolbarFiltersTooltipActive: (count) =>
    count > 1 ? `${count} actieve filters` : `${count} filter actief`,

  // Columns panel text
  columnsPanelTextFieldLabel: 'Zoek kolom',
  columnsPanelTextFieldPlaceholder: 'Kolomtitel',
  columnsPanelDragIconLabel: 'Kolom herschikken',
  columnsPanelShowAllButton: 'Alles tonen',
  columnsPanelHideAllButton: 'Alles verbergen',

  // Filter panel text
  filterPanelAddFilter: 'Filter toevoegen',
  filterPanelDeleteIconLabel: 'Verwijderen',
  filterPanelOperators: 'Operatoren',
  filterPanelOperatorAnd: 'En',
  filterPanelOperatorOr: 'Of',
  filterPanelColumns: 'Kolommen',
  filterPanelInputLabel: 'Waarde',
  filterPanelInputPlaceholder: 'Filter waarde',

  // Filter operators text
  filterOperatorContains: 'bevat',
  filterOperatorEquals: 'gelijk aan',
  filterOperatorStartsWith: 'begint met',
  filterOperatorEndsWith: 'eindigt met',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is niet',
  filterOperatorOnOrAfter: 'is gelijk of er voor',
  filterOperatorAfter: 'is voor',
  filterOperatorOnOrBefore: 'is gelijk of er na',
  filterOperatorBefore: 'is na',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Toon kolommen',
  columnMenuFilter: 'Filteren',
  columnMenuHideColumn: 'Verbergen',
  columnMenuUnsort: 'Annuleer sortering',
  columnMenuSortAsc: 'Oplopend sorteren',
  columnMenuSortDesc: 'Aflopend sorteren',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count > 1 ? `${count} actieve filters` : `${count} filter actief`,
  columnHeaderFiltersLabel: 'Toon filters',
  columnHeaderSortIconLabel: 'Sorteren',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count > 1
      ? `${count.toLocaleString()} rijen geselecteerd`
      : `${count.toLocaleString()} rij geselecteerd`,

  // Total rows footer text
  footerTotalRows: 'Totaal:',
};

export const nlNL: Localization = getGridLocalization(nlNLGrid, nlNLCore);
