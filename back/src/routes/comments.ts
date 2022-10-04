export {};

const router = require('express').Router();
const Urls = require('../utils/constants');

const { validateCommentData } = require('../utils/validator');
const { addComment, editComment, deleteComment } = require('../controllers/comments');

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
