import axios from 'axios';

import useAuthStore from '../../store/authStore.js';

export const login = async (email, password) => {
  const requestUrl = 'http://localhost:4002/api/v1/users/login';

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
