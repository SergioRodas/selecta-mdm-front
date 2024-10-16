import axios from 'axios';

import useAuthStore from '../../store/authStore.js';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchDocuments = async () => {
  const { token } = useAuthStore.getState();
  const requestUrl = `${API_URL}/FilterDoc`;
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
  const requestUrl = `${API_URL}/documents`;

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
  let requestUrl = `${API_URL}/FilterDocDetails/${documentId}`;
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
  const urlGetStyles = `${API_URL}/document/styles`;

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
