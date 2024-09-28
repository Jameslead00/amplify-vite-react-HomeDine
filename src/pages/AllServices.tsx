  import React, { useState, useEffect } from 'react';
  import { generateClient } from 'aws-amplify/api';
  import { type Schema } from '../../amplify/data/resource';
  import { getCurrentUser } from 'aws-amplify/auth';

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
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <h2>All Services</h2>
          <input 
            type="text" 
            placeholder="Search services" 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {/* Add your categories dynamically */}
          </select>
          {filteredServices.map(service => (
            <div key={service.serviceId}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>Category: {service.category}</p>
              <p>Price: ${service.price}</p>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h2>My Services</h2>
          {userServices.map(service => (
            <div key={service.serviceId}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>Category: {service.category}</p>
              <p>Price: ${service.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default AllServices;