// components/TransactionForm.jsx
import { useEffect, useRef, useState } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Autocomplete, useRadioGroup } from '@mui/material';
import { formatDateToBackend } from '../../utils/date-utils';
import { handleKeyDown } from '../../utils/handleKeyDown';


function TransactionForm({ onAddTransaction, bookmakers }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [bookmakerId, setBookmakerId] = useState('');
  const [type, setType] = useState('');
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
    const newTransaction = {
      amount,
      date: formatDateToBackend(date),
      bookmaker_id: bookmakerId,
      type,
      info,
    };

    // Llamar a la función de callback para añadir la transacción
    onAddTransaction(newTransaction);

    // Reiniciar el formulario
    setAmount('');
    setDate('');
    setBookmakerId('');
    setType('');
    setInfo('');
  };

  const handleWheel = (event) => {   
    event.target.blur(); 
  };

  const typeOptions = [
    { 
      label: 'Depósito',
      value: 'deposit'
    },
    {
      label: 'Retiro',
      value: 'withdrawal'
    }
  ];

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Nueva Transacción
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
        onWheel={handleWheel}   
        onKeyDown={(e) => handleKeyDown(e, 0.1, setAmount, amount)}   
        type="number"
        required
      />
      
      <Autocomplete
        options={typeOptions}
        getOptionLabel={(option) => option.label}
        value={typeOptions.find((option) => option.value === type) || null}
        onChange={(event, newValue) => {
          setType(newValue ? newValue.value : '');
        }}
        renderInput={(params) => <TextField 
                                    {...params} 
                                    label="Tipo" 
                                    variant="outlined" 
                                    required  
                                  />}
        isOptionEqualToValue={(option, value) => option.value === value.value}
      />
      <TextField
        label="Información"
        variant="outlined"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        multiline
        rows={2}
      />
      <Button type="submit" variant="contained" color="primary">
        Añadir
      </Button>
    </form>
  );
}

export default TransactionForm;