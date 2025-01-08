// pages/Homepage.jsx

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a FREEBET APP
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/bets" style={{ margin: '10px' }}>
        Bets
      </Button>
      <Button variant="contained" color="primary" component={Link} to="/transactions" style={{ margin: '10px' }}>
        Transactions
      </Button>
      <Button variant="contained" color="primary" component={Link} to="/bookmakers" style={{ margin: '10px' }}>
        Bookmakers
      </Button>
      <Button variant="contained" color="primary" component={Link} to="/casinos" style={{ margin: '10px' }}>
        Casinos
      </Button>
    </div>
  );
}

export default HomePage;