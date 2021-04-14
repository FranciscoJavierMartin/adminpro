import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('X-Token');
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      next();
    } catch (error) {
      res.status(401).json({
        ok: true,
        message: 'Invalid token',
      });
    }
  } else {
    res.status(401).json({
      ok: true,
      message: 'Token is missing',
    });
  }
}
