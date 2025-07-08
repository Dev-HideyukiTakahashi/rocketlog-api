import { DeliveriesController } from '@/controllers/deliveries-controller';
import { DeliveriesStatusController } from '@/controllers/deliveries-status-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

export const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(['sale']));
deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.get('/', deliveriesController.index);
deliveriesRoutes.patch('/:id/status', deliveriesStatusController.update);
