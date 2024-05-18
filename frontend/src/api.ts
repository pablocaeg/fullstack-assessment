import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const getOrganizations = async () => {
  const response = await api.get('/organizations');
  return response.data;
};

export const createOrganization = async (organization: { id: number; name: string; description: string }) => {
  const response = await api.post('/organizations', organization);
  return response.data;
};

export const updateOrganization = async (prevId: number, organization: { id: number; name: string; description: string }) => {
  const response = await api.put(`/organizations/${prevId}`, organization);
  return response.data;
};

export const deleteOrganization = async (id: number) => {
  const response = await api.delete(`/organizations/${id}`);
  return response.data;
};
