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
import { UserMessages } from '../../../constants/messages';
import { useAuth } from '../../../contexts/AuthContext';
import { RoleName } from '../../../models/role';
import { UserRowProps } from '../../../models/user';
import { notification } from '../../../redux/slices/notificationSlice';
import { useAppDispatch } from '../../../redux/store';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../services/users';
import { UsersAdapter } from '../adapters/UsersAdapter';
import { resolveRoleName } from '../utils/resolveRoleName';
import UsersDataGridToolbar from './UsersDataGridToolbar';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100, 1000];
const PAGE_SIZE = ROWS_PER_PAGE_OPTIONS[0];

const UsersDataGrid: React.FC = () => {
  const { currentUser } = useAuth();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: isLoadingDelete, isSuccess: isSuccessDelete }] =
    useDeleteUserMutation();
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [rows, setRows] = useState<GridRowsProp<UserRowProps>>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading) {
      const rows: UserRowProps[] = users.map(UsersAdapter.row);
      setRows(rows);
    }
  }, [isLoading, users]);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`editar/${id}`);
  };

  const handleDeleteClick = (id: GridRowId, row: any) => () => {
    const isSameUser = currentUser.id.toString() === id.toString();
    if (isSameUser) {
      alert(
        'No se puede eliminar a si mismo desde su propia cuenta. Por favor, ingrese con una cuenta ADMINISTRADOR diferente e inténtelo nuevamente.',
      );
      return;
    }
    const confirmValue = confirm(
      `¿Está seguro de eliminar al usuario: ${id} - ${row.name} ${row.surname}?`,
    ).valueOf();
    if (!confirmValue) return;
    deleteUser(id.toString());
  };

  useEffect(() => {
    if (isSuccessDelete) {
      dispatch(notification({ message: UserMessages.delete, severity: 'success' }));
    }
  }, [isSuccessDelete, dispatch]);

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
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'surname',
      headerName: 'Apellido',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Correo',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'roleNames',
      headerName: 'Roles',
      type: 'string',
      minWidth: 200,
      flex: 1,
      valueGetter(params) {
        const values = params.value as RoleName[];
        return values.map(resolveRoleName).join(', ');
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
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
            onClick={handleDeleteClick(id, row)}
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
          width: '100%',
        }}
      >
        <DataGrid
          loading={isLoading || isLoadingDelete}
          rows={rows}
          isCellEditable={() => false}
          isRowSelectable={() => false}
          columns={columns}
          editMode='row'
          autoHeight
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
