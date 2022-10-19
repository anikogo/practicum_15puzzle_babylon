import { Router } from 'express';
import Urls from '../utils/constants';
import auth from './auth';
import users from './users';
import likes from './likes';
import topics from './topics';
import comments from './comments';
// import authMiddleware from '../middlewares/auth';

const router = Router();

// router.use(Urls.API.BASE, authMiddleware);
router.use(Urls.API.BASE, auth);
router.use(Urls.API.BASE, users);
router.use(Urls.API.BASE, topics);
router.use(Urls.API.BASE, comments);
router.use(Urls.API.BASE, likes);

export default router;
