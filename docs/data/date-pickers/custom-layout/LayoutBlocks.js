import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Unstable_StaticNextDatePicker as StaticNextDatePicker } from '@mui/x-date-pickers/StaticNextDatePicker';
import { Unstable_StaticNextTimePicker as StaticNextTimePicker } from '@mui/x-date-pickers/StaticNextTimePicker';
import { Unstable_StaticNextDateTimePicker as StaticNextDateTimePicker } from '@mui/x-date-pickers/StaticNextDateTimePicker';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

const highlighLayout = {
  sx: {
    [`& .${pickersLayoutClasses.toolbar}`]: {
      border: 'solid red 4px',
    },
    [`& .${pickersLayoutClasses.contentWrapper}`]: {
      border: 'solid green 4px',
    },
    [`& .${pickersLayoutClasses.actionBar}`]: {
      border: 'solid blue 4px',
    },
  },
};

export default function LayoutBlocks() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [currentComponent, setCurrentComponent] = React.useState('date');
  const [orientation, setOrientation] = React.useState('portrait');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            px: 3,
            pb: 2,
            minWidth: '150px',
          }}
        >
          <Stack spacing={2} alignItems="center" direction="column">
            <ToggleButtonGroup
              size="small"
              fullWidth
              color="primary"
              value={currentComponent}
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              onChange={(event, value) => {
                if (value !== null) {
                  setCurrentComponent(value);
                }
              }}
              exclusive
            >
              <ToggleButton value={'date'}>date picker</ToggleButton>
              <ToggleButton value={'time'}>time picker</ToggleButton>
              <ToggleButton value={'date-time'}>date time picker</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              size="small"
              fullWidth
              color="primary"
              value={orientation}
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              onChange={(event, value) => {
                if (value !== null) {
                  setOrientation(value);
                }
              }}
              exclusive
            >
              <ToggleButton value={'landscape'}>landscape</ToggleButton>
              <ToggleButton value={'portrait'}>portrait</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
        <Divider orientation={isDesktop ? 'vertical' : 'horizontal'} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 999,
            minWidth: 0,
            p: 3,
          }}
        >
          <Box sx={{ margin: 'auto' }}>
            {currentComponent === 'date' && (
              <StaticNextDatePicker
                orientation={orientation}
                componentsProps={{
                  layout: highlighLayout,
                }}
              />
            )}

            {currentComponent === 'time' && (
              <Box sx={{ position: 'relative' }}>
                <StaticNextTimePicker
                  orientation={orientation}
                  componentsProps={{
                    layout: highlighLayout,
                  }}
                />
              </Box>
            )}

            {currentComponent === 'date-time' && (
              <StaticNextDateTimePicker
                orientation={orientation}
                componentsProps={{
                  layout: highlighLayout,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
