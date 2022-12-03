const statusMessage = require('../../config/status-message');
const { throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/assert');

const checkAssociation = async (model, whereCondition, message) => {
    const linked = await model.count(whereCondition);

    throwIf(linked, new BaseError(statusMessage.BAD_REQUEST, message));
};

module.exports = {
    checkAssociation,
};
