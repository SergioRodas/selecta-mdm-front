import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('authToken') || null,
  profile: null,

  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  },

  setProfile: (profile) => set({ profile }),

  logout: () => {
    set({ token: null, profile: null });
    localStorage.removeItem('authToken');
  },
}));

export default useAuthStore;
