export {};

const router = require('express').Router();
const Urls = require('../utils/constants');
const auth = require('../middlewares/auth');

router.use(
  Urls.API.BASE,
  require('./user')
);

router.use(
  Urls.API.BASE,
  auth,
  require('./topics'),
);

router.use(
  Urls.API.BASE,
  auth,
  require('./comments'),
);

module.exports = router;
