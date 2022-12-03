const { attribute_type: attributeType } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    getList, updateData, getListByColumn, addData, isExist,
} = require('../utils/common');
const { attributeTypePostSchema } = require('./validation/attribute-type-SchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveResourceCategory: to create a new resource-category
 * @param {*} req
 * @returns
 */
const saveAttributeType = async (req) => {
    const requestBody = req.body;
    validateSchema(attributeTypePostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;
    await isExist(attributeType, { name: requestBody.name }, message.ATTRIBUTE_TYPE_EXIST, 'DUPLICATE');
    return addData(attributeType, requestBody, message.ATTRIBUTE_TYPE_CREATE_SUCCESS);
};

/**
 * deleteResourceCategory: delete resource-category using id
 * @param {*} req
 * @returns
 */
const deleteAttributeType = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );

    req.body.isDeleted = 1;
    const condition = {
        isDeleted: 0,
        id: req.params.id,
    };

    await isExist(attributeType, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    return updateData(attributeType, req, message.ATTRIBUTE_TYPE_DELETED);
};

/**
 * updateResourceCategory : update resource-category by id
 * @param {*} req
 * @returns
 */
const updateAttributeType = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    return updateData(attributeType, req, message.ATTRIBUTE_TYPE_UPDATED);
};

/**
 * getAllResourceCategory: to get the list of all resource-category
 * @param {*} req
 * @returns
 */
const getAllAttributeType = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };

    return getList(attributeType, conditionObj);
};

/**
 * getResourcecategoryById: get resource-category by id
 * @param {*} req
 * @returns
 */
const getAttributeTypeById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    const conditionObj = {
        attributes: ['id', 'name','createdAt'],
    };

    return getListByColumn(attributeType, conditionObj, { id: requestParam, isDeleted: false });
};

module.exports = {
    saveAttributeType,
    deleteAttributeType,
    updateAttributeType,
    getAllAttributeType,
    getAttributeTypeById,
};
