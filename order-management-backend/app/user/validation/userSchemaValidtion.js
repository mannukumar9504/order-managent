const joi = require('joi');

joi.objectId = require('joi-objectid')(joi);

const userPostSchema = joi.object().keys({
    firstName: joi.string().required(),
    roleId: joi.string().required(),
    lastName: joi.string().required(),
    resources: joi.array().items(joi.string().allow(null, '')),
    email: joi.string().required(),
    contactNumber: joi.string().required(),
    password: joi.string().required(),
    groupId: joi.string().allow(null, ''),
});

const userPutSchema = joi.object().keys({
    firstName: joi.string().required(),
    roleId: joi.string().required(),
    lastName: joi.string().required(),
    resources: joi.array().items(joi.string().allow(null, '')),
    email: joi.string().required(),
    contactNumber: joi.string().required(),
    groupId: joi.string().allow(null, ''),
});

module.exports = {
    userPostSchema,
    userPutSchema,
};
