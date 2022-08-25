import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import {
  useCreateUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../../services/users';
import { useAppDispatch } from '../../../redux/store';
import {
  createUserNotification,
  errorNotification,
  updateUserNotification,
} from '../../../redux/slices/notificationSlice';
import { UserRowProps } from '../../../models/user';
import UsersDataGridToolbar from './UsersDataGridToolbar';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100, 1000];
const PAGE_SIZE = ROWS_PER_PAGE_OPTIONS[0];

const UsersDataGridCrudDemo: React.FC = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [rows, setRows] = useState<GridRowsProp<UserRowProps>>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const dispatch = useAppDispatch();

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

  const handleRowEditStart: GridEventListener<'rowEditStart'> = (_params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (_params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (currentRow: GridRowModel<UserRowProps>) => {
    // setRows(rows.map((row) => (row.id === currentRow.id ? updatedRow : row)));
    if (currentRow.isNew) {
      createUser({ ...currentRow, username: currentRow.email })
        .unwrap()
        .then(() => {
          dispatch(createUserNotification());
        })
        .catch((err) => {
          dispatch(errorNotification(err.data?.message));
          console.error(err);
        });
    } else {
      updateUser({ ...currentRow, username: currentRow.email })
        .unwrap()
        .then(() => {
          dispatch(updateUserNotification());
        })
        .catch((err) => {
          dispatch(errorNotification(err.data?.message));
          console.error(err);
        });
    }
    return currentRow;
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const columns: GridColumns = [
    {
      field: 'id',
      type: 'number',
      headerName: 'ID',
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      editable: true,
      width: 150,
    },
    {
      field: 'surname',
      headerName: 'Apellido',
      editable: true,
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Correo',
      editable: true,
      width: 200,
    },
    {
      field: 'roleNames',
      type: 'singleSelect',
      headerName: 'Roles',
      editable: true,
      width: 200,
      valueOptions: [{ label: 'Administrador', value: 'ROLE_ADMIN' }],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={0}
              icon={<SaveIcon />}
              label='Save'
              onClick={handleSaveClick(id)}
              color='inherit'
            />,
            <GridActionsCellItem
              key={1}
              icon={<CancelIcon />}
              label='Cancel'
              onClick={handleCancelClick(id)}
              // color='secondary'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={0}
            icon={<EditIcon />}
            label='Edit'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            key={1}
            icon={<DeleteIcon />}
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
        <Typography variant='h4' component='h1' sx={{ textAlign: 'left', mt: 3, mb: 3 }}>
          Administrar Usuarios
        </Typography>
        <DataGrid
          loading={isLoading || isUpdating || isCreating}
          rows={rows}
          columns={columns}
          editMode='row'
          pageSize={pageSize}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onPageSizeChange={handlePageSizeChange}
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: UsersDataGridToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </>
  );
};

export default UsersDataGridCrudDemo;
