import { expect } from 'chai';
import request from 'supertest';
import { app } from '../src/index'; // Adjust the path as needed

describe('User Management API', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request(app).get('/api/v1/users');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('GET /users/:passport', () => {
    it('should return a single user by passport', async () => {
      const passport = 123456789;
      const response = await request(app).get(`/api/v1/users/${passport}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('passport', passport);
    });

    it('should return 404 if user not found', async () => {
      const passport = 1;
      const response = await request(app).get(`/api/v1/users/${passport}`);
      expect(response.status).to.equal(404);
    });

    it('should return 400 if passport is not a valid number', async () => {
      const passport = 'notanumber';
      const response = await request(app).get(`/api/v1/users/${passport}`);
      expect(response.status).to.equal(400);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = {
        passport: 987654321,
        name: 'John',
        surname: 'Doe',
        phone: 667249583,
        organizationId: 1,
      };
      const response = await request(app).post('/api/v1/users').send(newUser);
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('passport', newUser.passport);
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidUser = {
        name: 'John Doe',
      };
      const response = await request(app).post('/api/v1/users').send(invalidUser);
      expect(response.status).to.equal(400);
    });
  });
});
