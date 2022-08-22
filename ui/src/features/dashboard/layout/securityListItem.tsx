import { Group } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const items = [
  {
    label: 'Usuarios',
    path: '/usuarios',
    icon: <Group />,
  },
];

export const securityListItem = (
  <>
    <List
      subheader={
        <ListSubheader component="div" inset>
          Seguridad
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
