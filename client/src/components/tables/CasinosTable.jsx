// components/CasinosTable.jsx
import { usePagination } from '../../hooks/usePagination';
import { useBookmakers } from '../../hooks/useBookmakers';


import React, { useState } from 'react';
import { formatDate } from '../../utils/date-utils';
import DataTable from '../common/DataTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const CasinosTable = ({ data, onDataChange }) => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { getBookmakerName } = useBookmakers();
  const [ deleteDialog, setDeleteDialog ] = useState( {
    open: false,
    row: null
  });
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);


  const handleEdit = (row) => {
    console.log('Editar', row);
  };

  const handleDeleteClick = (row) => {
    setDeleteDialog({ open: true, row });
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${URL}/casinos/${deleteDialog.row.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting casino operation');
      }
      
      // Cierra el diálogo
      setDeleteDialog({ open: false, row: null });

      // Refresca los datos
      if (onDataChange) {
        onDataChange();
      }

    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setLoading(false);
    }
  };

  const tableActions = [
    {
      name: 'Editar',
      icon: <EditIcon  />,
      onClick: handleEdit,
      color: 'primary',
    },
    {
      name: 'Borrar',
      icon: <DeleteIcon />,
      onClick: handleDeleteClick,
      color: 'error',
    },
  ];

  const columns = [
    { id: 'id', label: 'ID', width: '5%', align: 'center' },
    { id: 'date', label: 'Fecha', width: '10%', align: 'center' },
    { id: 'bookmaker_id', label: 'Casa de apuestas', width: '30%', align: 'center' },
    { id: 'amount', label: 'Importe', width: '8%', align: 'center' },
    { id: 'info', label: 'Información', width: '20%', align: 'center' }
  ];

  const renderCell = (row, columnId) => {
    switch (columnId) {
      case 'date':
        return formatDate(row.date);
      case 'bookmaker_id':
        return getBookmakerName(row.bookmaker_id);
      default:
        return row[columnId];
    }
  };

  return (
    <>
      <DataTable
        title="Operaciones de casino"
        data={data}
        columns={columns}
        renderCell={renderCell}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        actions={tableActions}
      />

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, row: null })}
      >
        <DialogTitle>Confirmar borrado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres borrar este registro?
            {error && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                {error}
              </p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, row: null })}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            autoFocus
            disabled={loading}
          >
            {loading ? 'Borrando...' : 'Borrar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CasinosTable;