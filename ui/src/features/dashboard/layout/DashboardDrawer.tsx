import {
  Avatar,
  Box,
  Divider,
  Drawer,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import Logo from '../../../components/Logo';
import { useAuth } from '../../../contexts/AuthContext';
import useResponsive from '../../../hooks/useResponsive';
import { stringAvatar } from '../../../utils/stringAvatar';
import { mainListItem } from './mainListItem';
import { securityListItem } from './securityListItem';

type Props = { isDrawerOpen: boolean; handleDrawerToggle: VoidFunction };

export const DRAWER_WIDTH = 280;

// ----------------------------------------------------------------------

const RootStyle = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

const DashboardDrawer: React.FC<Props> = ({
  isDrawerOpen,
  handleDrawerToggle,
}) => {
  const isDesktop = useResponsive('up', 'lg');
  const { currentUser } = useAuth();
  const { displayName, roleNames } = currentUser;

  const content = (
    <Box>
      <Box sx={{ px: 2.5, py: 3, display: 'flex', justifyContent: 'center' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountStyle>
          <Avatar alt={displayName} {...stringAvatar(displayName)} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {roleNames[0]}
            </Typography>
          </Box>
        </AccountStyle>
      </Box>

      {mainListItem}
      <Divider />
      {securityListItem}
    </Box>
  );

  return (
    <RootStyle onClick={handleDrawerToggle}>
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {content}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {content}
        </Drawer>
      )}
    </RootStyle>
  );
};

export default DashboardDrawer;
