import axios from 'axios';

export const fetchCartoons = async () => {
  const urlGetCartoons = 'http://localhost:4002/api/v1/Cartones';

  try {
    const response = await axios.get(urlGetCartoons);
    return response.data;
  } catch (error) {
    console.error('Error fetching cartoons:', error);
    throw error;
  }
};
