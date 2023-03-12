import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupsIcon from '@mui/icons-material/Groups';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const items = [
  {
    label: 'Ventas',
    path: '/ventas',
    icon: <SellIcon />,
  },
  {
    label: 'Compras',
    path: '/compras',
    icon: <ShoppingCartIcon />,
  },
  {
    label: 'Proveedores',
    path: '/proveedores',
    icon: <GroupsIcon />,
  },
];

export const mainListItem = (
  <>
    <List
      subheader={
        <ListSubheader component='div' inset>
          Principal
        </ListSubheader>
      }
    >
      {items.map(({ path, label, icon }) => (
        <ListItem key={path} disablePadding>
          <ListItemButton component={RouterLink} to={path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </>
);
