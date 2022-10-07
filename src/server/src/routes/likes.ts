/* eslint-disable import/no-import-module-exports */
import {
  addLike,
  getLikes,
  removeLike,
} from '../controllers/likes';
import Urls from '../utils/constants';

const router = require('express').Router();

router.post(
  Urls.API.LIKE.ADD,
  addLike,
);

router.get(
  Urls.API.LIKE.INDEX,
  getLikes,
);

router.delete(
  Urls.API.LIKE.DELETE,
  removeLike,
);

module.exports = router;
