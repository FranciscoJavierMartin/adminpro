import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function validateFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      message: 'Error on validations',
      errors: errors.mapped(),
    });
  } else {
    next();
  }
}
