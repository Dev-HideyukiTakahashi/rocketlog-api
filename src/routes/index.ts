import { Router } from 'express';
import { deliveriesRoutes } from './deliveries.routes';
import { sessionsRoutes } from './sessions.route';
import { usersRoutes } from './users-routes';

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/deliveries', deliveriesRoutes);
