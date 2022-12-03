const { Op: OP } = require('sequelize');
const { resource_type: resourceType, resource } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    getList, updateData, getListByColumn, addData, isExist,
    preValidateData,
    deleteData,
} = require('../utils/common');
const { categoryPostSchema } = require('../resource/validation/resourceSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveTypeRTesource: to create a new typeResource
 * @param {*} req
 * @returns
 */
const saveTypeResource = async (req) => {
    const requestBody = req.body;
    validateSchema(categoryPostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;

    await isExist(resourceType, { name: requestBody.name }, message.RESOURCE_TYPE_ALREADY_EXIST, 'DUPLICATE');
    return addData(resourceType, req.body, message.RESOURCE_TYPE_CREATE_SUCCESS);
};

/**
 * deleteTypeResource: delete typeResource using id
 * @param {*} req
 * @returns
 */
const deleteTypeResource = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    const condition = {
        id: requestParam,
    };

    await isExist(resourceType, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    const linked = await resource.count({ where: { typeId: requestParam } });
    throwIf(linked, new BaseError(message.BAD_REQUEST, message.RESOURCE_TYPE_IN_USE));
    return deleteData(resourceType, req, message.RESOURCE_TYPE_DELETE_SUCCESS);
};

/**
 * updateTypeResource : update type resource by id
 * @param {*} req
 * @returns
 */
const updateTypeResource = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    validateSchema(categoryPostSchema, requestBody);
    await preValidateData(req, resourceType);
    await isExist(resourceType, { id: { [OP.not]: requestParam }, name: req.body.name }, message.RESOURCE_TYPE_ALREADY_EXIST, 'DUPLICATE');
    return updateData(resourceType, req, message.RESOURCE_TYPE_UPDATE_SUCCESS);
};

/**
 * getAllTypeResource: to get the list of all type of resources
 * @param {*} req
 * @returns
 */
const getAllTypeResource = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt', 'sapIdentifier'],
    };

    return getList(resourceType, conditionObj);
};

/**
 * getTypeResourcenById: get type resource by id
 * @param {*} req
 * @returns
 */
const getTypeResourceById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt', 'sapIdentifier'],
    };

    return getListByColumn(resourceType, conditionObj, { id: requestParam });
};

module.exports = {
    saveTypeResource,
    deleteTypeResource,
    updateTypeResource,
    getAllTypeResource,
    getTypeResourceById,
};
