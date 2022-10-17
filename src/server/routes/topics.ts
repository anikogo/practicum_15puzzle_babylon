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

router.post(
  Urls.API.TOPICS.ADD,
  // validateTopicData,
  addTopic,
);

router.get(
  Urls.API.TOPICS.INDEX,
  getTopics,
);

router.get(
  Urls.API.TOPICS.GET,
  getTopic,
);

router.patch(
  Urls.API.TOPICS.EDIT,
  // validateTopicData,
  editTopic,
);

router.delete(
  Urls.API.TOPICS.DELETE,
  deleteTopic,
);

export default router;
