const { user, organisation_group: organisationGroup } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');

const checkGroupRelation = async (requestParam) => {
    const linked = await user.count({ where: { groupId: requestParam } });
    throwIf(linked, new BaseError(message.BAD_REQUEST, message.GROUP_IN_USE));

    const linkedToOrg = await organisationGroup.count({ where: { groupId: requestParam } });
    throwIf(linkedToOrg, new BaseError(message.BAD_REQUEST, message.GROUP_IN_USE));
};

module.exports = {
    checkGroupRelation,
};
