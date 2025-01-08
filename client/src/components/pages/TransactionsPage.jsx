// TransactionsPage.jsx
import { useState, useEffect } from 'react';
import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TransactionsTable from '../tables/TransactionsTable';
import NavBar from '../common/NavBar';
import TransactionForm from '../forms/TransactionForm';
import { useBookmakers } from '../../hooks/useBookmakers'; 

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const TransactionsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Usa el hook personalizado para obtener los bookmakers
  const { bookmakers, loading: loadingBookmakers } = useBookmakers();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/transactions`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTransaction = async (transaction) => {
    console.log(JSON.stringify(transaction));
    try {
      const response = await fetch(`${URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      if (response.ok) {
        fetchData(); // Refresca los datos después de añadir una transacción
        handleClose(); // Cierra el modal
      } else {
        console.error('Error al añadir la transacción');
      }
    } catch (error) {
      console.error('Error al añadir la transacción:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <NavBar />
          <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ margin: '20px' }}>
            Añadir Transacción
          </Button>
          <TransactionsTable 
            data={data} 
            onDataChange={fetchData} // Pasamos la función para refrescar los datos
          />
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Añadir Transacción</DialogTitle>
            <DialogContent>
              {loadingBookmakers ? (
                <CircularProgress />
              ) : (
                <TransactionForm onAddTransaction={addTransaction} bookmakers={bookmakers} />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default TransactionsPage;