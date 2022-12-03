const { organisation } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const { isExist, deleteData } = require('../utils/common');
const {
    addOrganisationData, getOrganisationList, updateOrganisationData, getOrganisationUsingId,
} = require('./organisation.service');
const { organisationPostSchema } = require('./validation/organisationSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveOrganisation: to create a new organisation
 * @param {*} req
 * @returns
 */
const saveOrganisation = async (req) => {
    const requestBody = req.body;
    validateSchema(organisationPostSchema, requestBody);

    await isExist(organisation, { name: req.body.name }, message.ORGANISATION_ALREADY_EXIST, 'DUPLICATE');
    return addOrganisationData(organisation, req, message.ORGANISATION_CREATE_SUCCESS);
};

/**
 * deleteOrganisation: delete organisation using id
 * @param {*} req
 * @returns
 */
const deleteOrganisation = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    const condition = {
        id: req.params.id,
    };

    await isExist(organisation, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    return deleteData(organisation, req, message.ORGANISATION_DELETE_SUCCESS);
};

/**
 * updateOrganisation : update organisation by id
 * @param {*} req
 * @returns
 */
const updateOrganisation = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );

    const requestBody = req.body;
    validateSchema(organisationPostSchema, requestBody);
    return updateOrganisationData(organisation, req, message.ORGANISATION_UPDATE_SUCCESS);
};

/**
 * getAllOrganisation: to get the list of all organisations
 * @param {*} req
 * @returns
 */
const getAllOrganisation = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };

    return getOrganisationList(organisation, conditionObj);
};

/**
 * getOrganisationById: get organisation by id
 * @param {*} req
 * @returns
 */
const getOrganisationById = async (req) => {
    const requestParam = req.params.id;
    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt'],
    };

    return getOrganisationUsingId(organisation, conditionObj, { id: req.params.id });
};

module.exports = {
    saveOrganisation,
    deleteOrganisation,
    updateOrganisation,
    getAllOrganisation,
    getOrganisationById,
};
