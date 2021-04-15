import { Router } from 'express';
import { check } from 'express-validator';
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  updateUser,
} from 'controllers/user.controller';
import { validateFields } from 'middlewares/validate-fields';
import { validateJWT } from 'middlewares/validate-jwt';

const router = Router();

router.get('/', [validateJWT], getUsers);
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
router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('role', 'Role is required'),
    validateFields,
  ],
  updateUser
);
router.delete('/:id', [validateJWT], deleteUser);
router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);

export default router;
