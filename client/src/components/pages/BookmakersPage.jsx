// BookmakersPage.jsx
import { useState, useEffect } from 'react';
import BookmakersTable from '../tables/BookmakersTable';
import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import NavBar from '../common/NavBar';
import BookmakerForm from '../forms/BookmakerForm';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


const BookmakersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/bookmakers`);
      const jsonData = await response.json();
      console.log(jsonData);
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

  const handleClickOPen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addBookmaker = async (bookmaker) => {
    console.log(JSON.stringify(bookmaker));
    try {
      const response = await fetch(`${URL}/bookmakers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookmaker),
      });
      if (response.ok) {
        fetchData(); 
        handleClose();
      } else {
        console.error('Error al añadir la casa de apuestas');
      }
    } catch (error) {
      console.error('Error al añadir la casa de apuestas:', error);
    }
  }

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <NavBar />
          <Button variant="outlined" color="primary" onClick={handleClickOPen} style={{ margin: '20px' }}>
            Añadir Casa de apuestas
          </Button>
          <BookmakersTable 
            data={data} 
            onDataChange={fetchData} // Pasamos la función para refrescar los datos
          />
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Añadir Casa de apuestas</DialogTitle>
            <DialogContent>
              <BookmakerForm onAddBookmaker={addBookmaker} />
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


export default BookmakersPage;