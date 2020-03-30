const { Segments, Joi } = require('celebrate');

const index = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().positive(),
  }),
};

const destroy = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number()
      .required()
      .positive()
      .precision(0),
  }),
};

module.exports = { index, destroy };
