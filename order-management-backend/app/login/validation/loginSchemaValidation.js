const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const loginPostSchema = joi.object().keys({
    userId: joi.string().required(),
    password: joi.string().required(),
});
const resetPasswordSchema = joi.object().keys({
    id: joi.string().required(),
    currentPassword: joi.string().required(),
    password: joi.string().required(),
});

module.exports = {
    loginPostSchema,
    resetPasswordSchema,
};
