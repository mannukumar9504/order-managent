const { Op: OP } = require('sequelize');
const { group } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    getList, updateData, getListByColumn, addData, isExist,
    deleteData,
    preValidateData,
} = require('../utils/common');
const { checkGroupRelation } = require('./group.service');
const { groupPostSchema } = require('./validation/groupValidationSchema');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveGroup: to create a new group
 * @param {*} req
 * @returns
 */
const saveGroup = async (req) => {
    const requestBody = req.body;
    validateSchema(groupPostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;

    await isExist(group, { name: req.body.name }, message.GROUP_ALREADY_EXIST, 'DUPLICATE');
    return addData(group, req.body, message.GROUP_CREATE_SUCCESS);
};

/**
 * deleteGroup: delete Group using id
 * @param {*} req
 * @returns
 */
const deleteGroup = async (req) => {
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

    await isExist(group, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    await checkGroupRelation(requestParam);
    return deleteData(group, req, message.GROUP_DELETE_SUCCESS);
};

/**
 * updateGroup : update type group by id
 * @param {*} req
 * @returns
 */
const updateGroup = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;
    validateSchema(groupPostSchema, requestBody);
    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    await preValidateData(req, group);
    await isExist(group, { id: { [OP.not]: requestParam }, name: req.body.name }, message.GROUP_ALREADY_EXIST, 'DUPLICATE');
    return updateData(group, req, message.GROUP_UPDATE_SUCCESS);
};

/**
 * getAllGroup: to get the list of all groups
 * @param {*} req
 * @returns
 */
const getAllGroup = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };

    return getList(group, conditionObj);
};

/**
 * getGroupById: get group by id
 * @param {*} req
 * @returns
 */
const getGroupById = async (req) => {
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

    return getListByColumn(group, conditionObj, { id: requestParam });
};

module.exports = {
    saveGroup,
    getAllGroup,
    getGroupById,
    updateGroup,
    deleteGroup,
};
