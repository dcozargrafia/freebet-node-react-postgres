// Bets.jsx
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { formatDate } from '../utils/date-utils';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Bets() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${URL}/bets`);
      const data = await res.json();
      setBets(data);
    };
    
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Bets
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Casa</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Extra</TableCell>
              <TableCell>F.evento</TableCell>
              <TableCell>Evento</TableCell>
              <TableCell>Apuesta</TableCell>
              <TableCell>Importe</TableCell>
              <TableCell>Cuota</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Riesgo</TableCell>
              <TableCell>Resultado</TableCell>
              <TableCell>Par</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bets.map((bet) => (
              <TableRow key={bet.id}>
                <TableCell>{bet.id}</TableCell>
                <TableCell>{formatDate(bet.date)}</TableCell>
                <TableCell>{bet.bookmaker_id}</TableCell>
                <TableCell>{bet.type}</TableCell>
                <TableCell>{bet.extra}</TableCell>
                <TableCell>{formatDate(bet.event_date)}</TableCell>
                <TableCell>{bet.event}</TableCell>
                <TableCell>{bet.bet}</TableCell>
                <TableCell>{bet.stake}</TableCell>
                <TableCell>{bet.odds}</TableCell>
                <TableCell>{bet.status}</TableCell>
                <TableCell>{bet.liability}</TableCell>
                <TableCell>{bet.result}</TableCell>
                <TableCell>{bet.id_par}</TableCell>
                <TableCell>{bet.info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Bets;