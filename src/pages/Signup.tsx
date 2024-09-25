import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button, Container, TextInput, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { signup, error, clearError } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    clearError();
    if (username && password) {
      if (signup(username, password)) {
        navigate('/resources');
      }
    }
  };

  return (
    <Container style={{marginTop:"10rem", maxWidth:"30rem"}}>
      <h1>Signup</h1>
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
      <Button onClick={handleSignup}>Signup</Button>
      {error && <Text color="red">{error}</Text>}
    </Container>
  );
};

export default Signup;