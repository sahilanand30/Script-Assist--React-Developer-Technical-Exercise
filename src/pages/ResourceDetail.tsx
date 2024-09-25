import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Loader, Button } from '@mantine/core';
import "../style.scss";

const fetchResource = async (name: string) => {
  const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
  const data = await response.json();
  return data.results[0];
};

const fetchEnrichedData = async (resource: any) => {
  const response = await fetch(resource.homeworld);
  return response.json();
};

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const { data, isLoading } = useQuery(['resource', id], () => fetchResource(id!));

  const { data: enrichedData, isLoading: enriching } = useQuery(
    ['enrichedData', id],
    () => fetchEnrichedData(data),
    { enabled: !!data }
  );

  if (isLoading || enriching) {
    return (
      <div className="loader-container">
        <Loader color="blue" size="xl" />
        <p className="loader-text">You're just there...</p>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Back
      </Button>
      <Container className="resource-detail-container">

        <Card className="resource-detail-card" shadow="lg" radius="md" withBorder>
          <h1 className="card-title">{data.name}</h1>
          <div className="card-content">
            <p><strong>Height:</strong> {data.height} cm</p>
            <p><strong>Mass:</strong> {data.mass} kg</p>
            <p><strong>Hair Color:</strong> {data.hair_color}</p>
            <p><strong>Homeworld:</strong> {enrichedData.name}</p>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default ResourceDetail;
