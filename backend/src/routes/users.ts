import { Router } from 'express';
import { check } from 'express-validator';
import { createUser, getUsers } from 'controllers/users';
import { validateFields } from 'middlewares/validate-fields';

const router = Router();

router.get('/', getUsers);
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  createUser
);

export default router;
