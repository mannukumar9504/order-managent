const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const attributeFieldMappingPostSchema = joi.array().items(
    joi.object().keys({
        attributeId: joi.string().required(),
        isSticky: joi.boolean(),
        isArchive: joi.boolean(),
        inMobileCollapsed: joi.boolean(),
        inMobileExpanded: joi.boolean(),
        inMobileDetail: joi.boolean(),
    }),
);

module.exports = {
    attributeFieldMappingPostSchema,
};
