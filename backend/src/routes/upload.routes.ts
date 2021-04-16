import { Router } from 'express';
import expressFileUpload from 'express-fileupload';
import { param } from 'express-validator';
import { uploadFile } from 'controllers/upload.controller';
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

export default router;
