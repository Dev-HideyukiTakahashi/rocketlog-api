import { app } from '@/app';
import { prisma } from '@/database/prisma';
import request from 'supertest';

describe('SessionController', () => {
  let user_id: string;

  // deleta o user depois de todos testes
  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it('should authenticate a user and get access token', async () => {
    const userResponse = await request(app).post('/users').send({
      name: 'Auth Test User',
      email: 'auth_testuser@example.com',
      password: 'password123',
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post('/sessions').send({
      email: 'auth_testuser@example.com',
      password: 'password123',
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });
});
