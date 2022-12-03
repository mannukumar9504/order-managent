const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const locationPostSchema = joi.object().keys({
    name: joi.string().required(),
});

module.exports = {
    locationPostSchema,
};
