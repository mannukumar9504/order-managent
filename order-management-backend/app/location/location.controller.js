const { Op: OP } = require('sequelize');
const { location, resource } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    getList, addData, updateData, getListByColumn, isExist,
    preValidateData,
    deleteData,
} = require('../utils/common');
const { locationPostSchema } = require('./validation/locationSchemaValidatrion');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');
const statusMessage = require('../../config/status-message');

/**
 * saveLocation: to save the locations
 * @param {*} req
 * @returns
 */
const saveLocation = async (req) => {
    const requestBody = req.body;
    validateSchema(locationPostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;

    await isExist(location, { name: requestBody.name }, message.LOCATION_ALREADY_EXIST, 'DUPLICATE');
    return addData(location, requestBody, message.LOCATION_CREATE_SUCCESS);
};

/**
 * deleteLocation: to delete the locations
 * @param {*} req
 * @returns
 */
const deleteLocation = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );

    await isExist(location, { id: requestParam }, message.ID_DOES_NOT_EXIST, 'EXIST');
    const linked = await resource.count({ where: { locationId: requestParam } });
    throwIf(linked, new BaseError(statusMessage.BAD_REQUEST, statusMessage.LOCATION_IN_USE));
    return deleteData(location, req, message.LOCATION_DELETE_SUCCESS);
};

/**
 * updateLocation:  to update the locations
 * @param {*} req
 * @returns
 */
const updateLocation = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;
    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );
    validateSchema(locationPostSchema, requestBody);
    await preValidateData(req, location);
    await isExist(location, { id: { [OP.not]: requestParam }, name: req.body.name }, message.LOCATION_ALREADY_EXIST, 'DUPLICATE');
    return updateData(location, req, message.LOCATION_UPDATE_SUCCESS);
};

/**
 * getAllLocations: to get the list of locations
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllLocations = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt']
    };
    return getList(location, conditionObj);
};

/**
 * getLocationById: to get the location by id
 * @param {*} req
 * @returns
 */
const getLocationById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };
    return getListByColumn(location, conditionObj, { id: requestParam });
};

module.exports = {
    saveLocation,
    deleteLocation,
    updateLocation,
    getAllLocations,
    getLocationById,
};
