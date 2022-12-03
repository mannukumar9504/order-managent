const { Op: OP } = require('sequelize');
const { resource } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    updateData, addData, isExist, preValidateData, deleteData,
    preValidateDataBySAP,
} = require('../utils/common');
const {
    categoryTypeManufacturerValid,
    getAllResourceList, getResourceUsingId,
    validateResourceDependencies, createBulkdata,
    updateDataUsingSAPID,
    checkResourceRelation,
} = require('./resource.service');
const { resourcePostSchema, resourceSapPostSchema, resourceSapPutSchema } = require('./validation/resourceSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');
const statusMessage = require('../../config/status-message');

/**
 * saveResource: to create a new resoiurce
 * @param {*} req
 * @returns
 */
const saveResource = async (req) => {
    const requestObj = req.body;
    validateSchema(resourcePostSchema, requestObj);
    requestObj.createdBy = req.user.id;
    requestObj.updatedBy = req.user.id;
    await categoryTypeManufacturerValid(requestObj);
    await isExist(resource, { name: requestObj.name }, message.RESOURCE_ALREADY_EXIST, 'DUPLICATE');
    return addData(resource, requestObj, message.RESOURCE_CREATE_SUCCESS);
};

/**
 * deleteResource: delete resource using id
 * @param {*} req
 * @returns
 */
const deleteResource = async (req) => {
    const requestParam = req?.params?.id;
    throwIfNot(requestParam, new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID));

    await isExist(resource, { id: requestParam }, message.ID_DOES_NOT_EXIST, 'EXIST');
    await checkResourceRelation(requestParam);
    return deleteData(resource, req, message.RESOURCE_DELETE_SUCCESS);
};

/**
 * updateResource : update resource by id
 * @param {*} req
 * @returns
 */
const updateResource = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;
    throwIfNot(requestParam, new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID));
    validateSchema(resourcePostSchema, requestBody);
    await preValidateData(req, resource);
    await isExist(resource, { id: { [OP.not]: requestParam }, name: req.body.name }, message.RESOURCE_ALREADY_EXIST, 'DUPLICATE');
    await categoryTypeManufacturerValid(requestBody);
    return updateData(resource, req, message.RESOURCE_UPDATE_SUCCESS);
};

/**
 * getAllResource: to get the list of all rresources
 * @param {*} req
 * @returns
 */
const getAllResource = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'sapIdentifier', 'createdAt'],
        where: { isDeleted: false },
    };

    const result = await getAllResourceList(conditionObj);
    return result;
};

/**
 * getResourceById: get resource by id
 * @param {*} req
 * @returns
 */
const getResourceById = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(requestParam, new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID));
    const conditionObj = {
        attributes: ['id', 'name', 'sapIdentifier', 'createdAt'],
        where: {
            isDeleted: 0,
            id: requestParam,
        },
    };

    return getResourceUsingId(conditionObj);
};

/**
 * to create resource by sap machine
 * @param {*} req
 * @returns
 */
const createMultipleResources = async (req) => {
    const errorArray = [];
    const listToAdd = [];
    const requestBody = req.body;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of requestBody) {
        validateSchema(resourceSapPostSchema, item);
        item.createdBy = req.user.id;
        item.updatedBy = req.user.id;
        // eslint-disable-next-line no-await-in-loop
        const { updatedData, errors } = await validateResourceDependencies(
            item,
            { [OP.or]: [{ name: item.name }, { sapIdentifier: item.sapIdentifier }] },
        );
        if (errors.length) { // if have error message
            errorArray.push(...errors);
        } else {
            delete updatedData.category;
            delete updatedData.type;
            delete updatedData.manufacturer;
            listToAdd.push(updatedData);
        }
    }

    const result = await createBulkdata(listToAdd);
    if (errorArray.length) {
        throwIf(true, new BaseError(statusMessage.HTTP_UNPROCESSABLE_ENTITY, message.RESOURCE_CREATE_FAILURE, '', errorArray));
    }
    return result;
};

/**
 *dleetResourceBySAPId: delete resource by sapId
 * @param {*} req
 * @returns
 */
const deleteResourceBySAPId = async (req) => {
    const requestParam = req?.params?.sapIdentifier;
    throwIfNot(requestParam, new BaseError(message.NOT_FOUND, message.MISSING_SAP_IDENTIFIER));

    await isExist(resource, { sapIdentifier: requestParam }, message.ID_DOES_NOT_EXIST, 'EXIST');
    const result = await getResourceBySAPId(req);
    const resourceId = result.data.id;
    await checkResourceRelation(resourceId);
    req.params.id = resourceId;
    return deleteData(resource, req, message.RESOURCE_DELETE_SUCCESS);
};

/**
 * updateResourceBySAPId:  update resource by sapId
 * @param {*} req
 * @returns
 */
const updateResourceBySAPId = async (req) => {
    const { sapIdentifier } = req.params;
    throwIfNot(sapIdentifier, new BaseError(message.NOT_FOUND, message.MISSING_SAP_IDENTIFIER));

    const requestBody = req.body;
    validateSchema(resourceSapPutSchema, requestBody);

    await preValidateDataBySAP(req, resource);
    await isExist(resource, { sapIdentifier: { [OP.not]: sapIdentifier }, name: req.body.name }, message.RESOURCE_ALREADY_EXIST, 'DUPLICATE');
    const { updatedData, errors } = await validateResourceDependencies(
        requestBody,
        { name: requestBody.name, sapIdentifier: { [OP.not]: requestBody.sapIdentifier } },
    );
    throwIf(errors.length, new BaseError(statusMessage.HTTP_UNPROCESSABLE_ENTITY, message.RESOURCE_CREATE_FAILURE, '', errors));
    updatedData.updatedBy = req.user.id;
    return updateDataUsingSAPID(resource,
        sapIdentifier,
        updatedData,
        message.RESOURCE_UPDATE_SUCCESS
    );
};

/**
 * getResourceBySAPId:  get resource data using sap id
 * @param {*} req
 * @returns
 */
const getResourceBySAPId = async (req) => {
    const requestParam = req.params.sapIdentifier;
    throwIfNot(requestParam, new BaseError(message.NOT_FOUND, message.MISSING_SAP_IDENTIFIER));
    const conditionObj = {
        attributes: ['id', 'name', 'sapIdentifier'],
        where: {
            sapIdentifier: requestParam,
        },
    };

    return getResourceUsingId(conditionObj);
};

module.exports = {
    saveResource,
    deleteResource,
    updateResource,
    getAllResource,
    getResourceById,
    createMultipleResources,
    deleteResourceBySAPId,
    updateResourceBySAPId,
    getResourceBySAPId,
};
