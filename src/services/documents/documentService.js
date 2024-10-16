import axios from 'axios';

import useAuthStore from '../../store/authStore.js';

export const fetchDocuments = async () => {
  const { token } = useAuthStore.getState();
  const requestUrl = 'http://localhost:4002/api/v1/FilterDoc';
  try {
    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};

export const fetchDocumentName = async () => {
  const { token } = useAuthStore.getState();
  const requestUrl = 'http://localhost:4002/api/v1/documents';

  try {
    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Devuelve los datos
  } catch (error) {
    console.error('Error fetching document name:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const fetchDocumentDetails = async (documentId, selectedDate) => {
  const { token } = useAuthStore.getState();
  let requestUrl = `http://localhost:4002/api/v1/FilterDocDetails/${documentId}`;
  if (selectedDate) {
    requestUrl += `?date=${selectedDate}`;
  }

  try {
    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.details || {};
  } catch (error) {
    console.error('Error al obtener datos', error);
    throw error;
  }
};


export const fetchDocumentStyles = async (documentId, date) => {
  const { token } = useAuthStore.getState();
  const urlGetStyles = 'http://localhost:4002/api/v1/document/styles';

  try {
    const response = await axios.post(
      urlGetStyles,
      {
        documentId,
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting document styles:', error);
    return null;
  }
};
