import { Router } from 'express';
import { getSearch } from 'controllers/search.controller';
import { validateJWT } from 'middlewares/validate-jwt';

const router = Router();

router.get('/:criteria', [validateJWT], getSearch);
export default router;
