/* eslint-disable import/no-import-module-exports */
import Urls from '../utils/constants';

import { validateCommentData } from '../utils/validator';
import {
  addComment,
  editComment,
  deleteComment,
  getComment,
} from '../controllers/comments';

const router = require('express').Router();

router.get(
  Urls.API.COMMENTS.GET,
  validateCommentData,
  getComment,
);

router.post(
  Urls.API.COMMENTS.ADD,
  validateCommentData,
  addComment,
);

router.patch(
  Urls.API.COMMENTS.EDIT,
  validateCommentData,
  editComment,
);

router.delete(
  Urls.API.COMMENTS.DELETE,
  deleteComment,
);

module.exports = router;
