const { throwIfNot, throwIf } = require('../../services/assert');
const { BaseError } = require('../../services/errors');
const {
    resource_category: resourceCategory,
    resource_manufacturer: resourceManufacturer,
    resource_type: resourceType,
    resource,
    location,
    sequelize,
    user_resource: userResource,
    process_step_resource: processStepResource,
} = require('../../DB/models');
const statusMessage = require('../../config/status-message');

const resouceJoins = [
    {
        model: resourceCategory,
        attributes: ['id', 'name', 'sapIdentifier'],
        as: 'category',
    },
    {
        attributes: ['id', 'name', 'sapIdentifier'],
        model: resourceManufacturer,
        as: 'manufacturer',
    },
    {
        attributes: ['id', 'name', 'sapIdentifier'],
        model: resourceType,
        as: 'type',
    },
    {
        attributes: ['id', 'name'],
        model: location,
    },
];

const categoryTypeManufacturerValid = async (body) => {
    const conditionObj = {
        where: {},
    };

    if (body?.categoryId) {
        conditionObj.where = {
            id: body?.categoryId,
        };
        const result = await resourceCategory.count(conditionObj);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.RESOURCE_CATEGORY_NOT_FOUND,
        ));
    }

    if (body?.manufacturerId) {
        conditionObj.where = {
            id: body?.manufacturerId,
        };
        const result = await resourceManufacturer.count(conditionObj);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.RESOURCE_MANUFACTURER_NOT_FOUND,
        ));
    }

    if (body?.typeId) {
        conditionObj.where = {
            id: body?.typeId,
        };
        const result = await resourceType.count(conditionObj);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.RESOURCE_TYPE_NOT_FOUND,
        ));
    }
    if (body?.locationId) {
        conditionObj.where = {
            id: body?.locationId,
        };
        const result = await location.count(conditionObj);
        throwIfNot(result, new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.LOCATION_NOT_FOUND,
        ));
    }
    return true;
};

const getLocationExist = async (locationId) => {
    const condition = {
        where: {
            id: locationId,
        },
    };
    const result = await location.findOne(condition);
    throwIfNot(result, new BaseError(
        statusMessage.NOT_FOUND,
        statusMessage.PROVIDE_LOCATION,
    ));
    return result.id;
};

const getAllResourceList = async (conditionObj = {}) => {
    const condition = conditionObj;
    condition.include = resouceJoins;
    const result = await resource.findAll(conditionObj);
    return { data: result };
};

const getResourceUsingId = async (conditionObj = {}) => {
    const condition = conditionObj;
    condition.include = resouceJoins;
    const result = await resource.findOne(condition);
    throwIfNot(result, new BaseError(statusMessage.NOT_FOUND, statusMessage.ID_DOES_NOT_EXIST));
    return { data: result };
};

const validateResourceDependencies = async (item, condition = {}) => {
    const updateParam = item;
    const errors = [];

    const conditionObj = {
        where: { ...condition },
    };
    const result = await resource.count(conditionObj);
    if (result) {
        errors.push({
            sapIdentifier: item.sapIdentifier,
            message: statusMessage.RESOURCE_ALREADY_EXIST,
        });
    }
    return sequelize.transaction(async (transaction) => {
        if (item.category) {
            const catResult = await resourceCategory.findOne({
                attributes: ['id'],
                where: { sapIdentifier: item.category.sapIdentifier },
            });

            if (!catResult) {
                if (item.category.sapIdentifier && item.category.name) {
                    const createdResult = await resourceCategory.create(
                        item.category,
                        { transaction },
                    );
                    updateParam.categoryId = createdResult.id;
                } else {
                    errors.push({
                        sapIdentifier: item.category.sapIdentifier,
                        message: statusMessage.RESOURCE_CATEGORY_NOT_FOUND,
                    });
                }
            } else {
                updateParam.categoryId = catResult.id;
            }
            delete updateParam.category;
        }

        if (item.manufacturer) {
            const manufactResult = await resourceManufacturer.findOne({
                attributes: ['id'],
                where: { sapIdentifier: item.manufacturer.sapIdentifier },
            });

            if (!manufactResult) {
                if (item.manufacturer.sapIdentifier && item.manufacturer.name) {
                    const createdResult = await resourceManufacturer.create(
                        item.manufacturer,
                        { transaction },
                    );
                    updateParam.manufacturerId = createdResult.id;
                } else {
                    errors.push({
                        sapIdentifier: item.manufacturer.sapIdentifier,
                        message: statusMessage.RESOURCE_MANUFACTURER_NOT_FOUND,
                    });
                }
            } else {
                updateParam.manufacturerId = manufactResult.id;
            }
            delete updateParam.manufacturer;
        }

        if (item.type) {
            const typeResult = await resourceType.findOne({
                attributes: ['id'],
                where: { sapIdentifier: item.type.sapIdentifier },
            });

            if (!typeResult) {
                if (item.type.sapIdentifier && item.type.name) {
                    const createdResult = await resourceType.create(item.type, { transaction });
                    updateParam.typeId = createdResult.id;
                } else {
                    errors.push({
                        sapIdentifier: item.type.sapIdentifier,
                        message: statusMessage.RESOURCE_TYPE_NOT_FOUND,
                    });
                }
            } else {
                updateParam.typeId = typeResult.id;
            }
            delete updateParam.type;
        }
        if (item.location) {
            const locationResult = await location.findOne({
                where: { name: item.location },
            });

            if (!locationResult) {
                errors.push({
                    locationName: item.location,
                    message: statusMessage.LOCATION_NOT_FOUND,
                });
            } else {
                updateParam.locationId = locationResult.id;
                delete updateParam.location;
            }
        }
        return {
            updatedData: updateParam,
            errors,
        };
    });
};

const createBulkdata = async (data) => (
    sequelize.transaction(async (transaction) => {
        await resource.bulkCreate(data, { transaction });
        return { message: statusMessage.RESOURCES_CREATE_SUCCESS };
    })
);

const duplicateResource = async (model, whereCondition) => {
    const conditionObj = {
        where: whereCondition,
    };
    const result = await model.count(conditionObj);
    return result;
};

const updateDataUsingSAPID = async (model, sapIdentifier, data, message) => {
    const conditionObj = {
        where: {
            sapIdentifier,
        },
    };
    return sequelize.transaction(async (transaction) => {
        await model.update(data, conditionObj, { transaction });
        return { message };
    });
};

const checkResourceRelation = async (requestParam) => {
    const linked = await userResource.count({ where: { resource_id: requestParam } });
    throwIf(linked, new BaseError(statusMessage.BAD_REQUEST, statusMessage.RESOURCE_IN_USE));

    const linkedToProcessStep = await processStepResource.count({
        where: { resource_id: requestParam },
    });

    throwIf(linkedToProcessStep, new BaseError(
        statusMessage.BAD_REQUEST,
        statusMessage.RESOURCE_IN_USE,
    ));
};
module.exports = {
    categoryTypeManufacturerValid,
    getAllResourceList,
    getResourceUsingId,
    getLocationExist,
    validateResourceDependencies,
    createBulkdata,
    duplicateResource,
    updateDataUsingSAPID,
    checkResourceRelation,
};
