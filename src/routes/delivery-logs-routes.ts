import { DeliveryLogsController } from '@/controllers/delivery-logs-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';
import { Router } from 'express';

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.use(ensureAuthenticated);
deliveryLogsRoutes.post('/', verifyUserAuthorization(['sale']), deliveryLogsController.create);
deliveryLogsRoutes.get(
  '/:delivery_id/show',
  verifyUserAuthorization(['sale', 'customer']),
  deliveryLogsController.show,
);

export { deliveryLogsRoutes };
