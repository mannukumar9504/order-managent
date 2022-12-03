const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const attributeTypePostSchema = joi.object().keys({
    name: joi.string().valid('INPUT', 'SELECT').required(),
});

module.exports = {
    attributeTypePostSchema,
};
