const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const attributeGroupPostSchema = joi.object().keys({
    name: joi.string().required(),
    processId: joi.string().required(),
});

module.exports = {
    attributeGroupPostSchema,
};
