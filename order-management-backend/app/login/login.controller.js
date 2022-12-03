const bcrypt = require('bcrypt');
const { user } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIf, throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const { getListByColumn, updateData } = require('../utils/common');
const { loginOperation } = require('./login.service');
const { SALT_ROUNDS } = require('../../config/constant');
const { loginPostSchema, resetPasswordSchema } = require('./validation/loginSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

const userLogin = async (req) => {
    const requestBody = req.body;
    validateSchema(loginPostSchema, requestBody);
    const { data } = await getListByColumn(user, { raw: true }, { email: req.body.userId });

    throwIfNot(data, new BaseError(message.UNAUTHORIZED, message.INVALID_EMAIL));

    req.body.password = bcrypt.hashSync(req.body.password, data?.userSalt);

    const matched = (data?.password === req.body.password) || false;

    throwIfNot(matched, new BaseError(message.UNAUTHORIZED, message.PASSWORD_NOT_FOUND));

    const login = await loginOperation(data, req);

    return { data: login };
};

/**
 * reset password
 * @param {*} req
* @returns
 */
const resetPassword = async (req) => {
    const requestBody = req.body;
    validateSchema(resetPasswordSchema, requestBody);

    const { data } = await getListByColumn(user, { raw: true }, { id: requestBody.id });
    requestBody.currentPassword = bcrypt.hashSync(requestBody.currentPassword, data.userSalt);
    if (requestBody.currentPassword !== data.password) {
        throwIf(true, new BaseError(
            message.UNAUTHORIZED,
            message.INVALID_CURRENT_PASSWORD_NOT_VALID,
        ));
    }
    delete requestBody.currentPassword;

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    requestBody.password = bcrypt.hashSync(requestBody.password, salt);
    requestBody.userSalt = salt;

    const result = await updateData(user, req, message.PASSWORD_RESET_SUCCESS);
    return result;
};

module.exports = {
    userLogin,
    resetPassword,
};
