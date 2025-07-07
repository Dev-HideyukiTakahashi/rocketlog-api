import { Request, Response } from 'express';

export class DeliveriesController {
  create(request: Request, response: Response) {
    return response.json({ message: 'ok' });
  }
}
