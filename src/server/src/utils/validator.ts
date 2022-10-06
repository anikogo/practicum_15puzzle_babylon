import { celebrate, Joi } from 'celebrate';
import validator from 'validator';

const checkUrl = (value: string, helpers: any) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.message('bad data');
};

const validateUserData = celebrate({
  body: Joi.object().keys({
    avatar_path: Joi.string().custom(checkUrl),
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
    email: Joi.string().required().email(),
    display_name: Joi.string().min(2).max(30),
    avatar_path: Joi.string().custom(checkUrl),
    password: Joi.string().required(),
  }),
});

const validateTopicData = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(1).max(60),
    description: Joi.string().min(1),
    created_by: Joi.number(),
  }),
});

const validateCommentData = celebrate({
  body: Joi.object().keys({
    content: Joi.string().min(2).max(60),
    userId: Joi.number(),
    parentId: Joi.number(),
    topicId: Joi.number(),
  }),
});

export {
  validateUserData,
  validateLoginData,
  validateRegistrData,
  validateTopicData,
  validateCommentData,
};
