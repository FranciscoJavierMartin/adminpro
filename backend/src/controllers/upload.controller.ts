import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
  GetImageResponse,
  UploadFileResponse,
} from 'responses/upload.response';
import { getFileExtension, updateImage } from 'helpers/file';

export async function uploadFile(
  req: Request<{ type: string; id: string }>,
  res: Response<UploadFileResponse>
) {
  const { type, id } = req.params;
  const newFileName = `${uuid()}.${getFileExtension(req)}`;

  (req.files.image as any).mv(`./uploads/${type}/${newFileName}`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        ok: false,
        message: 'Error moving image',
      });
    } else {
      updateImage(type as any, id, newFileName).then(
        (responseUpdateImage: boolean) => {
          if (responseUpdateImage) {
            res.json({
              ok: true,
              message: newFileName,
            });
          } else {
            res.status(500).json({
              ok: false,
              message: 'Error updating image info',
            });
          }
        }
      );
    }
  });
}

export async function getImage(
  req: Request<{ type: string; photo: string }>,
  res: Response<GetImageResponse>
) {
  const { type, photo } = req.params;

  const pathImage = path.join(__dirname, `../../uploads/${type}/${photo}`);

  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  } else {
    const pathImage = path.join(__dirname, `../../uploads/no-img.jpg`);
    res.sendFile(pathImage);
  }
}
