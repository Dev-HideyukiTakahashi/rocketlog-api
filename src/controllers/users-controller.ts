import { Request, Response } from 'express';
import { z } from 'zod';

export class UsersController {
  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    return response.json({ message: 'ok' });
  }
}
