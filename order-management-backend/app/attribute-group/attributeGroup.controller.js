/* eslint-disable max-len */
const { Op: OP } = require('sequelize');
const { attribute_group: attributeGroup, attribute } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const { isExist, preValidateData, deleteData } = require('../utils/common');
const {
    getAttributeGroupUsingId, getAllAttrGroupList, addAttributeGroupData, updateAttributeGroupData,
    getLinkedAttributes,
} = require('./attributeGroup.service');
const { attributeGroupPostSchema } = require('./validation/attributeGroupSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveResourceCategory: to create a new resource-category
 * @param {*} req
 * @returns
 */
const saveAttributeGroup = async (req) => {
    const requestBody = req.body;
    validateSchema(attributeGroupPostSchema, requestBody);

    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;
    await isExist(attributeGroup, { name: requestBody.name }, message.ATTRIBUTE_GROUP_ALREADY_EXIST, 'DUPLICATE');
    return addAttributeGroupData(attributeGroup, requestBody, message.ATTRIBUTE_GROUP_CREATE_SUCCESS);
};

/**
 * deleteResourceCategory: delete resource-category using id
 * @param {*} req
 * @returns
 */
const deleteAttributeGroup = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );

    const condition = {
        id: req.params.id,
    };
    await isExist(attributeGroup, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    const linked = await attribute.count({ where: { attributeGroupId: requestParam } });
    throwIf(linked, new BaseError(message.BAD_REQUEST, message.ATTRIBUTE_GROUP_IN_USE));
    return deleteData(attributeGroup, req, message.ATTRIBUTE_GROUP_DELETE_SUCCESS);
};

/**
 * updateResourceCategory : update resource-category by id
 * @param {*} req
 * @returns
 */
const updateAttributeGroup = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );

    const requestBody = req.body;
    validateSchema(attributeGroupPostSchema, requestBody);

    await preValidateData(req, attributeGroup);
    await isExist(attributeGroup, { id: { [OP.not]: requestParam }, name: req.body.name }, message.ATTRIBUTE_GROUP_ALREADY_EXIST, 'DUPLICATE');
    return updateAttributeGroupData(attributeGroup, req, message.ATTRIBUTE_GROUP_UPDATE_SUCCESS);
};

/**
 * getAllResourceCategory: to get the list of all resource-category
 * @param {*} req
 * @returns
 */
const getAllAttributeGroup = async (req) => getAllAttrGroupList(attributeGroup);

/**
 * getResourcecategoryById: get resource-category by id
 * @param {*} req
 * @returns
 */
const getAttributeGroupById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );

    return getAttributeGroupUsingId(attributeGroup, { id: requestParam });
};
/**
 * getAttributeGroupAttributes
 * @param {*} req
 */
const getAttributeGroupAttributes = async (req) => {
    const attributeGroupId = req.params.id;
    await isExist(attributeGroup, { id: attributeGroupId }, message.ID_DOES_NOT_EXIST, 'EXIST');
    return getLinkedAttributes(attributeGroupId);
};

module.exports = {
    saveAttributeGroup,
    deleteAttributeGroup,
    updateAttributeGroup,
    getAllAttributeGroup,
    getAttributeGroupById,
    getAttributeGroupAttributes,

};
