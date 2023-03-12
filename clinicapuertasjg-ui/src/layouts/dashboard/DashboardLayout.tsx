import { styled } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardDrawer from './components/DashboardDrawer';
import DashboardNavbar, { APPBAR_DESKTOP, APPBAR_MOBILE } from './components/DashboardNavbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APPBAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APPBAR_DESKTOP + 24,
  },
}));

// ----------------------------------------------------------------------

const DashboardLayout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <RootStyle>
      <DashboardNavbar handleDrawerToggle={handleDrawerToggle} />
      <DashboardDrawer isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

export default DashboardLayout;
