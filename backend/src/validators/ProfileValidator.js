const { Segments, Joi } = require('celebrate');

const index = {
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string()
      .required()
      .hex()
      .length(8),
  }).unknown(),
};

module.exports = { index };
