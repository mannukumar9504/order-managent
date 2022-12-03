const { Op: OP } = require('sequelize');
const { resource_category: resourceCategory, resource } = require('../../DB/models');
const message = require('../../config/status-message');
const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    getList, updateData, getListByColumn, addData, isExist,
    preValidateData,
    deleteData,
} = require('../utils/common');
const { categoryPostSchema } = require('../resource/validation/resourceSchemaValidation');
const { validateSchema } = require('../../utilities/middleware/joiValidationCheck');

/**
 * saveResourceCategory: to create a new resource-category
 * @param {*} req
 * @returns
 */
const saveResourceCategory = async (req) => {
    const requestBody = req.body;
    validateSchema(categoryPostSchema, requestBody);
    requestBody.createdBy = req.user.id;
    requestBody.updatedBy = req.user.id;
    await isExist(resourceCategory, { name: requestBody.name }, message.RESOURCE_CATEGORY_ALREADY_EXIST, 'DUPLICATE');
    return addData(resourceCategory, requestBody, message.RESOURCE_CATEGORY_CREATE_SUCCESS);
};

/**
 * deleteResourceCategory: delete resource-category using id
 * @param {*} req
 * @returns
 */
const deleteResourceCategory = async (req) => {
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

    await isExist(resourceCategory, condition, message.ID_DOES_NOT_EXIST, 'EXIST');
    const linked = await resource.count({ where: { categoryId: requestParam } });
    throwIf(linked, new BaseError(message.BAD_REQUEST, message.RESOURCE_CATEGORY_IN_USE));
    return deleteData(resourceCategory, req, message.RESOURCE_CATEGORY_DELETE_SUCCESS);
};

/**
 * updateResourceCategory : update resource-category by id
 * @param {*} req
 * @returns
 */
const updateResourceCategory = async (req) => {
    const requestParam = req.params.id;
    const requestBody = req.body;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    validateSchema(categoryPostSchema, requestBody);
    await preValidateData(req, resourceCategory);
    await isExist(resourceCategory, { id: { [OP.not]: requestParam }, name: req.body.name }, message.RESOURCE_CATEGORY_ALREADY_EXIST, 'DUPLICATE');
    return updateData(resourceCategory, req, message.RESOURCE_CATEGORY_UPDATE_SUCCESS);
};

/**
 * getAllResourceCategory: to get the list of all resource-category
 * @param {*} req
 * @returns
 */
const getAllResourceCategory = async (req) => {
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt', 'sapIdentifier'],
    };

    return getList(resourceCategory, conditionObj);
};

/**
 * getResourcecategoryById: get resource-category by id
 * @param {*} req
 * @returns
 */
const getResourceCategoryById = async (req) => {
    const requestParam = req.params.id;

    throwIfNot(
        requestParam,
        new BaseError(
            message.NOT_FOUND,
            message.PLEASE_PROVIDE_ID,
        ),
    );
    const conditionObj = {
        attributes: ['id', 'name', 'createdAt', 'sapIdentifier'],
    };

    return getListByColumn(resourceCategory, conditionObj, { id: requestParam });
};

module.exports = {
    saveResourceCategory,
    deleteResourceCategory,
    updateResourceCategory,
    getAllResourceCategory,
    getResourceCategoryById,
};
