// CasinosPage.jsx
import { useState, useEffect } from 'react';
import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CasinosTable from '../tables/CasinosTable';
import NavBar from '../common/NavBar';
import CasinoForm from '../forms/CasinoForm'; 
import { useBookmakers } from '../../hooks/useBookmakers'; // Importa tu hook personalizado para obtener bookmakers

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const CasinosPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Usa el hook personalizado para obtener los bookmakers
  const { bookmakers, loading: loadingBookmakers } = useBookmakers();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/casinos`);
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

  const addCasino = async (casino) => {
    try {
      const response = await fetch(`${URL}/casinos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(casino),
      });
      if (response.ok) {
        fetchData(); // Refresca los datos después de añadir una operación de casino
        handleClose(); // Cierra el modal
      } else {
        console.error('Error al añadir la operación');
      }
    } catch (error) {
      console.error('Error al añadir la operación:', error);
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
            Añadir Operación de Casino
          </Button>
          <CasinosTable 
            data={data} 
            onDataChange={fetchData} // Pasamos la función para refrescar los datos
          />
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Añadir Operación de Casino</DialogTitle>
            <DialogContent>
              {loadingBookmakers ? (
                <CircularProgress />
              ) : (
                <CasinoForm onAddCasino={addCasino} bookmakers={bookmakers} />
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

export default CasinosPage;