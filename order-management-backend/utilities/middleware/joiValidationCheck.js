const { throwIf } = require('../../services/assert');

/**
 * @file joiValidationCheck.js
 * @summary checks the object validation
 * @description This file Checks the object validation according to JOI schema
 * */
const { RequestParamsInvalidError } = require(`${__basedir}/services/errors`);
/**
  * Method to check the object validation
  * @param {object} schemaName JOI schema for validation
  * @param {object} object data object tobe validate
  * */
const validateSchema = (schemaName, object) => {
    const result = schemaName.validate(object);
    const { error } = result;
    const valid = error === undefined;

    if (!valid) {
        const { details } = error;
        const message = details.map((i) => i.message).join(',').replace(/"/g, '');

        throwIf(true, new RequestParamsInvalidError(message));
    }
};

module.exports = {
    validateSchema,
};
