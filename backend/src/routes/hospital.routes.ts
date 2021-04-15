import { Router } from 'express';
import {
  createHospital,
  deleteHospital,
  getHospitals,
  updateHospital,
} from 'controllers/hospital.controller';

const router = Router();

router.get('/', getHospitals);
router.post('/', createHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

export default router;
