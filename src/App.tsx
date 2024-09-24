import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Landing from './pages/landing/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResourceList from './pages/ResourceList';
import ResourceDetail from './pages/ResourceDetail';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const { isAuthenticated, users } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && users.length === 0) {
      navigate('/signup');
    } else if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, users, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/resources" 
        element={
          <PrivateRoute>
            <ResourceList />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/resource/:id" 
        element={
          <PrivateRoute>
            <ResourceDetail />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;