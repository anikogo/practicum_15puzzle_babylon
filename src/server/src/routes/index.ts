import auth from '../middlewares/auth';
import Urls from '../utils/constants';

const router = require('express').Router();

router.use(
  Urls.API.BASE,
  require('./auth'),
);

router.use(
  Urls.API.BASE,
  auth,
  require('./users'),
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

export default router;
