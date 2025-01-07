// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Bets from './components/Bets';
import Bookmakers from './components/Bookmakers';
import Casinos from './components/Casinos';
import Transactions from './components/Transactions';

import './App.css';


const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function App() {
  const [result, setResult] = useState('');

  return (
    <Router>
      <div className='App'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              FREEBET APP
            </Typography>
            <Button color="inherit" component={Link} to="/bets">Bets</Button>
            <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
            <Button color="inherit" component={Link} to="/bookmakers">Bookmakers</Button>
            <Button color="inherit" component={Link} to="/casinos">Casinos</Button>
          </Toolbar>
        </AppBar>

        <Routes>

          <Route path="/bets" element={<Bets />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/bookmakers" element={<Bookmakers />} />
          <Route path="/casinos" element={<Casinos />} />
        </Routes>
      </div>
    </Router>
  );
}






export default App;