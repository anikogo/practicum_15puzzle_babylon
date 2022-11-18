import { Router } from 'express';
import Urls from '../utils/constants';
// import { validateUserData } from '../utils/validator';
import { updateUser } from '../controllers/user';

const router = Router();

router.patch(Urls.API.USERS.UPDATE, updateUser);

export default router;
