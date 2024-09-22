// src/App.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <PrivateRoute>
        <Outlet /> 
      </PrivateRoute>
    </div>
  );
}

export default App;
