import axios from 'axios';

import useAuthStore from '../../store/authStore.js';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
  const requestUrl = `${API_URL}/users/login`;

  try {
    const response = await axios.post(requestUrl, { email, password });

    const { token, user } = response.data;

    const setToken = useAuthStore.getState().setToken;
    const setProfile = useAuthStore.getState().setProfile;

    setToken(token);
    setProfile(user);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
