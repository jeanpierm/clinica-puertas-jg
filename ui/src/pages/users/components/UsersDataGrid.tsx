import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Tooltip } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowsProp,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../../../services/users';
import { UserRowProps } from '../../../models/user';
import UsersDataGridToolbar from './UsersDataGridToolbar';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100, 1000];
const PAGE_SIZE = ROWS_PER_PAGE_OPTIONS[0];

const UsersDataGrid: React.FC = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [rows, setRows] = useState<GridRowsProp<UserRowProps>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const rows: UserRowProps[] = users.map(({ id, name, surname, email, roleNames }) => ({
        id,
        name,
        surname,
        email,
        roleNames,
        password: '****',
        isNew: false,
      }));
      setRows(rows);
    }
  }, [isLoading, users]);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`editar/${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    navigate(`crear/${id}`);
  };

  const columns: GridColumns = [
    {
      field: 'id',
      type: 'number',
      headerName: 'ID',
      width: 75,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      editable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'surname',
      headerName: 'Apellido',
      editable: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Correo',
      editable: true,
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'roleNames',
      type: 'singleSelect',
      headerName: 'Roles',
      editable: true,
      minWidth: 200,
      flex: 1,
      valueOptions: [{ label: 'Administrador', value: 'ROLE_ADMIN' }],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={0}
            icon={
              <Tooltip title='Editar'>
                <EditIcon />
              </Tooltip>
            }
            label='Edit'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={1}
            icon={
              <Tooltip title='Eliminar'>
                <DeleteIcon />
              </Tooltip>
            }
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='error'
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: '100%',
        }}
      >
        <DataGrid
          loading={isLoading}
          rows={rows}
          isCellEditable={() => false}
          isRowSelectable={() => false}
          columns={columns}
          editMode='row'
          pageSize={pageSize}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageSizeChange={handlePageSizeChange}
          components={{
            Toolbar: UsersDataGridToolbar,
          }}
        />
      </Box>
    </>
  );
};

export default UsersDataGrid;
