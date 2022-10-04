export {};

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const checkUrl = (value: string, helpers: any) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.message('bad data');
};

const validateUserData = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(checkUrl),
    display_name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegistrData = celebrate({
  body: Joi.object().keys({
    display_name: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(checkUrl),
  }),
});

const validateTopicData = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(1).max(60),
    description: Joi.string().min(1),
  }),
});

const validateCommentData = celebrate({
  body: Joi.object().keys({
    content: Joi.string().min(2).max(60),
  }),
});

module.exports = {
  validateUserData,
  validateLoginData,
  validateRegistrData,
  validateTopicData,
  validateCommentData,
};
