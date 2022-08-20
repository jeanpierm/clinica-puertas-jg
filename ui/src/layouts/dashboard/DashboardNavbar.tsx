import { CarRepair } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import AccountPopover from './AccountPopover';
import { navItems } from './data/navItems';

type Props = { handleDrawerToggle: VoidFunction };

const LEGEND = 'J & G';

const DashboardNavbar: React.FC<Props> = ({ handleDrawerToggle }) => {
  const isMobile = useResponsive('down', 'sm');

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: { xs: 'space-between' } }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          display="flex"
          alignItems="center"
          component={RouterLink}
          to="/"
          sx={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}
        >
          <CarRepair sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
            }}
          >
            {LEGEND}
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {navItems.map(({ path, label }) => (
              <Button
                key={path}
                component={RouterLink}
                to={path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 0 }}>
          <AccountPopover />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
