import { styled } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardDrawer from './DashboardDrawer';
import DashboardNavbar from './DashboardNavbar';

// ----------------------------------------------------------------------

// const APP_BAR_MOBILE = 64;
// const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  flexDirection: 'column',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: 24,
  paddingBottom: theme.spacing(10),

  [theme.breakpoints.up('lg')]: {
    paddingTop: 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
      <DashboardDrawer
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
};

export default DashboardLayout;
