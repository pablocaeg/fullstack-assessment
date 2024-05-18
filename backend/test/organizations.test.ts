import { expect } from 'chai';
import request from 'supertest';
import { app } from '../src/index';

describe('Organization Management API', () => {
  describe('GET /organizations', () => {
    it('should return a list of organizations', async () => {
      const response = await request(app).get('/api/v1/organizations');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('GET /organizations/:id', () => {
    it('should return a single organization by ID', async () => {
      const id = 1;
      const response = await request(app).get(`/api/v1/organizations/${id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id', id);
    });

    it('should return 404 if organization not found', async () => {
      const id = 9999;
      const response = await request(app).get(`/api/v1/organizations/${id}`);
      expect(response.status).to.equal(404);
    });

    it('should return 400 if ID is not a valid number', async () => {
      const id = 'notanumber';
      const response = await request(app).get(`/api/v1/organizations/${id}`);
      expect(response.status).to.equal(400);
    });
  });

  describe('POST /organizations', () => {
    it('should create a new organization', async () => {
      const newOrganization = {
        id: 2,
        name: 'New Org',
        description: 'New Org Description',
      };
      const response = await request(app).post('/api/v1/organizations').send(newOrganization);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id', newOrganization.id);
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidOrganization = {
        name: 'Invalid Org',
      };
      const response = await request(app).post('/api/v1/organizations').send(invalidOrganization);
      expect(response.status).to.equal(400);
    });
  });

  describe('PUT /organizations/:id', () => {
    it('should update an existing organization', async () => {
      const updatedOrganization = {
        name: 'Updated Org',
        description: 'Updated Org Description',
      };
      const id = 1;
      const response = await request(app).put(`/api/v1/organizations/${id}`).send(updatedOrganization);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('name', updatedOrganization.name);
    });

    it('should return 404 if organization to update is not found', async () => {
      const updatedOrganization = {
        name: 'Updated Org',
        description: 'Updated Org Description',
      };
      const id = 9999;
      const response = await request(app).put(`/api/v1/organizations/${id}`).send(updatedOrganization);
      expect(response.status).to.equal(404);
    });

    it('should return 400 if ID is not a valid number', async () => {
      const updatedOrganization = {
        name: 'Updated Org',
        description: 'Updated Org Description',
      };
      const id = 'notanumber';
      const response = await request(app).put(`/api/v1/organizations/${id}`).send(updatedOrganization);
      expect(response.status).to.equal(400);
    });
  });

  describe('DELETE /organizations/:id', () => {
    it('should delete an existing organization', async () => {
      const id = 2;
      const response = await request(app).delete(`/api/v1/organizations/${id}`);
      expect(response.status).to.equal(204);
    });

    it('should return 404 if organization to delete is not found', async () => {
      const id = 9999;
      const response = await request(app).delete(`/api/v1/organizations/${id}`);
      expect(response.status).to.equal(404);
    });

    it('should return 400 if ID is not a valid number', async () => {
      const id = 'notanumber';
      const response = await request(app).delete(`/api/v1/organizations/${id}`);
      expect(response.status).to.equal(400);
    });
  });
});
