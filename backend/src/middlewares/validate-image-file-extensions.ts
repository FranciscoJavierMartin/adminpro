import { Request, Response, NextFunction } from 'express';
import { getFileExtension } from 'helpers/file';

export function validateImageFileExtensions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({
      ok: false,
      message: 'No file was uploaded',
    });
  } else if (Object.keys(req.files).length !== 1) {
    res.status(400).json({
      ok: false,
      message: 'Only one image is allowed',
    });
  } else if (!['png', 'jpg', 'jpeg', 'gif'].includes(getFileExtension(req))) {
    res.status(400).json({
      ok: false,
      message: 'Only "png", "jpg", "jpeg" and "gif" extensions are available',
    });
  } else {
    next();
  }
}
