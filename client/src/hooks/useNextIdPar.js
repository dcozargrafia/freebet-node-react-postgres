import { useState, useEffect } from 'react';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const useNextIdPar = () => {
  const [nextIdPar, setNextIdPar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNextIdPar = async () => {
      try {
        const response = await fetch(`${URL}/bets/next-idPar`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNextIdPar(data.nextIdPar); // Asegúrate de que el nombre es correcto

      } catch (error) {
        setError(error);
        console.error('Error al obtener el siguiente idPar:', error);
      }
    };

    fetchNextIdPar();
  }, []);

  return { nextIdPar, error }; // Asegúrate de devolver estos valores
};