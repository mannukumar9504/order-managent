const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const processPostSchema = joi.object().keys({
    name: joi.string().required(),
});

module.exports = {
    processPostSchema,
};
