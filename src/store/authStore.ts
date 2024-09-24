import { create } from 'zustand';

interface User {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
  users: User[];
  error: string | null;
  signup: (username: string, password: string) => boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: !!localStorage.getItem('currentUser'),
  currentUser: localStorage.getItem('currentUser'),
  users: JSON.parse(localStorage.getItem('users') || '[]'),
  error: null,
  signup: (username, password) => {
    const { users } = get();
    if (users.some(user => user.username === username)) {
      set({ error: 'Username already exists' });
      return false;
    }
    const newUsers = [...users, { username, password }];
    localStorage.setItem('users', JSON.stringify(newUsers));
    localStorage.setItem('currentUser', username);
    set({ users: newUsers, isAuthenticated: true, currentUser: username, error: null });
    return true;
  },
  login: (username, password) => {
    const { users } = get();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', username);
      set({ isAuthenticated: true, currentUser: username, error: null });
      return true;
    } else {
      set({ error: 'Invalid username or password' });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('currentUser');
    set({ isAuthenticated: false, currentUser: null, error: null });
  },
  clearError: () => set({ error: null }),
}));