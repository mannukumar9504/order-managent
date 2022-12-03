const { Op: OP } = require('sequelize');
const { role, user } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    getList, updateData, getListByColumn, addData, isExist,
    deleteData,
    preValidateData,
} = require('../utils/common');
const { rolePostSchema } = require('./validation/roleSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveRole: to create a new role
 * @param {*} req
 * @return
 */
const saveRole = async (req) => {
    const requestBody = req.body;
    validateSchema(rolePostSchema, requestBody);

    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;
    await isExist(role, { name: requestBody.name }, message.ROLE_ALREADY_EXIST, 'DUPLICATE');
    return addData(role, requestBody, message.ROLE_CREATE_SUCCESS);
};

/**
 * deleteRole: delete role using id
 * @param {*} req
 * @returns
 */
const deleteRole = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );

    await isExist(role, { id: requestParam }, message.ID_DOES_NOT_EXIST, 'EXIST');
    const linked = await user.count({ where: { roleId: requestParam } });
    throwIf(linked, new BaseError(message.BAD_REQUEST, message.ROLE_IN_USE));
    return deleteData(role, req, message.ROLE_DELETE_SUCCESS);
};

/**
 * updateRole : update role by id
 * @param {*} req
 * @returns
 */
const updateRole = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;
    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );

    validateSchema(rolePostSchema, requestBody);
    await preValidateData(req, role);
    await isExist(role, { id: { [OP.not]: requestParam }, name: req.body.name }, message.ROLE_ALREADY_EXIST, 'DUPLICATE');
    return updateData(role, req, message.ROLE_UPDATE_SUCCESS);
};

/**
 * getAllRole: to get the list of all roles
 * @param {*} req
 * @returns
 */
const getAllRole = async (req) => {
    const conditionObj = {
        attribute: ['id', 'name', 'createdAt'],
    };

    return getList(role, conditionObj);
};

/**
 * getRoleById: get role by id
 * @param {*} req
 * @returns
 */
const getRoleById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };

    return getListByColumn(role, conditionObj, { id: requestParam });
};

module.exports = {
    saveRole,
    deleteRole,
    updateRole,
    getAllRole,
    getRoleById,
};
