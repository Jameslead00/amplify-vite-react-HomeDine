  import React, { useState, useEffect } from 'react';
  import { generateClient } from 'aws-amplify/api';
  import { type Schema } from '../../amplify/data/resource';
  import { getCurrentUser } from 'aws-amplify/auth';
  import { Box, Card, CardContent, Typography, TextField, Select, MenuItem, Grid, Divider } from '@mui/material';

  const client = generateClient<Schema>();

  type Service = {
    serviceId: string;
    title: string;
    description: string;
    category: string;
    price: number;
    userId: string;
    id: string;
    owner: string | null;
    createdAt: string;
    updatedAt: string;
  }; 
    const AllServices: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [userServices, setUserServices] = useState<Service[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
      fetchAllServices();
      fetchUserServices();
    }, []);
      async function fetchAllServices() {
        try {
          const result = await client.models.Services.list();
          if ('data' in result) {
            const mappedServices = result.data.map(service => ({
              ...service,
              serviceId: service.id,
              user: service.userId // Use userId as a string representation of the user
            }));
            setServices(mappedServices);
          }
        } catch (error) {
          console.error('Error fetching all services:', error);
        }
      }

    async function fetchUserServices() {
      try {
        const { userId } = await getCurrentUser();
        const result = await client.models.Services.list({
          filter: { userId: { eq: userId } }
        });
        if ('data' in result) {
          const mappedUserServices = result.data.map(service => ({
            ...service,
            serviceId: service.id
          }));
          setUserServices(mappedUserServices);
        }
      } catch (error) {
        console.error('Error fetching user services:', error);
      }
    }

    const filteredServices = services.filter(service => 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || service.category === selectedCategory)
    );

    return (
      <Box sx={{ display: 'flex', p: 3 }}>
        <Box sx={{ flex: 2, mr: 3 }}>
          <Typography variant="h4" gutterBottom>All Services</Typography>
          <Box sx={{ mb: 3 }}>
            <TextField 
              fullWidth
              variant="outlined"
              placeholder="Search services"
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Select
              fullWidth
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="">All Categories</MenuItem>
              {/* Add your categories dynamically */}
            </Select>
          </Box>
          <Grid container spacing={2}>
            {filteredServices.map(service => (
              <Grid item xs={12} sm={6} md={4} key={service.serviceId}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6">{service.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{service.description}</Typography>
                    <Typography variant="subtitle2">Category: {service.category}</Typography>
                    <Typography variant="subtitle1">Price: ${service.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1, ml: 3 }}>
          <Typography variant="h4" gutterBottom>My Services</Typography>
          <Grid container spacing={2}>
            {userServices.map(service => (
              <Grid item xs={12} key={service.serviceId}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6">{service.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{service.description}</Typography>
                    <Typography variant="subtitle2">Category: {service.category}</Typography>
                    <Typography variant="subtitle1">Price: ${service.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };

  export default AllServices;