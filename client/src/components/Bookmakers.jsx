// Bookmakers.jsx
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Bookmakers() {
  const [bookmakers, setBookmakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${URL}/bookmakers`);
      const data = await res.json();
      setBookmakers(data);
    };
    
    fetchData();
  }, []);

  return (
    <div>
        <Typography variant="h5" gutterBottom>
            Casas de apuestas
        </Typography>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Comisión</TableCell>
                <TableCell>info</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {bookmakers.map((bookmaker) => (
                <TableRow key={bookmaker.id}>
                <TableCell>{bookmaker.id}</TableCell>
                <TableCell>{bookmaker.name}</TableCell>
                <TableCell>{bookmaker.type}</TableCell>
                <TableCell>{bookmaker.commission}</TableCell>
                <TableCell>{bookmaker.info}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

export default Bookmakers;