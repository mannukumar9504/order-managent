const { Op: OP } = require('sequelize');
const {
    organisation_process: organisationProcess,
    attribute_group: attributeGroup,
    attribute_type: attributeType,
    attribute,
} = require('../../DB/models');

const message = require('../../config/status-message');
const { getList } = require('../utils/common');
const { throwIf, throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const statusMessage = require('../../config/status-message');

const checkProcessRelation = async (requestParam) => {
    const linkedToOrg = await organisationProcess.count({ where: { process_id: requestParam } });
    throwIf(linkedToOrg, new BaseError(message.BAD_REQUEST, message.PROCESS_IN_USE));
};
/**
 * getAttributeGroupLinkedProcess : get attributes goups by process id
 * @param {*} requestParam
 * @returns
 */
const getAttributeGroupLinkedProcess = async (requestParam) => {
    const condition = {
        attributes: ['id', 'name'],
        where: {
            processId: requestParam,
        },
        order: [
            [attribute, 'position', 'ASC'],
        ],
        include: [{
            model: attribute,
            as: 'attributes',
            attributes: ['id', 'position', 'label', 'isRequired', 'isChangable', 'description', 'sapIdentifier'],
            include: {
                model: attributeType,
                as: 'attributeType',
                attributes: ['id', 'name'],
            },
        }],
    };
    let result = await getList(attributeGroup, condition);
    result = JSON.parse(JSON.stringify(result.data));

    return { result };
};

module.exports = {
    checkProcessRelation,
    getAttributeGroupLinkedProcess,
};
