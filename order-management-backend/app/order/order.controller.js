const { Op: OP } = require('sequelize');
const { order, process } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const { isExist, updateData } = require('../utils/common');
const {
    addOrderData, getOrderList, getOrderUsingId,
    validateOrderDependencies, deleteOrderData,
} = require('./order.service');
const { orderPostSchema, orderPutSchema, orderGetSchema } = require('./validation/orderSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveOrder: to create a new order
 * @param {*} req
 * @returns
 */
const saveOrder = async (req) => {
    const requestBody = req.body;
    validateSchema(orderPostSchema, requestBody);
    const errorArray = [];
    const listToAdd = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of requestBody) {
        item.createdBy = req.user.id;
        item.updatedBy = req.user.id;
        const {
            KDAUF, KDPOS, WERKS, VORNR, CHARG,
        } = item;
        const additionalCondition = {
            KDAUF,
            KDPOS,
            WERKS,
            VORNR,
            CHARG,
        };
        // eslint-disable-next-line no-await-in-loop
        const { updatedData, errors } = await validateOrderDependencies(
            item,
            additionalCondition,
        );
        if (errors.length) { // if have error message
            errorArray.push(...errors);
        } else {
            listToAdd.push(updatedData);
        }
    }
    if (errorArray.length) {
        throwIf(true, new BaseError(message.HTTP_UNPROCESSABLE_ENTITY, message.ORDER_CREATE_FAILURE, '', errorArray));
    }
    const result = await addOrderData(order, listToAdd, message.ORDER_CREATE_SUCCESS);
    return result;
};

/**
 * deleteOrder: delete order using id
 * @param {*} req
 * @returns
 */
const deleteOrder = async (req) => {
    const requestBody = req.body;
    const {
        KDAUF, KDPOS, WERKS, VORNR, CHARG,
    } = requestBody;
    validateSchema(orderGetSchema, requestBody);
    const additionalCondition = {
        KDAUF,
        KDPOS,
        WERKS,
        VORNR,
        CHARG,
    };
    const condition = {
        ...additionalCondition,
    };

    await isExist(order, condition, message.ORDER_NOT_FOUND, 'EXIST');

    return deleteOrderData(order, condition, message.ORDER_DELETE_SUCCESS);
};

/**
 * updateOrder : update order by id
 * @param {*} req
 * @returns
 */
const updateOrder = async (req) => {
    const { id } = req.params;
    const requestBody = req.body;
    validateSchema(orderPutSchema, requestBody);
    await isExist(order, { id: { [OP.not]: id }, KDAUF: requestBody.KDAUF }, message.ROLE_ALREADY_EXIST, 'DUPLICATE');
    return updateData(order, req, message.ORDER_UPDATE_SUCCESS);
};

/**
 * getAllOrder: to get the list of all order list
 * @param {*} req
 * @returns
 */
const getAllOrder = async (req) => {
    const conditionObj = {
        attributes: ['id', 'KDAUF', 'KDPOS', 'WERKS', 'VORNR', 'VORNR_TXT',
            'NAME1', 'HALL', 'MATNR_P', 'ARKTX_P', 'MATKL_P', 'THICKNESS_P', 'WIDTH_P',
            'LENGTH_P', 'GUETE_P', 'ATTES_P', 'SDATE', 'FDATE', 'GAMNG', 'GMEIN', 'GMNGA',
            'MachId', 'STATUS_KB', 'CHARG', 'MATNR_S', 'PICK_TXT', 'LGORT', 'LGPBE', 'MATKL_S',
            'THICKNESS_S', 'WIDTH_S', 'LENGTH_S', 'GUETE_S', 'ATTES_S', 'RSNUM', 'RSPOS'],
        include: [{
            attributes: ['id', 'name'],
            model: process,

        }],
    };

    return getOrderList(order, conditionObj);
};

/**
 * getOrganisationById: get organisation by id
 * @param {*} req
 * @returns
 */
const getOrderById = async (req) => {
    const requestBody = req.body;
    validateSchema(orderGetSchema, requestBody);
    const {
        KDAUF, KDPOS, WERKS, VORNR, CHARG,
    } = requestBody;
    const additionalCondition = {
        KDAUF,
        KDPOS,
        WERKS,
        VORNR,
        CHARG,
    };
    const conditionObj = {
        attributes: ['id', 'KDAUF', 'KDPOS', 'WERKS', 'VORNR', 'VORNR_TXT',
            'NAME1', 'HALL', 'MATNR_P', 'ARKTX_P', 'MATKL_P', 'THICKNESS_P', 'WIDTH_P',
            'LENGTH_P', 'GUETE_P', 'ATTES_P', 'SDATE', 'FDATE', 'GAMNG', 'GMEIN', 'GMNGA',
            'MachId', 'STATUS_KB', 'CHARG', 'MATNR_S', 'PICK_TXT', 'LGORT', 'LGPBE', 'MATKL_S',
            'THICKNESS_S', 'WIDTH_S', 'LENGTH_S', 'GUETE_S', 'ATTES_S', 'RSNUM', 'RSPOS'],
        include: [{
            model: process,
            attributes: ['id', 'name'],
        }],
    };

    return getOrderUsingId(order, conditionObj, { ...additionalCondition });
};
const getOrderStatus = async (req) => {
    const requestBody = req.body;
    validateSchema(orderGetSchema, requestBody);
    const {
        KDAUF, KDPOS, WERKS,
    } = requestBody;
    const additionalCondition = {
        KDAUF,
        KDPOS,
        WERKS,
    };
    const conditionObj = {
        attributes: ['id', 'KDAUF', 'KDPOS', 'WERKS', 'VORNR', 'VORNR_TXT',
            'NAME1', 'HALL', 'MATNR_P', 'ARKTX_P', 'MATKL_P', 'THICKNESS_P', 'WIDTH_P',
            'LENGTH_P', 'GUETE_P', 'ATTES_P', 'SDATE', 'FDATE', 'GAMNG', 'GMEIN', 'GMNGA',
            'MachId', 'STATUS_KB', 'CHARG', 'MATNR_S', 'PICK_TXT', 'LGORT', 'LGPBE', 'MATKL_S',
            'THICKNESS_S', 'WIDTH_S', 'LENGTH_S', 'GUETE_S', 'ATTES_S', 'RSNUM', 'RSPOS'],
    };

    return getOrderUsingId(order, conditionObj, { ...additionalCondition });
};

module.exports = {
    saveOrder,
    deleteOrder,
    updateOrder,
    getAllOrder,
    getOrderById,
    getOrderStatus,
};
