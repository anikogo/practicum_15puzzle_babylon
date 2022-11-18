import { Router } from 'express';

import Urls from '../utils/constants';
// import { validateCommentData } from '../utils/validator';
import {
  addComment,
  editComment,
  deleteComment,
  getComment,
} from '../controllers/comments';

const router = Router();

router.get(Urls.API.COMMENTS.GET, getComment);
router.post(Urls.API.COMMENTS.ADD, addComment);
router.patch(Urls.API.COMMENTS.EDIT, editComment);
router.delete(Urls.API.COMMENTS.DELETE, deleteComment);

export default router;
