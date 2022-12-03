/* eslint-disable import/extensions */
const { Op: OP } = require('sequelize');
const { attribute } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    updateData, isExist,
    preValidateData,
    deleteData,
} = require('../utils/common');
const {
    createAttribute,
    getAttributeList,
    getAttributeUsingId, attributeTypeGroupValid,
    attributeOrderUpdate,
} = require('./attribute.service');
const { attributePostSchema, attributePutSchema, attributeOrderSchema } = require('./validation/attributeSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveResourceCategory: to create a new resource-category
 * @param {*} req
 * @returns
 */
const saveAttribute = async (req) => {
    const requestBody = req.body;
    validateSchema(attributePostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;
    await isExist(attribute, { sapIdentifier: requestBody.sapIdentifier }, message.ATTRIBUTE_ALREADY_EXIST, 'DUPLICATE');
    await attributeTypeGroupValid(requestBody);
    return createAttribute(attribute, requestBody, message.ATTRIBUTE_CREATE_SUCCESS);
};

/**
 * deleteResourceCategory: delete resource-category using id
 * @param {*} req
 * @returns
 */
const deleteAttribute = async (req) => {
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

    await isExist(attribute, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    return deleteData(attribute, req, message.ATTRIBUTE_DELETE_SUCCESS);
};

/**
 * updateResourceCategory : update resource-category by id
 * @param {*} req
 * @returns
 */
const updateAttribute = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    validateSchema(attributePutSchema, requestBody);
    await preValidateData(req, attribute);
    await isExist(attribute, { id: { [OP.not]: requestParam }, sapIdentifier: req.body.sapIdentifier }, message.ROLE_ALREADY_EXIST, 'DUPLICATE');
    await attributeTypeGroupValid(requestBody);
    return updateData(attribute, req, message.ATTRIBUTE_UPDATE_SUCCESS);
};

/**
 * getAllResourceCategory: to get the list of all resource-category
 * @param {*} req
 * @returns
 */
const getAllAttribute = async (req) => getAttributeList(attribute);

/**
 * getResourcecategoryById: get resource-category by id
 * @param {*} req
 * @returns
 */
const getAttributeById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    return getAttributeUsingId(attribute, { id: requestParam });
};
/**
 * attributeReorder : to updated position of attribute
 * @param {*} req
 */
const attributeReorder = async (req) => {
    const requestBody = req.body;
    validateSchema(attributeOrderSchema, requestBody);
    // eslint-disable-next-line no-restricted-syntax

    return attributeOrderUpdate(requestBody);
};
module.exports = {
    saveAttribute,
    deleteAttribute,
    updateAttribute,
    getAllAttribute,
    getAttributeById,
    attributeReorder,

};
