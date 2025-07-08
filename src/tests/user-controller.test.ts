import { app } from '@/app';
import request from 'supertest';

describe('UsersController', () => {
  it('should create a new user successfully', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test User');
  });
});
