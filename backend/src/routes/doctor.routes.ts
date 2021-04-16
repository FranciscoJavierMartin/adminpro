import { Router } from 'express';
import {
  createDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from 'controllers/doctor.controller';
import { validateJWT } from 'middlewares/validate-jwt';
import { check } from 'express-validator';
import { validateFields } from 'middlewares/validate-fields';

const router = Router();

router.get('/', getDoctors);
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'HospitalID is required').isMongoId(),
    validateFields,
  ],
  createDoctor
);
router.put('/:id', [validateJWT], updateDoctor);
router.delete('/:id', [validateJWT], deleteDoctor);

export default router;
