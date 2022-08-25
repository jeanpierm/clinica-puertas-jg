import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { stringAvatar } from '../../../utils/stringAvatar';

const settings = ['Account', 'Dashboard'];

const AccountPopover = () => {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const { currentUser: account, logout: signOut } = useAuth();
  const displayName = `${account.name} ${account.surname}`;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    signOut();
  };

  return (
    <>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={displayName} {...stringAvatar(displayName)}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(open)}
        onClose={handleCloseUserMenu}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant='subtitle2' noWrap>
            {displayName}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider />

        <Stack>
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Stack>

        <Divider />

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AccountPopover;
