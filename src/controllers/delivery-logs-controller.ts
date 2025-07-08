import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import z from 'zod';

export class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    });

    if (!delivery) {
      throw new AppError('delivery not found', 404);
    }

    if (delivery.status === 'delivered') {
      throw new AppError('this order has already delivered');
    }

    if (delivery.status === 'processing') {
      throw new AppError('change status to shipped');
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.status(201).json();
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      // inclue o array de delivery logs no payload
      include: {
        logs: true,
        // incluindo campos específicos no payload
        user: { select: { name: true, email: true } },
      },
    });

    // verifica se delivery é do próprio usuário
    const isCustomer = request.user?.role === 'customer' ? true : false;
    const isDifferentUserId = request.user?.id !== delivery?.userId ? true : false;
    if (isCustomer && isDifferentUserId) {
      throw new AppError('the user can only view their deliveries', 401);
    }

    return response.json(delivery);
  }
}
