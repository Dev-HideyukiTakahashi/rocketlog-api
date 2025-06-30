import { UsersController } from '@/controllers/users-controller';
import { Router } from 'express';

export const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/', usersController.create);
