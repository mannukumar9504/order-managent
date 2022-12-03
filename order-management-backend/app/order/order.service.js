const { sequelize, order, process } = require('../../DB/models');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');

const statusMessage = require('../../config/status-message');

const addOrderData = async (model, orderData, message) => sequelize.transaction(
    async (transaction) => {
        const result = await model.bulkCreate(orderData, { transaction });
        throwIfNot(result, new BaseError(
            statusMessage.BAD_REQUEST,
            statusMessage.ORDER_NOT_CREATED,
        ));
        return { message };
    },
);
const validateOrderDependencies = async (item, condition = {}) => {
    const updateParam = item;
    const errors = [];

    const conditionObj = {
        where: { ...condition },
    };
    const result = await order.count(conditionObj);
    if (result) {
        errors.push({
            KDAUF: item.KDAUF,
            message: statusMessage.RESOURCE_ALREADY_EXIST,
        });
    }
    if (item?.processId) {
        const result1 = await process.count({ where: { id: item.processId } });
        if (!result1) {
            errors.push({
                processId: item.processId,
                KDAUF: item.KDAUF,
                message: statusMessage.PROCESS_NOT_FOUND,
            });
        }
    }
    return {
        updatedData: updateParam,
        errors,
    };
};

const updateOrderData = async (model, req, condition, message) => {
    const conditionObj = {
        where: condition,
    };
    const result = await model.count(conditionObj);
    throwIfNot(result, new BaseError(
        statusMessage.NOT_FOUND,
        statusMessage.ORDER_NOT_FOUND,
    ));

    throwIfNot(
        req.body,
        new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.PROVIDE_DATA_TO_UPDATE,
        ),
    );
    req.body.updatedBy = req.user.id;
    return sequelize.transaction(async (transaction) => {
        await model.update(req.body, conditionObj, { transaction });
        return { message };
    });
};

const getOrderList = async (model, condition) => {
    const conditionObj = condition;
    // eslint-disable-next-line no-param-reassign
    const result = await model.findAll(conditionObj);
    return { data: result };
};

const getOrderUsingId = async (model, conditionObj, colVal) => {
    const condition = conditionObj;
    // eslint-disable-next-line no-param-reassign
    condition.where = colVal;

    const result = await model.findOne(conditionObj);
    return { data: result };
};
const deleteOrderData = async (model, conditionObj, message) => sequelize
    .transaction(async (transaction) => {
        await model.destroy({ where: conditionObj }, { transaction });
        return { message };
    });

module.exports = {
    addOrderData,
    updateOrderData,
    getOrderList,
    getOrderUsingId,
    validateOrderDependencies,
    deleteOrderData,
};
