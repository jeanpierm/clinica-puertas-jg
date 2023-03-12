import AddIcon from '@mui/icons-material/Add';
import { Box, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UsersDataGridToolbar: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('crear');
  };

  return (
    <>
      <GridToolbarContainer
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            '& hr': {
              mx: 1.5,
            },
          }}
        >
          <Button
            color='primary'
            sx={{ fontSize: '0.8125rem' }}
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Crear Usuario
          </Button>
          <Divider orientation='vertical' variant='middle' flexItem />
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    </>
  );
};

export default UsersDataGridToolbar;
