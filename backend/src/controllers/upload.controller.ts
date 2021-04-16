import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UploadFileResponse } from 'responses/upload.response';
import { getFileExtension } from 'helpers/file';

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
      res.json({
        ok: true,
        message: newFileName,
      });
    }
  });
}
