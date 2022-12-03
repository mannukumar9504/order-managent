const { sequelize } = require('../../DB/models');
const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');

const statusMessage = require('../../config/status-message');

const addData = async (model, body, message) => sequelize.transaction(async (transaction) => {
    await model.create(body, { transaction });
    return { message };
});

const preValidateData = async (req, model, additionalCondition = {}) => {
    const id = req.params.id || req.body.id;

    const conditionObj = {
        where: {
            id,
            ...additionalCondition,
        },
    };
    const result = await model.count(conditionObj);
    throwIfNot(result, new BaseError(
        statusMessage.NOT_FOUND,
        statusMessage.ID_DOES_NOT_EXIST,
    ));

    throwIfNot(
        req.body,
        new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.PROVIDE_DATA_TO_UPDATE,
        ),
    );
};
const preValidateDataBySAP = async (req, model, additionalCondition = {}) => {
    const { sapIdentifier } = req.params;

    const conditionObj = {
        where: {
            sapIdentifier,
            ...additionalCondition,
        },
    };
    const result = await model.count(conditionObj);
    throwIfNot(result, new BaseError(
        statusMessage.NOT_FOUND,
        statusMessage.SAP_IDENTIFIER_DOES_NOT_EXIST,
    ));

    throwIfNot(
        req.body,
        new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.PROVIDE_DATA_TO_UPDATE,
        ),
    );
};

const updateData = async (model, req, message) => {
    req.body.updatedBy = req.user.id;
    const { id } = req.params;
    const conditionObj = {
        where: {
            id,
        },
    };
    return sequelize.transaction(async (transaction) => {
        await model.update(req.body, conditionObj, { transaction });
        return { message };
    });
};

const deleteData = async (model, req, message) => {
    const { id } = req.params;
    const conditionObj = {
        where: {
            id,
        },
    };
    return sequelize.transaction(async (transaction) => {
        await model.destroy(conditionObj, { transaction });
        return { message };
    });
};

const getList = async (model, condition) => {
    const result = await model.findAll(condition);
    return { data: (result || []) };
};

const getListByColumn = async (model, conditionObj, colVal) => {
    // eslint-disable-next-line no-param-reassign
    conditionObj.where = colVal;
    const result = await model.findOne({ ...conditionObj, logging: true });
    throwIfNot(result, new BaseError(statusMessage.NOT_FOUND, statusMessage.ID_DOES_NOT_EXIST));
    return { data: result };
};

const isExist = async (model, whereCondition, message, method) => {
    const conditionObj = {
        where: { ...whereCondition },
    };
    const result = await model.count(conditionObj);
    if (method === 'DUPLICATE') {
        throwIf(result, new BaseError(
            statusMessage.DUPLICATE,
            message,
        ));
    } else {
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            message,
        ));
    }
};

module.exports = {
    addData,
    updateData,
    getList,
    getListByColumn,
    isExist,
    preValidateData,
    deleteData,
    preValidateDataBySAP,
};
