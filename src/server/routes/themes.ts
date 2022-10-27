import { Router } from 'express';

import {
  addTheme,
  getTheme,
  updateTheme,
  deleteTheme,
} from '../controllers/themes';
import Urls from '../utils/constants';

const router = Router();

router.post(Urls.API.THEMES.INDEX, addTheme);
router.get(Urls.API.THEMES.INDEX, getTheme);
router.patch(Urls.API.THEMES.INDEX, updateTheme);
router.delete(Urls.API.THEMES.INDEX, deleteTheme);

export default router;
