import { Router } from 'express';
import {
  getSearch,
  getSearchByCollection,
} from 'controllers/search.controller';
import { validateJWT } from 'middlewares/validate-jwt';

const router = Router();

router.get('/:criteria', [validateJWT], getSearch);
router.get(
  '/collection/:collection/:criteria',
  [validateJWT],
  getSearchByCollection
);

export default router;
