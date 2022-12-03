const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const attributePostSchema = joi.object().keys({
    attributeGroupId: joi.string().required(),
    attributeTypeId: joi.string().required(),
    position: joi.number().required(),
    description: joi.string().required(),
    label: joi.string().required(),
    isChangable: joi.boolean().required(),
    isRequired: joi.boolean().required(),
    sapIdentifier: joi.string().required(),
});
const attributePutSchema = joi.object().keys({
    attributeGroupId: joi.string(),
    attributeTypeId: joi.string(),
    position: joi.number(),
    description: joi.string(),
    label: joi.string(),
    isChangable: joi.boolean(),
    isRequired: joi.boolean(),
    sapIdentifier: joi.string().required(),
});
const attributeOrderSchema = joi.array().items(
    joi.object().keys({
        attribute: joi.string().required(),
        position: joi.number().required(),
    }),
);

module.exports = {
    attributePostSchema,
    attributePutSchema,
    attributeOrderSchema,
};
