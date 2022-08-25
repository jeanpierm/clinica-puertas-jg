import { Typography } from '@mui/material';
import UsersDataGrid from './components/UsersDataGrid';

const UsersPage: React.FC = () => {
  return (
    <>
      <Typography variant='h4' component='h1' sx={{ textAlign: 'left', my: 4 }}>
        Administración de Usuarios
      </Typography>
      <UsersDataGrid />
    </>
  );
};

export default UsersPage;
