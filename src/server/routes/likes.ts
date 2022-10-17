import { Router } from 'express';

import {
  addLike,
  getLikes,
  removeLike,
} from '../controllers/likes';
import Urls from '../utils/constants';

const router = Router();

router.post(
  Urls.API.LIKE.ADD,
  addLike,
);

router.get(
  Urls.API.LIKE.GET,
  getLikes,
);

router.delete(
  Urls.API.LIKE.DELETE,
  removeLike,
);

export default router;
