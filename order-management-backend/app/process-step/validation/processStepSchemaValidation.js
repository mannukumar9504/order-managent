const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const processStepPostSchema = joi.object().keys({
    position: joi.number().required(),
    description: joi.string().required(),
    label: joi.string().required(),
    icon: joi.string(),
    attribute: joi.string().required(),
    processId: joi.string().required(),
    resources: joi.array().items(joi.string().required()),
});
const processStepPutSchema = joi.object().keys({
    position: joi.number(),
    description: joi.string(),
    label: joi.string(),
    icon: joi.string(),
    attribute: joi.string(),
    processId: joi.string().required(),
    resources: joi.array().items(joi.string().required()),
});
const putResourceSchema = joi.object().keys({
    resources: joi.array().items(joi.string()).required(),
});
module.exports = {
    processStepPostSchema,
    processStepPutSchema,
    putResourceSchema,
};
