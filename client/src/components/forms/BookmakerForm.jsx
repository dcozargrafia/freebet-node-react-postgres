// components/BookmakerForm.jsx
import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Autocomplete } from '@mui/material';
import { handleKeyDown } from '../../utils/handleKeyDown';

function BookmakerForm({ onAddBookmaker, bookmakers }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [commission, setCommission] = useState('');
  const [info, setInfo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [adjustment, setAdjustment] = useState('');

  const nameInputRef = useRef(null);
  
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear una nueva casa de apuestas
    const newBookmaker = {
      name,
      type,
      commission,
      info,
      initial_balance: initialBalance,
      adjustment,
      username,
      password
    };

    // Llamar a la función de callback para añadir la transacción
    onAddBookmaker(newBookmaker);

    // Reiniciar el formulario
    setName('');
    setType('');
    setCommission('');
    setInfo('');
    setInitialBalance('');
    setAdjustment('');
    setUsername('');
    setPassword('');
  };

  const handleWheel = (event) => {   
    event.target.blur(); 
  };

  const typeOptions = [
    { 
      label: 'Normal',
      value: 'regular'
    },
    {
      label: 'Exchange',
      value: 'exchange'
    }
  ];

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Nueva Casa de apuestas
      </Typography>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
        inputRef={nameInputRef}
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
        label="Comisión"
        variant="outlined"
        value={commission}
        onChange={(e) => setCommission(e.target.value)}
        onWheel={handleWheel}
        onKeyDown={(e) => handleKeyDown(e, 0.1, setCommission, commission)}
        type="number"
        required
      />
      <TextField
        label="Saldo inicial"
        variant="outlined"
        value={initialBalance}
        onChange={(e) => setInitialBalance(e.target.value)}
        onWheel={handleWheel}
        type="number"
        onKeyDown={(e) => handleKeyDown(e, 1, setInitialBalance, initialBalance)}
        required
      />
      <TextField
        label="Ajuste"
        variant="outlined"
        value={adjustment}
        onChange={(e) => setAdjustment(e.target.value)}
        onWheel={handleWheel}
        onKeyDown={(e) => handleKeyDown(e, 1, setAdjustment, adjustment)}
        type="number"
        required
      />
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
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

export default BookmakerForm;