import { Alarm, Lock, OpenInBrowser } from '@mui/icons-material';
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
    label: 'Seguros',
    path: '/seguros',
    icon: <Lock />,
  },
  {
    label: 'Elevadores',
    path: '/elevadores',
    icon: <OpenInBrowser />,
  },
  {
    label: 'Alarmas',
    path: '/alarmas',
    icon: <Alarm />,
  },
];

export const mainListItem = (
  <>
    <List
      subheader={
        <ListSubheader component='div' inset>
          Productos
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
