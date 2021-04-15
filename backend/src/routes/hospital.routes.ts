import { Router } from 'express';
import { check } from 'express-validator';
import {
  createHospital,
  deleteHospital,
  getHospitals,
  updateHospital,
} from 'controllers/hospital.controller';
import { validateJWT } from 'middlewares/validate-jwt';
import { validateFields } from 'middlewares/validate-fields';

const router = Router();

router.get('/', getHospitals);
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  createHospital
);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

export default router;
