// BetsPage.jsx
import { useState, useEffect } from 'react';
import BetsTable from '../tables/BetsTable';
import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import NavBar from '../common/NavBar';
import BetForm from '../forms/BetForm';
import { useBookmakers } from '../../hooks/useBookmakers';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


const BetsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Usa el hook personalizado para obtener los bookmakers
  const { bookmakers, loading: loadingBookmakers } = useBookmakers();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/bets`);
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

  const addBet = async (bet) => {
    console.log(JSON.stringify(bet));
    try {
      const response = await fetch(`${URL}/bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bet),
      });
      if (response.ok) {
        fetchData();
        handleClose();
      } else {
        console.error('Error al añadir la apuesta');
      }
    } catch (error) {
      console.error('Error al añadir la apuesta: ', error);      
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
            Añadir Apuesta
          </Button>
          <BetsTable 
            data={data} 
            onDataChange={fetchData} // Pasamos la función para refrescar los datos
          />
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Añadir Apuesta</DialogTitle>
            <DialogContent>
              {loadingBookmakers ? (
                <CircularProgress />
              ) : (
                <BetForm onAddBet={addBet} bookmakers={bookmakers} />
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


export default BetsPage;