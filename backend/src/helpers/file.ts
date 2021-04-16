import { Request } from 'express';
import fileUpload from 'express-fileupload';

export function getFileExtension(req: Request): string {
  const file: fileUpload.UploadedFile = req.files.image as any;
  const fileNameParts = file.name.split('.');
  return fileNameParts[fileNameParts.length - 1];
}
