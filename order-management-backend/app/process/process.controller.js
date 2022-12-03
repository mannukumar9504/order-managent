const { Op: OP } = require('sequelize');
const {
    process,
    attribute_group: attributeGroup,
    process_step: processStep,
    resource,
} = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    getList, updateData, getListByColumn, addData, isExist,
    deleteData, preValidateData,
} = require('../utils/common');
const { processPostSchema } = require('./validation/processSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');
const { checkProcessRelation, getAttributeGroupLinkedProcess } = require('./process.service');

/**
 * savesaveProcess: to create a new Process
 * @param {*} req
 * @returns
 */
const saveProcess = async (req) => {
    const requestBody = req.body;
    validateSchema(processPostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;

    await isExist(process, { name: req.body.name }, message.PROCESS_ALREADY_EXIST, 'DUPLICATE');
    return addData(process, req.body, message.PROCESS_CREATE_SUCCESS);
};

/**
 * deleteProcess: delete process using id
 * @param {*} req
 * @returns
 */
const deleteProcess = async (req) => {
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

    await isExist(process, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    await checkProcessRelation(requestParam);
    return deleteData(process, req, message.PROCESS_DELETE_SUCCESS);
};

/**
 * updateProcess : update process by id
 * @param {*} req
 * @returns
 */
const updateProcess = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    validateSchema(processPostSchema, requestBody);
    await preValidateData(req, process);
    await isExist(process, { id: { [OP.not]: requestParam }, name: req.body.name }, message.PROCESS_ALREADY_EXIST, 'DUPLICATE');
    return updateData(process, req, message.PROCESS_UPDATE_SUCCESS);
};

/**
 * getAllProcess: to get the list of all processes
 * @param {*} req
 * @returns
 */
const getAllProcess = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };

    return getList(process, conditionObj);
};

/**
 * getTypeResourcenById: get type resource by id
 * @param {*} req
 * @returns
 */
const getProcessById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };

    return getListByColumn(process, conditionObj, { id: requestParam, isDeleted: false });
};
/**
 *attributesByProcessId:  get attributes by process Id
 * @param {*} req
 */
const attributesByProcessId = async (req) => {
    const requestParam = req.params.id;
    await isExist(attributeGroup, { processId: requestParam }, message.ID_DOES_NOT_EXIST, 'EXIST');
    return getAttributeGroupLinkedProcess(requestParam);
};
/**
 * ProcessStepByProcessId: get process steps by id,
 * @param {*} req
 */

const ProcessStepByProcessId = async (req) => {
    const { processId } = req.params;
    await isExist(processStep, { processId }, message.ID_DOES_NOT_EXIST, 'EXIST');
    const condition = {
        attributes: ['id', 'position', 'description', 'label', 'attribute', 'createdAt'],
        where: { processId },
        include: [
            {
                model: resource,
                as: 'resources',
                attributes: ['id', 'name'],
                through: {
                    attributes: [],
                },
            },
        ],
    };
    return getList(processStep, condition);
};

module.exports = {
    saveProcess,
    deleteProcess,
    updateProcess,
    getAllProcess,
    getProcessById,
    attributesByProcessId,
    ProcessStepByProcessId,
};
