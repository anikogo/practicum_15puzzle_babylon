import { Router } from 'express';

import {
  addTopic,
  getTopics,
  getTopic,
  editTopic,
  deleteTopic,
} from '../controllers/topics';
// import { validateTopicData } from '../utils/validator';
import Urls from '../utils/constants';

const router = Router();

router.post(Urls.API.TOPICS.ADD, addTopic);
router.get(Urls.API.TOPICS.GET, getTopic);
router.get(Urls.API.TOPICS.INDEX, getTopics);
router.patch(Urls.API.TOPICS.EDIT, editTopic);
router.delete(Urls.API.TOPICS.DELETE, deleteTopic);

export default router;
