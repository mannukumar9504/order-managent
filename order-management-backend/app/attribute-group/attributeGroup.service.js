const { Op: OP } = require('sequelize');
const { getList, addData, updateData } = require('../utils/common');
const {
    process,
    attribute,
    attribute_type: attributeType,
    attribute_group: attributeGroup,
} = require('../../DB/models');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const statusMessage = require('../../config/status-message');

const condition = {
    attributes: ['id', 'name', 'createdAt'],
    include: [
        {
            model: process,
            attributes: ['id', 'name'],
        },
    ],
};

const getAttributeGroupUsingId = async (model, colVal) => {
    // eslint-disable-next-line no-shadow
    const conditionObj = { ...condition };
    conditionObj.where = colVal;

    const result = await model.findOne(conditionObj);
    return { data: result };
};

const getAllAttrGroupList = async (model) => getList(model, condition);

const addAttributeGroupData = async (model, requestBody, message) => {
    if (requestBody?.processId) {
        const findCondition = {
            where: { id: requestBody?.processId },
        };
        const result = await process.count(findCondition);
        throwIfNot(result, new BaseError(statusMessage.NOT_FOUND, statusMessage.PROCESS_NOT_FOUND));
    }
    return addData(model, requestBody, message);
};

const updateAttributeGroupData = async (model, req, message) => {
    const requestBody = req.body;
    if (requestBody?.processId) {
        const findCondition = {
            where: { id: requestBody?.processId },
        };
        const result = await process.count(findCondition);
        throwIfNot(result, new BaseError(statusMessage.NOT_FOUND, statusMessage.PROCESS_NOT_FOUND));
    }
    return updateData(model, req, message);
};
const getLinkedAttributes = async (requesParam) => {
    const attrcondition = {
        attributes: ['id', 'position',
            'description', 'label',
            'isChangable', 'isRequired'],
        include: [
            {
                model: attributeType,
                as: 'attributeType',
                attributes: ['id', 'name'],
            },
        ],
        where: { attributeGroupId: requesParam },
    };
    const associatedAttributes = await attribute.findAll(attrcondition);
    throwIfNot(associatedAttributes, new BaseError(
        statusMessage.BAD_REQUEST,
        statusMessage.ATTRIBUTE_NOT_FOUND,
    ));
    return { result: associatedAttributes };
};

module.exports = {
    getAttributeGroupUsingId,
    getAllAttrGroupList,
    addAttributeGroupData,
    updateAttributeGroupData,
    getLinkedAttributes,
};
