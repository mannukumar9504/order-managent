const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const organisationPostSchema = joi.object().keys({
    name: joi.string().required(),
    groups: joi.array().items(joi.string()),
    processes: joi.array().items(joi.string()),
});

module.exports = {
    organisationPostSchema,
};
