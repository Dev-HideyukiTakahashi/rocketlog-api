import { Router } from 'express';
import { sessionsRoutes } from './sessions.route';
import { usersRoutes } from './users-routes';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
