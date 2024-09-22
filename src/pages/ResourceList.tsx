import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Container, Input, Loader, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import "../style.scss";


const fetchResources = async () => {
  const response = await fetch('https://swapi.dev/api/people/');
  return response.json();
};

const ResourceList = () => {
  const { data, isLoading } = useQuery(['resources'], fetchResources);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Searching
  const filteredData = useMemo(() => {
    if (!data || !data.results) return [];
    return data.results.filter((resource: any) =>
      resource.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!filteredData) return [];

    return [...filteredData].sort((a: any, b: any) => {
      if (!sortField) return 0;

      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'height' || sortField === 'mass') {
        // Convert to numbers for sorting numerical values
        aValue = parseInt(aValue, 10);
        bValue = parseInt(bValue, 10);
      }

      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader color="blue" size="xl" />
        <p style={{ paddingTop: '1rem' }}>You're just there...</p>
      </div>
    );
  }

  return (
    <Container>
      <Input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Table>
        <thead>
          <tr>
            <th>
              <Button onClick={() => handleSort('name')}>
                Name {sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>
              <Button onClick={() => handleSort('height')}>
                Height {sortField === 'height' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>
              <Button onClick={() => handleSort('mass')}>
                Mass {sortField === 'mass' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((resource: any) => (
            <tr key={resource.name}>
              <td>{resource.name}</td>
              <td>{resource.height}</td>
              <td>{resource.mass}</td>
              <td>
                <Link to={`/resource/${resource.name}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ResourceList;
