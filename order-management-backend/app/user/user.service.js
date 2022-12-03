const { sequelize, group } = require('../../DB/models');
const { throwIfNot } = require('../../services/assert');
const { user_resource: userResource, role, resource } = require('../../DB/models');
const { BaseError } = require('../../services/errors');

const statusMessage = require('../../config/status-message');

const userRefCondition = [
    {
        attributes: ['id', 'name'],
        model: role,
    },
    {
        model: resource,
        as: 'resources',
        attributes: ['id', 'name'],
        through: {
            attributes: [],
        },
    },
    {
        attributes: ['id', 'name'],
        model: group,
    },
];

const getUserList = async (model, condition) => {
    const conditionObj = condition;
    // eslint-disable-next-line no-param-reassign
    conditionObj.where = {
        isDeleted: false,
    };

    const result = await model.findAll(condition);
    return { data: result || [] };
};

const addUserData = async (model, body, message) => sequelize.transaction(async (transaction) => {
    if (body?.groupId) {
        const groupResult = await group.count({ where: { id: body.groupId } });
        throwIfNot(
            groupResult,
            new BaseError(statusMessage.NOT_FOUND, statusMessage.GROUP_NOT_FOUND),
        );
    }
    const materials = [];
    if (body?.resources) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of body.resources) {
            // eslint-disable-next-line no-await-in-loop
            const result = await resource.count({ where: { id: item } });
            throwIfNot(result, new BaseError(
                statusMessage.BAD_REQUEST,
                statusMessage.RESOURCE_NOT_FOUND,
            ));
            materials.push({
                resource_id: item,
                createdBy: body.createdBy,
                updatedBy: body.updatedBy,
            });
        }
    }
    const result = await model.create(body, { transaction });
    throwIfNot(result, new BaseError(statusMessage.BAD_REQUEST, statusMessage.USER_NOT_CREATED));
    if (materials.length) {
        const materialData = materials.map((material) => ({
            ...material,
            user_id: result.id,
        }));
        await userResource.bulkCreate(materialData, { transaction });
    }
    return { message };
});

// TODO: find the list of all the resource ids which exists and then add/remove based on condition
const updateReferenceTable = async (req, model) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const userId = req?.params.id;

    const condition = {
        where: {
            userId,
        },
    };
    return sequelize.transaction(async (transac) => {
        await model.destroy(condition, { transac });

        const resources = req?.body?.resources;
        if (resources.length) {
            const materials = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const item of resources) {
                // eslint-disable-next-line no-await-in-loop
                const result = await resource.count({ where: { id: item } });
                throwIfNot(result, new BaseError(
                    statusMessage.BAD_REQUEST,
                    statusMessage.RESOURCE_NOT_FOUND,
                ));
                materials.push({
                    user_id: userId,
                    resource_id: item,
                    createdBy: req.user.id,
                    updatedBy: req.user.id,
                });
            }
            await model.bulkCreate(materials, { transac });
        }
    });
};

module.exports = {
    addUserData,
    updateReferenceTable,
    getUserList,
    userRefCondition,
};
