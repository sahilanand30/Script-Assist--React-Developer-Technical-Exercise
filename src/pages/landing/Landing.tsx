import { Container, Title, Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Landing = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <Container style={{marginTop:"10rem", maxWidth:"40rem"}}>
      <Title align="center" mb="lg">
        Welcome to Resource Explorer
      </Title>
      <Group position="center">
        {isAuthenticated ? (
          <>
            <Link to="/resources">
              <Button>Explore Resources</Button>
            </Link>
            <Button onClick={logout} variant="outline">Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline">Signup</Button>
            </Link>
          </>
        )}
      </Group>
    </Container>
  );
};

export default Landing;