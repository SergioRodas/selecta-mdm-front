import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCartoons = async () => {
  const urlGetCartoons = `${API_URL}/Cartones`;

  try {
    const response = await axios.get(urlGetCartoons);
    return response.data;
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    throw error;
  }
};
