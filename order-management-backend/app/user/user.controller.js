const { Op: OP } = require('sequelize');
const bcrypt = require('bcrypt');
const {
    user,
    user_resource: userResource,
} = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const { SALT_ROUNDS } = require('../../config/constant');
const {
    addUserData,
    updateReferenceTable,
    userRefCondition,
    getUserList,
} = require('./user.service');
const {
    updateData, getListByColumn, isExist,
    preValidateData,
} = require('../utils/common');
const { userPostSchema, userPutSchema } = require('./validation/userSchemaValidtion');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveUser: to creat a new user
 * @param {*} req
 * @param {*} res
 * @returns
 */
const saveUser = async (req) => {
    const requestBody = req.body;
    validateSchema(userPostSchema, requestBody);
    await isExist(user, { email: requestBody.email }, message.USER_ALREADY_EXIST, 'DUPLICATE');
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    requestBody.password = bcrypt.hashSync(requestBody?.password, salt);
    requestBody.userSalt = salt;
    return addUserData(user, requestBody, message.USER_CREATE_SUCCESS);
};

/**
 * deleteUser: to delete user usin it's id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteUser = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );
    req.body.isDeleted = true;
    await isExist(user, { id: requestParam }, message.ID_DOES_NOT_EXIST, 'EXIST');
    return updateData(user, req, message.USER_DELETE_SUCCESS);
};

/**
 * updateUser: to update an user using it's id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateUser = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;

    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );
    validateSchema(userPutSchema, requestBody);
    await preValidateData(req, user, { isDeleted: false });
    await isExist(user, { id: { [OP.not]: requestParam }, email: requestBody.email }, message.USER_ALREADY_EXIST, 'DUPLICATE');
    if (req?.body?.resources?.length) {
        await updateReferenceTable(req, userResource);
    }
    return updateData(user, req, message.USER_UPDATE_SUCCESS);
};

/**
 * getAllUsers: to get the list of all created and deleted users
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllUsers = async (req) => {
    const conditionObj = {
        attributes: ['id', 'firstName', 'lastName', 'email', 'contactNumber', 'createdAt'],
        include: userRefCondition,
    };
    return getUserList(user, conditionObj);
};

/**
 * getUserById: to get user by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUserById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(message.NOT_FOUND, message.PLEASE_PROVIDE_ID),
    );
    const conditionObj = {
        attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt'],
        include: userRefCondition,
    };
    const result = await getListByColumn(user, conditionObj, {
        id: requestParam,
        isDeleted: false,
    });
    return { data: result };
};

module.exports = {
    saveUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById,
};
