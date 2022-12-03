const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const resourcePostSchema = joi.object().keys({
    name: joi.string().required(),
    categoryId: joi.string(),
    manufacturerId: joi.string(),
    typeId: joi.string(),
    locationId: joi.string(),
});

const resourceSapPostSchema = joi.object().keys({
    sapIdentifier: joi.string().required(),
    name: joi.string().required(),
    category: joi.object().keys({
        sapIdentifier: joi.string().required(),
        name: joi.string().required(),
    }),
    manufacturer: joi.object().keys({
        sapIdentifier: joi.string().required(),
        name: joi.string().required(),
    }),
    type: joi.object().keys({
        sapIdentifier: joi.string().required(),
        name: joi.string().required(),
    }),
    location: joi.string().required(),
});
const resourceSapPutSchema = joi.object().keys({
    name: joi.string().required(),
    category: joi.object().keys({
        sapIdentifier: joi.string().required(),
        name: joi.string().required(),
    }),
    manufacturer: joi.object().keys({
        sapIdentifier: joi.string().required(),
        name: joi.string().required(),
    }),
    type: joi.object().keys({
        sapIdentifier: joi.string().required(),
        name: joi.string().required(),
    }),
    location: joi.string(),
});

const categoryPostSchema = joi.object().keys({
    sapIdentifier: joi.string(),
    name: joi.string().required(),
});

module.exports = {
    resourcePostSchema,
    categoryPostSchema,
    resourceSapPostSchema,
    resourceSapPutSchema,
};
