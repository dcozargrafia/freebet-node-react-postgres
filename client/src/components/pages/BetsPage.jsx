// CasinosPage.jsx
import { useState, useEffect } from 'react';
import BetsTable from '../tables/BetsTable';
import { CircularProgress } from '@mui/material';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


const BetsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <BetsTable 
          data={data} 
          onDataChange={fetchData} // Pasamos la función para refrescar los datos
        />
      )}
    </div>
  );
};


export default BetsPage;