// src/pages/ResourceDetail.tsx
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Container, Card, Loader } from '@mantine/core';
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
        <p style={{paddingTop:"1rem"}}>You're just there...</p>
      </div>
    );
  }

  return (
    <Container>
      <Card>
        <h1>{data.name}</h1>
        <p>Height: {data.height}</p>
        <p>Mass: {data.mass}</p>
        <p>Hair Color: {data.hair_color}</p>
        <p>Homeworld: {enrichedData.name}</p>
      </Card>
    </Container>
  );
};

export default ResourceDetail;