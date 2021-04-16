import { Router } from 'express';
import expressFileUpload from 'express-fileupload';
import { param } from 'express-validator';
import { getImage, uploadFile } from 'controllers/upload.controller';
import { validateJWT } from 'middlewares/validate-jwt';
import { validateFields } from 'middlewares/validate-fields';
import { validateImageFileExtensions } from 'middlewares/validate-image-file-extensions';

const router = Router();

router.use(expressFileUpload());
router.put(
  '/:type/:id',
  [
    validateJWT,
    param(
      'type',
      'Type should be one of these: "users", "doctors" or "hospitals".'
    ).isIn(['users', 'hospitals', 'doctors']),
    validateFields,
    validateImageFileExtensions,
  ],
  uploadFile
);
router.get(
  '/:type/:photo',
  [
    validateJWT,
    param(
      'type',
      'Type should be one of these: "users", "doctors" or "hospitals".'
    ).isIn(['users', 'hospitals', 'doctors']),
    param(
      'photo',
      'Photo should end with one of the following extensions: "png", "jpg", "jpeg" or "gif".'
    )
      .isString()
      .custom(
        (value) =>
          value.endsWith('.png') ||
          value.endsWith('.jpg') ||
          value.endsWith('.jpeg') ||
          value.endsWith('.gif')
      ),
    validateFields,
  ],
  getImage
);

export default router;
