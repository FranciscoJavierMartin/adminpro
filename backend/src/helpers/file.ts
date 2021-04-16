import fs from 'fs';
import { Request } from 'express';
import { Model, Document } from 'mongoose';
import fileUpload from 'express-fileupload';
import { Doctor, Hospital, User } from 'models';

export function getFileExtension(req: Request): string {
  const file: fileUpload.UploadedFile = req.files.image as any;
  const fileNameParts = file.name.split('.');
  return fileNameParts[fileNameParts.length - 1];
}

export async function updateImage(
  type: 'doctors' | 'hospitals' | 'users',
  id: string,
  filename: string
) {
  let res: boolean;

  switch (type) {
    case 'doctors':
      res = await updateImageOnEntity(Doctor, id, type, filename);
      break;
    case 'hospitals':
      res = await updateImageOnEntity(Hospital, id, type, filename);
      break;
    case 'users':
      res = await updateImageOnEntity(User, id, type, filename);
      break;
    default:
      res = false;
  }

  return res;
}

async function updateImageOnEntity(
  model: Model<Document<any, {}>, {}>,
  id: string,
  path: string,
  filename: string
): Promise<boolean> {
  let res: boolean;

  try {
    const entity = await model.findById(id);
    if (entity) {
      const oldPath = `./uploads/${path}/${filename}`;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      (entity as any).img = filename;
      await entity.save();
      res = false;
    } else {
      res = false;
    }
  } catch (error) {
    console.log(error);
    res = false;
  }

  return res;
}
