import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsersDataGridToolbar: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('crear');
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
      <GridToolbar />
      <Button color='primary' startIcon={<AddIcon />} onClick={handleCreateClick}>
        Crear usuario
      </Button>
    </GridToolbarContainer>
  );
};

export default UsersDataGridToolbar;
