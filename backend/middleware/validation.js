const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": "O avatar informado não é uma URL válida",
    }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateAvatarBody = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL).messages({
      "any.required": "O campo avatar é obrigatório",
      "string.empty": "O campo avatar é obrigatório",
      "string.uri": "O avatar informado não é uma URL válida",
    }),
  }),
});

const validateCreateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "any.required": "O campo name é obrigatório",
      "string.empty": "O campo name é obrigatório",
      "string.min": "O campo name deve ter no mínimo 2 caracteres",
      "string.max": "O campo name deve ter no máximo 30 caracteres",
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "any.required": "O campo link é obrigatório",
      "string.empty": "O campo link é obrigatório",
      "string.base": "O campo link deve ser um texto",
      "string.uri": "O link informado não é uma URL válida",
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateUserBody,
  validateLoginBody,
  validateUpdateUserBody,
  validateUpdateAvatarBody,
  validateCreateCardBody,
  validateUserId,
  validateCardId,
};
