import { format } from 'date-fns'

  // Función para formatear la fecha
export const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

export function formatDateToBackend(dateString) {  
const [year, month, day] = dateString.split('-');  
return `${year}-${month}-${day}`;
}