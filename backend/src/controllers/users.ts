import { Request, Response } from 'express';
import { UsersResponse } from 'responses/users';

export function getUsers(req: Request, res: Response<UsersResponse>) {
  res.json({
    ok: true,
    users: [],
  });
}
