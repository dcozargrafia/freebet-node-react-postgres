// hooks/useBookmakers.js
import { useState, useEffect } from 'react';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const useBookmakers = () => {
  const [bookmakers, setBookmakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmakers = async () => {
      try {
        const response = await fetch(`${URL}/bookmakers`);
        const data = await response.json();
        setBookmakers(data);
      } catch (error) {
        console.error('Error al cargar bookmakers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmakers();
  }, []);

  const getBookmakerName = (bookmaker_id) => {
    const bookmaker = bookmakers.find(b => b.id === bookmaker_id);
    return bookmaker ? bookmaker.name : 'Desconocido';
  };

  return { bookmakers, loading, getBookmakerName };
};