const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const groupPostSchema = joi.object().keys({
    name: joi.string().required(),
});

module.exports = {
    groupPostSchema,
};
