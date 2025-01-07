// Casinos.jsx
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { formatDate } from '../utils/date-utils';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Casinos() {
  const [casinos, setCasinos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${URL}/casinos`);
      const data = await res.json();
      setCasinos(data);
    };
    
    fetchData();
  }, []);

  return (
    <div>
        <Typography variant="h5" gutterBottom>
            Casino
        </Typography>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Casa</TableCell>
                <TableCell>Importe</TableCell>
                <TableCell>Info</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {casinos.map((casino) => (
                <TableRow key={casino.id}>
                <TableCell>{casino.id}</TableCell>
                <TableCell>{formatDate(casino.date)}</TableCell>
                <TableCell>{casino.bookmaker_id}</TableCell>
                <TableCell>{casino.amount}</TableCell>
                <TableCell>{casino.info}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

export default Casinos;