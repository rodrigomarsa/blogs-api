const Joi = require('joi');

const ERROR_MESSAGE = 'Some required fields are missing';

const addUserSchema = Joi.object().keys({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
    'string.required': '"displayName" is required',
  }),
  email: Joi.string().email().required().messages({
    'string.min': '"email" must be a valid email',
    'string.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be at least 6 characters long',
    'string.required': '"password" is required',
  }),
});

const addCategorySchema = Joi.object().keys({
  name: Joi.string().min(1).required().messages({
    'string.required': '"name" is required',
  }),
});

const addPostSchema = Joi.object().keys({
  title: Joi.string().min(1).required().messages({
    'string.empty': ERROR_MESSAGE,
    'string.base': ERROR_MESSAGE,
    'any.required': ERROR_MESSAGE,
  }),
  content: Joi.string().min(1).required().messages({
    'string.empty': ERROR_MESSAGE,
    'string.base': ERROR_MESSAGE,
    'any.required': ERROR_MESSAGE,
  }),
  categoryIds: Joi.array().required().messages({
    'any.required': 'one or more "categoryIds" not found',
  }),
});

module.exports = {
  addUserSchema,
  addCategorySchema,
  addPostSchema,
};