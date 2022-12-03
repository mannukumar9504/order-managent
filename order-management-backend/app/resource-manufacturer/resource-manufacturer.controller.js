const { Op: OP } = require('sequelize');
const { resource_manufacturer: resourceManufacturer, resource } = require('../../DB/models');
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
 * saveResourceManufacturer: to create a new resourceManufacturer
 * @param {*} req
 * @returns
 */
const saveResourceManufacturer = async (req) => {
    const requestBody = req.body;
    validateSchema(categoryPostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;
    await isExist(resourceManufacturer, { name: requestBody.name }, message.RESOURCE_MANUFACTURER_ALREADY_EXIST, 'DUPLICATE');
    return addData(resourceManufacturer, requestBody, message.RESOURCE_MANUFACTURER_CREATE_SUCCESS);
};

/**
 * deleteResourceManufacturer: delete resourceManufacturer using id
 * @param {*} req
 * @returns
 */
const deleteResourceManufacturer = async (req) => {
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

    await isExist(resourceManufacturer, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    const linked = await resource.count({ where: { manufacturerId: requestParam } });
    throwIf(linked, new BaseError(message.BAD_REQUEST, message.RESOURCE_MANUFACTURER_IN_USE));
    return deleteData(resourceManufacturer, req, message.RESOURCE_MANUFACTURER_DELETE_SUCCESS);
};

/**
 * updateResourceManufacturer : update resource manufacturer by id
 * @param {*} req
 * @returns
 */
const updateResourceManufacturer = async (req) => {
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
    await preValidateData(req, resourceManufacturer);
    await isExist(resourceManufacturer, { id: { [OP.not]: requestParam }, name: req.body.name }, message.RESOURCE_MANUFACTURER_ALREADY_EXIST, 'DUPLICATE');
    return updateData(resourceManufacturer, req, message.RESOURCE_MANUFACTURER_UPDATE_SUCCESS);
};

/**
 * getAllResourceManufacturer: to get the list of all resource manufacturer
 * @param {*} req
 * @returns
 */
const getAllResourceManufacturer = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt', 'sapIdentifier'],
    };

    return getList(resourceManufacturer, conditionObj);
};

/**
 * getResourceManufacturerById: get organisation by id
 * @param {*} req
 * @returns
 */
const getResourceManufacturerById = async (req) => {
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

    return getListByColumn(resourceManufacturer, conditionObj, { id: requestParam });
};

module.exports = {
    saveResourceManufacturer,
    deleteResourceManufacturer,
    updateResourceManufacturer,
    getAllResourceManufacturer,
    getResourceManufacturerById,
};
