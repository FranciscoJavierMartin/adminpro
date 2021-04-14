import { createUser, getUsers } from 'controllers/users';
import { Router } from 'express';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;
