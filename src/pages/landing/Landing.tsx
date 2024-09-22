// src/pages/landing/Landing.tsx
import { Container, Title, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<Container>
			<Title align="center" mb="lg">
				Welcome to Resource Explorer
			</Title>
			<div style={{ textAlign: 'center' }}>
				<Link to="/resources">
					<Button>Explore Resources</Button>
				</Link>
			</div>
		</Container>
	);
};

export default Landing;
