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

export const updateOrganization = async (id: number, organization: { id: number; name: string; description: string }) => {
  const response = await api.put(`/organizations/${id}`, organization);
  return response.data;
};

export const deleteOrganization = async (id: number) => {
  const response = await api.delete(`/organizations/${id}`);
  return response.data;
};

export const getUsersByOrganization = async (organizationId: number) => {
  const response = await api.get(`/organizations/${organizationId}`);
  return response.data.users;
};

export const createUser = async (user:  { passport: number; name: string; surname: string; phone: number; organizationId: number}) => {
  const response = await api.post(`/organizations/${user.organizationId}/users`, user);
  return response.data;
};

export const updateUser = async (passport: number, user:  { passport: number; name: string; surname: string; phone: number; organizationId: number}) => {
  const response = await api.put(`/users/${passport}`, user);
  return response.data;
};

export const deleteUser = async (passport: number) => {
  const response = await api.delete(`/users/${passport}`);
  return response.data;
};



