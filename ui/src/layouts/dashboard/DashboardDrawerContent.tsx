import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { navItems } from './data/navItems';
import { Link as RouterLink } from 'react-router-dom';

type Props = { handleDrawerToggle: VoidFunction };

const DashboardDrawerContent: React.FC<Props> = ({ handleDrawerToggle }) => (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    <Typography variant="h6" sx={{ my: 2 }}>
      MUI
    </Typography>
    <Divider />
    <List>
      {navItems.map(({ path, label }) => (
        <ListItem key={path} disablePadding>
          <ListItemButton
            component={RouterLink}
            to={path}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default DashboardDrawerContent;
