// Transactions.jsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
// import { formatDate } from '../utils/date-utils';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function Transactions({ transactions }) {
  return (
    <div>
        <Typography variant="h5" gutterBottom>
            Transacciones
        </Typography>        
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Casa</TableCell>
                <TableCell>Importe</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Info</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.bookmaker_id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.info}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}

export default Transactions;