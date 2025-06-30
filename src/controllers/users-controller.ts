import { Request, Response } from 'express';

export class UsersController {
  create(request: Request, response: Response) {
    return response.json({ message: 'ok' });
  }
}
