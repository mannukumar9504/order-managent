const { BaseError } = require('../../services/errors');
const { throwIfNot } = require('../../services/assert');
const statusMessage = require('../../config/status-message');
const {
    attribute_group: attributeGroup,
    attribute_type: attributeType,
    attribute,
    sequelize,
} = require('../../DB/models/index');
const { addData, getList, getListByColumn, isExist } = require('../utils/common');

const conditionObj = {
    attributes: ['id', 'position', 'description', 'isChangable', 'isRequired', 'label', 'sapIdentifier', 'createdAt'],
    include: [{
        model: attributeGroup,
        attributes: ['id', 'name', 'createdAt'],
        as: 'attributeGroup',
    }, {
        model: attributeType,
        attributes: ['id', 'name', 'createdAt'],
        as: 'attributeType',
    }],
};

const createAttribute = async (model, body, message) => {
    if (body?.attributeGroupId) {
        const { attributeGroupId } = body;
        const condition = { where: { id: attributeGroupId } };
        const result = await attributeGroup.count(condition);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.ATTRIBUTE_GROUP_NOT_FOUND,
        ));
    }
    if (body?.attributeTypeId) {
        const { attributeTypeId } = body;
        const condition = { where: { id: attributeTypeId } };
        const result = await attributeType.count(condition);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.ATTRIBUTE_TYPE_NOT_FOUND,
        ));
    }
    return addData(model, body, message);
};

const getAttributeList = async (model) => getList(model, conditionObj);

const getAttributeUsingId = async (model, wherecondition) => getListByColumn(
    model,
    conditionObj,
    wherecondition,
);
const attributeTypeGroupValid = async (body) => {
    const condition = {
        where: {},
    };

    if (body?.attributeGroupId) {
        condition.where = {
            id: body?.attributeGroupId,
        };
        const result = await attributeGroup.count(condition);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.ATTRIBUTE_GROUP_NOT_FOUND,
        ));
    }

    if (body?.attributeTypeId) {
        condition.where = {
            id: body?.attributeTypeId,
        };
        const result = await attributeType.count(condition);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.ATTRIBUTE_TYPE_NOT_FOUND,
        ));
    }
    return true;
};
const attributeOrderUpdate = async (requestBody) => sequelize.transaction(async (transaction) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of requestBody) {
        // eslint-disable-next-line no-await-in-loop
        await isExist(attribute, { id: item.attribute }, statusMessage.ATTRIBUTE_NOT_FOUND, 'EXIST');
        // eslint-disable-next-line no-await-in-loop
        await attribute.update(
            item,
            { where: { id: item.attribute } },
            { transaction },
        );
    }
    return { message: statusMessage.ORDER_UPDATED };
});

module.exports = {
    createAttribute,
    getAttributeList,
    getAttributeUsingId,
    attributeTypeGroupValid,
    attributeOrderUpdate,
};
