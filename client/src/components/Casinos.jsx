import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import { formatDate } from '../utils/date-utils';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Casinos() {
  const [casinos, setCasinos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/casinos`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('La API no devolvió un arreglo');
        }
        console.log('Datos de la API:', data); // Revisión de los datos obtenidos
        
        // Asegúrate de que cada fila tenga un campo `date`
        const validatedData = data.map(row => ({
          ...row,
          date: row.date || null, // Si falta `date`, establece `null`
        }));

        console.log('Datos procesados antes de asignar al estado:', validatedData);
  
        setCasinos(validatedData);
      } catch (error) {
        console.error('Error fetching casino operations:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  }


  // Define las columnas para el DataGrid
  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 70 
    },
    // { field: 'date', headerName: 'Fecha', width: 100 },
    { 
      field: 'date', 
      headerName: 'Fecha', 
      width: 130, 
      valueFormatter: (params) => {
        if (!params?.value) {
          console.warn('Campo "date" indefinido en fila:', params?.row || 'Fila no disponible');
          return 'Fecha no disponible';
        }
        return formatDate(params.value);
      },
      
    },    
    { 
      field: 'bookmaker_id', 
      headerName: 'Casa', 
      width: 150 
    },
    { 
      field: 'amount', 
      headerName: 'Importe', 
      width: 100 
    },
    { 
      field: 'info', 
      headerName: 'Info', 
      width: 200 
    },
  ];

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Operaciones de Casino
      </Typography>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={casinos}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ 
            border: 0,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            }
          }}
        />
      </Paper>
    </div>
  );
}

export default Casinos;