import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('X-Token');
  if (token) {
    try {
      const info = jwt.verify(token, process.env.JWT_SECRET_KEY);
      (req as any).id = (info as any).id;
      next();
    } catch (error) {
      res.status(401).json({
        ok: false,
        message: 'Invalid token',
      });
    }
  } else {
    res.status(401).json({
      ok: false,
      message: 'Token is missing',
    });
  }
}
