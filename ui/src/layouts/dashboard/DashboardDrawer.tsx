import { Box, Drawer } from '@mui/material';
import React from 'react';
import DashboardDrawerContent from './DashboardDrawerContent';

const container = () => window.document.body;

type Props = { isDrawerOpen: boolean; handleDrawerToggle: VoidFunction };

const DRAWER_WIDTH = 240;

const DashboardDrawer: React.FC<Props> = ({
  isDrawerOpen,
  handleDrawerToggle,
}) => {
  return (
    <Box component="nav">
      <Drawer
        container={container}
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        <DashboardDrawerContent handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </Box>
  );
};

export default DashboardDrawer;
