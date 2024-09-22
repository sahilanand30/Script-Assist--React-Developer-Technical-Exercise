// src/store/authStore.ts
import create from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('auth'),
  login: () => {
    localStorage.setItem('auth', 'true');
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth');
    set({ isAuthenticated: false });
  },
}));
