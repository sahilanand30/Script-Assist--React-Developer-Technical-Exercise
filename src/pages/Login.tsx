import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button, Container, TextInput, Text } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login, error, clearError } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    clearError();
    if (username && password) {
      if (login(username, password)) {
        navigate('/resources');
      }
    }
  };

  return (
    <Container style={{ marginTop: "10rem", maxWidth: "30rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Login</h1>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        mb="sm"
      />
      <TextInput
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb="sm"
      />
      <Button onClick={handleLogin} mr="sm">Login</Button>
      <Link to="/signup">
        <Button variant="outline">Signup</Button>
      </Link>
      {error && <Text color="red">{error}</Text>}
    </Container>
  );
};

export default Login;