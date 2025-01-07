// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import BetsPage from './components/pages/BetsPage';
import BookmakersPage from './components/pages/BookmakersPage';
import CasinosPage from './components/pages/CasinosPage';
import TransactionsPage from './components/pages/TransactionsPage';


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

          <Route path="/bets" element={<BetsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/bookmakers" element={<BookmakersPage />} />
          <Route path="/casinos" element={<CasinosPage />} />
        </Routes>
      </div>
    </Router>
  );
}






export default App;