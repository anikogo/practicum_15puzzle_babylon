export {};

const router = require('express').Router();
const Urls = require('../utils/constants');

const { validateLoginData, validateRegistrData } = require('../utils/validator');
const { signupUser, signinUser, logoutUser } = require('../controllers/user');

router.post(
  Urls.API.AUTH.SIGNUP,
  validateRegistrData,
  signupUser,
);

router.post(
  Urls.API.AUTH.SIGNIN,
  validateLoginData,
  signinUser,
);

router.post(
  Urls.API.AUTH.LOGOUT,
  logoutUser,
);

module.exports = router;
