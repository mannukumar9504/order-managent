const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const rolePostSchema = joi.object().keys({
    name: joi.string().valid('ADMIN', 'WORKER', 'OPERATOR').required(),
});

module.exports = {
    rolePostSchema,
};
