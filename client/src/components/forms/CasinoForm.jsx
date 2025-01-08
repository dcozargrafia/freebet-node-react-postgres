// components/CasinoForm.jsx
import { useState } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { formatDateToBackend } from '../../utils/date-utils';

function CasinoForm({ onAddCasino, bookmakers }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [bookmakerId, setBookmakerId] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear una nueva transacción
    const newCasino = {
      amount,
      date: formatDateToBackend(date),
      bookmaker_id: bookmakerId,
      info,
    };

    // Llamar a la función de callback para añadir la transacción
    onAddCasino(newCasino);

    // Reiniciar el formulario
    setAmount('');
    setDate('');
    setBookmakerId('');
    setInfo('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Nueva operación de casino
      </Typography>
      <TextField
        label="Fecha"
        variant="outlined"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      <FormControl variant="outlined" required>
        <InputLabel id="bookmaker-select-label">Bookmaker</InputLabel>
        <Select
          labelId="bookmaker-select-label"
          value={bookmakerId}
          onChange={(e) => setBookmakerId(e.target.value)}
          label="Casa de apuestas"
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
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        required
      />
      <TextField
        label="Información"
        variant="outlined"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary">
        Añadir
      </Button>
    </form>
  );
}

export default CasinoForm;