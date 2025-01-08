// App.jsx

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BetsPage from './components/pages/BetsPage';
import BookmakersPage from './components/pages/BookmakersPage';
import CasinosPage from './components/pages/CasinosPage';
import TransactionsPage from './components/pages/TransactionsPage';
import HomePage from './components/pages/HomePage';

import './App.css';





const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
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