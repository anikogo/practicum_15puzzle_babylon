import { Router } from 'express';
import Urls from '../utils/constants';
import auth from './auth';
import users from './users';
import likes from './likes';
import topics from './topics';
import comments from './comments';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use(Urls.API.BASE, authMiddleware);
router.use(Urls.API.AUTH.INDEX, auth);
router.use(Urls.API.USERS.INDEX, users);
router.use(Urls.API.TOPICS.INDEX, topics);
router.use(Urls.API.COMMENTS.INDEX, comments);
router.use(Urls.API.LIKE.INDEX, likes);

export default router;
