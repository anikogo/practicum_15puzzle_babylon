/* eslint-disable import/no-import-module-exports */
import Urls from '../utils/constants';

import { validateUserData } from '../utils/validator';
import { updateUser } from '../controllers/user';

const router = require('express').Router();

router.patch(
  Urls.API.USERS.UPDATE,
  validateUserData,
  updateUser,
);

module.exports = router;
