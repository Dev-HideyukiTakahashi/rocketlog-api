import { prisma } from '@/database/prisma';
import { Request, Response } from 'express';
import z from 'zod';

export class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });

    const { user_id, description } = bodySchema.parse(request.body);

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });

    return response.status(201).json({ message: 'ok' });
  }

  async index(request: Request, response: Response) {
    const deliveries = await prisma.delivery.findMany({
      // inclue os campos no payload com include
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return response.json({ deliveries });
  }
}
