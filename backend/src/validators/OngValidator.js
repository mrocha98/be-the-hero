const { Segments, Joi } = require('celebrate');

const store = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    whatsapp: Joi.string()
      .required()
      .alphanum()
      .min(10)
      .max(11),
    city: Joi.string().required(),
    uf: Joi.string()
      .required()
      .length(2),
  }),
};

module.exports = { store };
