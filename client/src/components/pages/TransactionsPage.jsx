// TransactionsPage.jsx
import { useState, useEffect } from 'react';
import TransactionsTable from '../tables/TransactionsTable';
import { CircularProgress } from '@mui/material';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';


const TransactionsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <TransactionsTable 
          data={data} 
          onDataChange={fetchData} // Pasamos la función para refrescar los datos
        />
      )}
    </div>
  );
};


export default TransactionsPage;