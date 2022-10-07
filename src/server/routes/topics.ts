/* eslint-disable import/no-import-module-exports */
import {
  addTopic,
  getTopics,
  getTopic,
  editTopic,
  deleteTopic,
} from '../controllers/topics';
import Urls from '../utils/constants';

const router = require('express').Router();

const { validateTopicData } = require('../utils/validator');

router.post(
  Urls.API.TOPICS.ADD,
  validateTopicData,
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
  validateTopicData,
  editTopic,
);

router.delete(
  Urls.API.TOPICS.EDIT,
  deleteTopic,
);

module.exports = router;
