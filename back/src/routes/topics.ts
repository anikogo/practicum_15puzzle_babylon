export {};

const router = require('express').Router();
const Urls = require('../utils/constants');

const { validateTopicData } = require('../utils/validator');

const {
  addTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
} = require('../controllers/topics');

router.post(
  Urls.API.TOPICS.ADD,
  validateTopicData,
  addTopic,
);

router.get(
  Urls.API.TOPICS.GET,
  getTopics,
);

router.get(
  Urls.API.TOPICS.GET_CURRENT,
  getTopic,
);

router.patch(
  Urls.API.TOPICS.EDIT,
  validateTopicData,
  updateTopic,
);

router.delete(
  Urls.API.TOPICS.EDIT,
  deleteTopic,
);

module.exports = router;
