// AddTransactionForm.jsx
import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { formatDateToBackend } from '../utils/date-utils';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function AddTransactionForm({ onTransactionAdded }) {
  const [formData, setFormData] = useState({
    date: '',
    bookmaker_id: '',
    amount: '',
    info: '',
    type: '',
  });

  const [bookmakers, setBookmakers] = useState([]);

  useEffect(() => {
    const fetchBookmakers = async () => {
      try {
        const response = await fetch(`${URL}/bookmakers`);
        const data = await response.json();
        setBookmakers(data);
      } catch (error) {
        console.error('Error fetching bookmakers:', error);
      }
    };

    fetchBookmakers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date: formatDateToBackend(formData.date),
    };

    try {
      const response = await fetch(`${URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      if (response.ok) {
        alert('Transaction added successfully!');
        setFormData({
          date: '',
          bookmaker_id: '',
          amount: '',
          info: '',
          type: '',
        });
        onTransactionAdded();
      } else {
        alert('Failed to add transaction.');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('An error occurred while adding the transaction.');
    }
  };

  return (
    <Paper style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Nueva Transacción
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Fecha"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Casa de apuestas</InputLabel>
          <Select
            name="bookmaker_id"
            value={formData.bookmaker_id}
            onChange={handleChange}
          >
            {bookmakers.map((bookmaker) => (
              <MenuItem key={bookmaker.id} value={bookmaker.id}>
                {bookmaker.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Importe"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Tipo</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value="deposit">Depósito</MenuItem>
            <MenuItem value="withdrawal">Retiro</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Info"
          name="info"
          value={formData.info}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Add Transaction
        </Button>
      </form>
    </Paper>
  );
}

export default AddTransactionForm;