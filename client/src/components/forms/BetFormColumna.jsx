// components/BetForm.jsx
import { useEffect, useRef, useState } from 'react';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Autocomplete, useRadioGroup } from '@mui/material';
import { formatDateToBackend } from '../../utils/date-utils';
import { handleKeyDown } from '../../utils/handleKeyDown';


function BetForm({ onAddBet, bookmakers }) {
  const [date, setDate] = useState('');
  const [bookmakerId, setBookmakerId] = useState('');
  const [type, setType] = useState('');
  const [extra, setExtra] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [event, setEvent] = useState('');
  const [bet, setBet] = useState('');
  const [stake, setStake] = useState('');
  const [odds, setOdds] = useState('');
  const [status, setStatus] = useState('pending');
  const [idPar, setIdPar] = useState('');
  const [info, setInfo] = useState('');


  const bookmakerInputRef = useRef(null);
  
  useEffect(() => {
    if (bookmakerInputRef.current) {
      bookmakerInputRef.current.focus();
    }
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setEventDate(today);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedExtra = extra === '' ? null : extra;
    // Crear una nueva transacción
    const newBet = {
        date: formatDateToBackend(date),
        bookmaker_id: bookmakerId,
        type,
        extra: formattedExtra,
        event_date: formatDateToBackend(eventDate),
        event,
        bet,
        stake,
        odds,
        status,
        id_par: idPar,
        info,
    };

    // Llamar a la función de callback para añadir la transacción
    onAddBet(newBet);

    // Reiniciar el formulario
    setDate('');
    setBookmakerId('');
    setType('');
    setExtra('');
    setEventDate('');
    setEvent('');
    setBet('');
    setStake('');
    setOdds('');
    setStatus('');
    setIdPar('');
    setInfo('');
  };

  const handleWheel = (event) => {   
    event.target.blur(); 
  };

  const typeOptions = [
    { 
      label: 'Backbet',
      value: 'backbet'
    },
    {
      label: 'Laybet',
      value: 'laybet'
    },
    {
      label: 'Freebet',
      value: 'freebet',
    },
  ];

  const extraOptions = [
    {
      label: 'Dorada',
      value: 'dorada',
    },
    {
      label: 'Plateada',
      value: 'plateada',
    },
    {
      label: 'SuperAumento',
      value: 'superaumento',
    },
    {
      label: 'Flash',
      value: 'flash',
    },
    {
      label: '25% Aumento',
      value: '25% aumento',
    },
    {
      label: '30% Aumento',
      value: '30% aumento',
    },
    {
      label: 'Aumento Cuota',
      value: 'aumento cuota',
    },
    {
      label: 'Profit Boost',
      value: 'profit boost',
    },
  ];

  const statusOptions = [
    {
      label: 'Ganada',
      value: 'won',
    },
    {
      label: 'Perdida',
      value: 'lost',
    },
    {
      label: 'Pendiente',
      value: 'pending',
    },
  ];

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Nueva Apuesta
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
        inputRef={bookmakerInputRef}
        isOptionEqualToValue={(option, value) => option.id === value.id}
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
      <Autocomplete
        options={extraOptions}
        getOptionLabel={(option) => option.label}
        value={extraOptions.find((option) => option.value === extra) || null}
        onChange={(event, newValue) => {
          setExtra(newValue ? newValue.value : '');
        }}
        renderInput={(params) => <TextField 
                                    {...params} 
                                    label="Extra" 
                                    variant="outlined" 
                                  />}
        isOptionEqualToValue={(option, value) => option.value === value.value}
      />
      <TextField
        label="Fecha Evento"
        variant="outlined"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        type="date"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Evento"
        variant="outlined"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      />
      <TextField
        label="Apuesta"
        variant="outlined"
        value={bet}
        onChange={(e) => setBet(e.target.value)}
      />
      <TextField
        label="Importe"
        variant="outlined"
        value={stake}
        onChange={(e) => setStake(e.target.value)}
        onWheel={handleWheel}   
        onKeyDown={(e) => handleKeyDown(e, 1, setStake, stake)}   
        type="number"
        required
      />
      <TextField
        label="Cuota"
        variant="outlined"
        value={odds}
        onChange={(e) => setOdds(e.target.value)}
        onWheel={handleWheel}   
        onKeyDown={(e) => handleKeyDown(e, 0.1, setOdds, odds)}   
        type="number"
        required
      />
      <Autocomplete
        options={statusOptions}
        getOptionLabel={(option) => option.label}
        value={statusOptions.find((option) => option.value === status) || null}
        onChange={(event, newValue) => {
          setStatus(newValue ? newValue.value : '');
        }}
        renderInput={(params) => <TextField 
                                    {...params} 
                                    label="Estado" 
                                    variant="outlined" 
                                    required  
                                  />}
        isOptionEqualToValue={(option, value) => option.value === value.value}
      />
      <TextField
        label="MB"
        variant="outlined"
        value={idPar}
        onChange={(e) => setIdPar(e.target.value)}
        onWheel={handleWheel}   
        onKeyDown={(e) => handleKeyDown(e, 1, setIdPar, idPar)}   
        type="number"
        required
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

export default BetForm;