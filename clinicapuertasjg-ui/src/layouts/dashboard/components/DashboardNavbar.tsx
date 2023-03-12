import { CarRepair } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, styled, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from '../../../hooks/useResponsive';
import AccountPopover from './AccountPopover';
import { DRAWER_WIDTH } from './DashboardDrawer';

type Props = { handleDrawerToggle: VoidFunction };

const LEGEND_DESKTOP = 'CLÍNICA DE PUERTAS DE CARROS J & G';
const LEGEND_MOBILE = 'J & G';
export const APPBAR_MOBILE = 64;
export const APPBAR_DESKTOP = 72;

const RootStyle = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const DashboardNavbar: React.FC<Props> = ({ handleDrawerToggle }) => {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle>
      <ToolbarStyle>
        {!isDesktop && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          display='flex'
          alignItems='center'
          component={RouterLink}
          to='/'
          sx={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}
        >
          <CarRepair sx={{ mr: 1 }} />
          <Typography
            variant='h6'
            sx={{
              mr: 2,
            }}
          >
            {isDesktop ? LEGEND_DESKTOP : LEGEND_MOBILE}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <AccountPopover />
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
