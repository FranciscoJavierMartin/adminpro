import { googleSignIn, login, renewToken } from 'controllers/auth.controller';
import { Router } from 'express';
import { check } from 'express-validator';
import { validateFields } from 'middlewares/validate-fields';
import { validateJWT } from 'middlewares/validate-jwt';

const router = Router();
router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  '/google',
  [check('token', 'Google token is required').not().isEmpty(), validateFields],
  googleSignIn
);
router.get('/renew', [validateJWT], renewToken);

export default router;
