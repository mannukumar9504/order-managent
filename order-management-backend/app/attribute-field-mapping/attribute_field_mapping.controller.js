const {
    attribute_field_mapping: attributeFieldMapping,
    attribute_group: attributeGroup,
} = require('../../DB/models');
const message = require('../../config/status-message');
const { attributeFieldMappingPostSchema } = require('./validation/attributeFieldSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');
const {
    updateAttributeFieldMappingData,
    getListAttributeFieldMappingData,
} = require('./attribute-field-mapping.service');
/**
 * updateResourceCategory : update resource-category by id
 * @param {*} req
 * @returns
 */
const updateAttributeFieldMapping = async (req) => {
    const requestBody = req.body;
    validateSchema(attributeFieldMappingPostSchema, requestBody);
    return updateAttributeFieldMappingData(
        attributeFieldMapping,
        req,
        message.ATTRIBUTE_FIELD_MAPPING_UPDATE_SUCCESS,
    );
};

/**
 * getAllResourceCategory: to get the list of all resource-category
 * @param {*} req
 * @returns
 */
// eslint-disable-next-line max-len
const getAllAttributeFieldMapping = async (req) => getListAttributeFieldMappingData(attributeGroup);

module.exports = {
    updateAttributeFieldMapping,
    getAllAttributeFieldMapping,

};
