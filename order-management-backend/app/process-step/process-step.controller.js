const { Op: OP } = require('sequelize');
const {
    process_step: processStep,
    process_step_resource: processStepResource,
    resource,
} = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const { isExist, deleteData, preValidateData } = require('../utils/common');
const {
    createProcessStep, getListProcessStep, getProcessStepUsingId, updateProcessStepData,
    addResourcesByProcessStep,
} = require('./process-step.service');
const { processStepPostSchema, processStepPutSchema, putResourceSchema } = require('./validation/processStepSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveResourceCategory: to create a new resource-category
 * @param {*} req
 * @returns
 *
 */
const saveProcessStep = async (req) => {
    const requestBody = req.body;
    validateSchema(processStepPostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;
    await isExist(processStep, {
        process_id: requestBody.processId,
        position: requestBody.position,
    }, message.PROCESS_STEP_ALREADY_EXIST, 'DUPLICATE');
    return createProcessStep(processStep, requestBody, message.PROCESS_STEP_CREATE_SUCCESS);
};

/**
 * deleteResourceCategory: delete resource-category using id
 * @param {*} req
 * @returns
 */
const deleteProcessStep = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    await isExist(processStep, { id: requestParam }, message.ID_DOES_NOT_EXIST, 'EXIST');
    return deleteData(processStep, req, message.PROCESS_STEP_DELETE_SUCCESS);
};

/**
 * updateResourceCategory : update resource-category by id
 * @param {*} req
 * @returns
 */
const updateProcessStep = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );

    throwIfNot(requestParam, new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID));
    validateSchema(processStepPutSchema, requestBody);
    await preValidateData(req, processStep);
    await isExist(processStep, { id: { [OP.not]: requestParam }, processId: requestBody?.processId, position: requestBody?.position }, message.RESOURCE_ALREADY_EXIST, 'DUPLICATE');
    return updateProcessStepData(processStep, req, message.PROCESS_STEP_UPDATE_SUCCESS);
};

/**
 * getAllResourceCategory: to get the list of all resource-category
 * @param {*} req
 * @returns
 */
const getAllProcessStep = async (req) => getListProcessStep(processStep);
/**
 * getResourcecategoryById: get resource-category by id
 * @param {*} req
 * @returns
 */
const getProcessStepById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    return getProcessStepUsingId(processStep, { id: requestParam });
};
const addResources = async (req) => {
    const { id } = req.params;
    await isExist(processStep, { id }, message.ID_DOES_NOT_EXIST, 'EXIST');
    validateSchema(putResourceSchema, req.body);
    const { resources } = req.body;
    return addResourcesByProcessStep(req, resources, message.RESOURCES_ADDED);
};

module.exports = {
    saveProcessStep,
    deleteProcessStep,
    updateProcessStep,
    getAllProcessStep,
    getProcessStepById,
    addResources,

};
