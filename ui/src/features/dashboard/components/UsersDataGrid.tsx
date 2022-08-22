import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useGetUsersQuery } from '../../../app/services/users';
import FullScreenLoader from '../../../components/FullScreenLoader';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Nombre' },
  { field: 'surname', headerName: 'Apellido' },
  { field: 'email', headerName: 'Correo' },
];

const UsersDataGrid: React.FC = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const rows: GridRowsProp = users.map(({ id, name, surname, email }) => ({
    id,
    name,
    surname,
    email,
  }));

  return (
    <>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
};

export default UsersDataGrid;
