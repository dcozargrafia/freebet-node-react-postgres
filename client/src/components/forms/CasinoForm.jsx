// components/CasinoForm.jsx
import { useEffect, useRef, useState } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Autocomplete } from '@mui/material';
import { formatDateToBackend } from '../../utils/date-utils';

function CasinoForm({ onAddCasino, bookmakers }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [bookmakerId, setBookmakerId] = useState('');
  const [info, setInfo] = useState('');


  const dateInputRef = useRef(null);
  
  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.focus()
    }
  }, []);

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
        inputRef={dateInputRef}
      />
      <Autocomplete
        options={bookmakers}
        getOptionLabel={(option) => option.name}
        value={bookmakers.find((bookmaker) => bookmaker.id === bookmakerId) || null}
        onChange={(event, newValue) => {
          setBookmakerId(newValue ? newValue.id : '');
        }}
        renderInput={(params) => <TextField 
                                    {...params} 
                                    label="Casa de apuestas" 
                                    variant="outlined" 
                                    required  
                                  />}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
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