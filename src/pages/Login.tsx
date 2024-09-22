// src/pages/Login.tsx
import { useAuthStore } from '../store/authStore';
import { Button, Container, TextInput } from '@mantine/core';

const Login = () => {
  const { login } = useAuthStore();

  const handleLogin = () => {
    // Simulate a successful login
    login();
  };

  return (
    <Container>
      <h1>Login</h1>
      <TextInput placeholder="Enter your username" />
      <Button onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
