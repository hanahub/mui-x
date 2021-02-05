import Button from '@material-ui/core/Button';
import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  ColDef,
  XGrid,
  GridOverlay,
  GridFooterContainer,
  XGridProps,
  HideColMenuItem,
  ColumnMenuProps,
  BaseComponentProps,
  GridColumnMenu,
  PanelProps,
  PreferencesPanel,
  GridFooter,
  GridToolbar,
} from '@material-ui/x-grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import CodeIcon from '@material-ui/icons/Code';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Pagination from '@material-ui/lab/Pagination';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import { useData } from '../../hooks/useData';

export default {
  title: 'X-Grid Demos/Custom-Components',
  component: XGrid,
  parameters: {
    docs: {
      page: null,
    },
  },
  decorators: [(StoryFn) => <StoryFn />],
} as Meta;

const columns: ColDef[] = [
  { field: 'id' },
  { field: 'name', sortDirection: 'asc' },
  { field: 'age', sortDirection: 'desc' },
];

const rows = [
  { id: 1, name: 'alice', age: 40 },
  { id: 2, name: 'bob', age: 30 },
  { id: 3, name: 'igor', age: 40 },
  { id: 4, name: 'clara', age: 40 },
  { id: 5, name: 'clara', age: null },
  { id: 6, name: null, age: 25 },
  { id: 7, name: '', age: 42 },
];

const defaultData = { columns, rows };

const Template: Story<XGridProps> = (args) => {
  const data = useData(500, 50);
  return (
    <div className="grid-container">
      <XGrid {...data} {...args} />
    </div>
  );
};

function LoadingComponent() {
  return (
    <GridOverlay className="custom-overlay">
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export const Loading = Template.bind({});
Loading.args = {
  ...defaultData,
  loading: true,
  components: {
    LoadingOverlay: LoadingComponent,
  },
};

function NoRowsComponent() {
  return (
    <GridOverlay className="custom-overlay">
      <CodeIcon />
      <span style={{ lineHeight: '24px', padding: '0 10px' }}>No Rows</span>
      <CodeIcon />
    </GridOverlay>
  );
}

export const NoRows = Template.bind({});
NoRows.args = {
  rows: [],
  columns,
  components: {
    NoRowsOverlay: NoRowsComponent,
  },
};

function SortedDescending() {
  return <ExpandMoreIcon className="icon" />;
}

function SortedAscending() {
  return <ExpandLessIcon className="icon" />;
}

export const Icons = Template.bind({});
Icons.args = {
  ...defaultData,
  components: {
    ColumnSortedDescendingIcon: SortedDescending,
    ColumnSortedAscendingIcon: SortedAscending,
  },
};

function PaginationComponent(props: BaseComponentProps & { color?: 'primary' }) {
  const { state, api } = props;
  return (
    <Pagination
      className="my-custom-pagination"
      page={state.pagination.page}
      color={props.color}
      count={state.pagination.pageCount}
      onChange={(event, value) => api.current.setPage(value)}
    />
  );
}

export const CustomPagination = Template.bind({});
CustomPagination.args = {
  pagination: true,
  pageSize: 50,
  components: {
    Pagination: PaginationComponent,
  },
  componentsProps: {
    pagination: { color: 'primary' },
  },
};

function FooterComponent(props) {
  const { state, api } = props;
  return (
    <GridFooterContainer className="my-custom-footer">
      <span style={{ display: 'flex', alignItems: 'center', background: props.color }}>
        This is my custom footer and pagination here!{' '}
      </span>
      <Pagination
        className="my-custom-pagination"
        page={state.pagination.page}
        count={state.pagination.pageCount}
        onChange={(event, value) => api.current.setPage(value)}
      />
    </GridFooterContainer>
  );
}

export const CustomFooter = Template.bind({});
CustomFooter.args = {
  pagination: true,
  pageSize: 33,
  components: {
    Footer: FooterComponent,
  },
  componentsProps: {
    footer: { color: 'blue' },
  },
};

function FooterComponent2(props) {
  const { state } = props;

  return (
    <div className="footer my-custom-footer"> I counted {state.pagination.rowCount} row(s) </div>
  );
}

function CustomHeader(props) {
  return (
    <div className="custom-header">
      <PaginationComponent {...props} />
    </div>
  );
}

export const HeaderAndFooter = Template.bind({});
HeaderAndFooter.args = {
  pagination: true,
  hideFooterPagination: true,
  pageSize: 33,
  components: {
    Header: CustomHeader,
    Footer: FooterComponent2,
  },
  componentsProps: {
    header: { color: 'primary' },
  },
};

function IsDone(props: { value?: boolean }) {
  return props.value ? <DoneIcon fontSize="small" /> : <ClearIcon fontSize="small" />;
}

function RegisteredComponent() {
  return <CreateIcon className="icon" />;
}

export const StyledColumns = Template.bind({});
StyledColumns.args = {
  columns: [
    { field: 'id' },
    { field: 'firstName' },
    { field: 'lastName' },
    {
      field: 'age',
      cellClassName: ['age', 'shine'],
      headerClassName: ['age', 'shine'],
      type: 'number',
      sortDirection: 'desc',
    },
    {
      field: 'fullName',
      description: 'this column has a value getter and is not sortable',
      headerClassName: 'highlight',
      sortable: false,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
      cellClassRules: {
        common: (params) => params.row.lastName === 'Smith',
        unknown: (params) => !params.row.lastName,
      },
    },
    {
      field: 'isRegistered',
      description: 'Is Registered',
      align: 'center',
      renderCell: (params) => <IsDone value={!!params.value} />,
      renderHeader: RegisteredComponent,
      headerAlign: 'center',
    },
    {
      field: 'registerDate',
      headerName: 'Registered on',
      sortDirection: 'asc',
      type: 'date',
    },
    {
      field: 'lastLoginDate',
      headerName: 'Last Seen',
      type: 'dateTime',
      width: 200,
    },
  ],
  rows: [
    { id: 1, firstName: 'alice', age: 40 },
    {
      id: 2,
      lastName: 'Smith',
      firstName: 'bob',
      isRegistered: true,
      age: 30,
      registerDate: new Date(2010, 10, 25),
      lastLoginDate: new Date(2019, 0, 30, 10, 55, 32),
    },
    {
      id: 3,
      lastName: 'Smith',
      firstName: 'igor',
      isRegistered: false,
      age: 40,
      registerDate: new Date(2013, 2, 13),
    },
    {
      id: 4,
      lastName: 'James',
      firstName: 'clara',
      isRegistered: true,
      age: 40,
      registerDate: new Date(2011, 2, 11),
      lastLoginDate: new Date(2020, 4, 28, 11, 30, 25),
    },
    {
      id: 5,
      lastName: 'Bobby',
      firstName: 'clara',
      isRegistered: false,
      age: null,
      registerDate: new Date(2010, 10, 2),
      lastLoginDate: new Date(2020, 0, 5, 10, 11, 32),
    },
    {
      id: 6,
      lastName: 'James',
      firstName: null,
      isRegistered: false,
      age: 40,
      registerDate: new Date(2015, 11, 6),
      lastLoginDate: new Date(2020, 5, 20, 15, 35, 10),
    },
    { id: 7, lastName: 'Smith', firstName: '', isRegistered: true, age: 40 },
  ],
};

function ToolbarComponent(props: any) {
  return <div style={{ background: props.color }}>This is my custom toolbar!</div>;
}

export const CustomToolbar = Template.bind({});
CustomToolbar.args = {
  components: {
    Header: ToolbarComponent,
  },
  componentsProps: {
    header: { color: 'red' },
  },
};

function ColumnMenuComponent(props: ColumnMenuProps & { color?: string }) {
  if (props.currentColumn.field === 'id') {
    return <HideColMenuItem onClick={props.hideMenu} column={props.currentColumn!} />;
  }
  if (props.currentColumn.field === 'currencyPair') {
    return (
      <div style={{ background: props.color || '#ccc' }}>This is my currency pair column Menu!</div>
    );
  }
  return <GridColumnMenu hideMenu={props.hideMenu} currentColumn={props.currentColumn} />;
}

export const CustomColumnMenu = Template.bind({});
CustomColumnMenu.args = {
  components: {
    ColumnMenu: ColumnMenuComponent,
  },
  componentsProps: {
    columnMenu: { color: 'red' },
  },
};

export const UndefinedAllComponent = Template.bind({});
UndefinedAllComponent.args = {
  components: {
    ColumnMenu: undefined,
    Pagination: undefined,
    Footer: undefined,
    Header: undefined,
    ErrorOverlay: undefined,
    NoRowsOverlay: undefined,
    LoadingOverlay: undefined,
  },
};

function MyIcon1() {
  // eslint-disable-next-line jsx-a11y/accessible-emoji
  return <span role="img">✅</span>;
}

function MyIcon2() {
  // eslint-disable-next-line jsx-a11y/accessible-emoji
  return <span role="img">💥</span>;
}

export function DynamicIconUpdate() {
  const data = useData(2000, 200);
  const [icon, setIcon] = React.useState<any>(() => MyIcon1);

  return (
    <React.Fragment>
      <div>
        <Button
          component="button"
          color="primary"
          variant="outlined"
          onClick={() => {
            setIcon(() => MyIcon2);
          }}
        >
          Change Icon
        </Button>
        <Button
          component="button"
          color="primary"
          variant="outlined"
          onClick={() => {
            setIcon(undefined);
          }}
        >
          Clear icon
        </Button>
      </div>
      <div className="grid-container">
        <XGrid
          {...data}
          components={{
            DensityStandardIcon: icon,
            Toolbar: GridToolbar,
          }}
          showToolbar
        />
      </div>
    </React.Fragment>
  );
}

function CustomFilterPanel(props: { bg?: string } & BaseComponentProps) {
  return (
    <div style={{ width: 500, height: 100, background: props.bg, color: 'white' }}>
      My Custom Filter Panel
    </div>
  );
}
function CustomColumnsPanel(props: { bg?: string } & BaseComponentProps) {
  return (
    <div style={{ width: 500, height: 300, background: props.bg }}>My Custom Columns Panel</div>
  );
}
export const CustomFilterColumnsPanels = Template.bind({});
CustomFilterColumnsPanels.args = {
  showToolbar: true,
  components: {
    FilterPanel: CustomFilterPanel,
    ColumnsPanel: CustomColumnsPanel,
    Toolbar: GridToolbar,
  },
  componentsProps: {
    filterPanel: { bg: 'blue' },
    columnsPanel: { bg: 'red' },
  },
};
function CustomPanelComponent(props: BaseComponentProps & PanelProps) {
  if (!props.open) {
    return null;
  }

  return <div style={{ maxHeight: 500, overflow: 'auto', display: 'flex' }}>{props.children}</div>;
}
export const CustomPanel = Template.bind({});
CustomPanel.args = {
  showToolbar: true,
  components: {
    Panel: CustomPanelComponent,
    Toolbar: GridToolbar,
  },
};

function FooterWithPanel() {
  return (
    <React.Fragment>
      <GridFooter />
      <PreferencesPanel />
    </React.Fragment>
  );
}
export const CustomPanelInFooter = Template.bind({});
CustomPanelInFooter.args = {
  showToolbar: true,
  components: {
    Panel: CustomPanelComponent,
    Footer: FooterWithPanel,
    Toolbar: GridToolbar,
  },
};
