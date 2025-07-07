import { DeliveriesController } from '@/controllers/deliveries-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { Router } from 'express';

export const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthenticated);
deliveriesRoutes.post('/', deliveriesController.create);
