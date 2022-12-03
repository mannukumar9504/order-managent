const {
    sequelize,
    process_step_resource: processStepResource,
    process,
    resource,
} = require('../../DB/models');
const { BaseError } = require('../../services/errors');
const { throwIfNot } = require('../../services/assert');
const { getList, getListByColumn, isExist } = require('../utils/common');
const statusMessage = require('../../config/status-message');

const conditionObj = {
    attributes: ['id', 'position', 'description', 'label', 'icon', 'attribute', 'createdAt'],
    include: [
        {
            model: process,
            attributes: ['id', 'name'],
        },
        {
            model: resource,
            as: 'resources',
            attributes: ['id', 'name'],
            through: {
                attributes: [],
            },
        },
    ],
};

const createProcessStep = async (model, reqBody, message) => {
    throwIfNot(reqBody, new BaseError(statusMessage.NOT_FOUND, statusMessage.ID_DOES_NOT_EXIST));

    await isExist(process, {
        id: reqBody.processId,
    }, statusMessage.PROCESS_DOES_NOT_EXIST, 'EXIST');

    return sequelize.transaction(async (transaction) => {
        const result = await model.create(reqBody, { transaction });
        let resourceData = [];

        if (reqBody?.resources && result) {
            resourceData = reqBody.resources.map((item) => ({
                resource_id: item,
                processStepId: result.id,
                createdBy: reqBody.createdBy,
                updatedBy: reqBody.updatedBy,
            }));
            await processStepResource.bulkCreate(resourceData, { transaction });
        }
        return { message };
    });
};

const getListProcessStep = async (model) => getList(model, conditionObj);

const getProcessStepUsingId = async (model, whereCondition) => getListByColumn(
    model,
    conditionObj,
    whereCondition,
);

const updateReferenceTable = async (req, model) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const stepId = req?.params.id;

    const condition = {
        where: {
            processStepId: stepId,
        },
    };
    return sequelize.transaction(async (transac) => {
        await model.destroy(condition, { transac });
        const referenceData = [];
        const resources = req.body?.resources;
        if (resources.length) {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of resources) {
                const result = await resource.count({ where: { id: item } });
                throwIfNot(result, new BaseError(
                    statusMessage.BAD_REQUEST,
                    statusMessage.RESOURCE_NOT_FOUND,
                ));

                referenceData.push({
                    resource_id: item,
                    processStepId: stepId,
                    createdBy: req.user.id,
                    updatedBy: req.user.id,
                });
            }
        }
        await model.bulkCreate(referenceData, { transac });
    });
};

const updateProcessStepData = async (model, req, message) => {
    const stepId = req.params.id;

    const stepCondition = {
        where: {
            id: stepId,
        },
    };
    const result = await model.count(stepCondition);
    throwIfNot(result, new BaseError(
        statusMessage.NOT_FOUND,
        statusMessage.ID_DOES_NOT_EXIST,
    ));

    throwIfNot(
        req.body,
        new BaseError(
            statusMessage.NOT_FOUND,
            statusMessage.PROVIDE_DATA_TO_UPDATE,
        ),
    );

    req.body.updatedBy = req.user.id;
    return sequelize.transaction(async (transaction) => {
        const processId = req?.body?.processId;
        if (processId) {
            const processResult = await process.count({ where: { id: processId } });
            throwIfNot(processResult, new BaseError(
                statusMessage.NOT_FOUND,
                statusMessage.PROCESS_NOT_FOUND,
            ));
        }
        if (req?.body?.resources?.length) {
            await updateReferenceTable(req, processStepResource);
            delete req.body.resources;
        }
        await model.update(req.body, stepCondition, { transaction });
        return { message };
    });
};
const addResourcesByProcessStep = async (req, resources, message) => {
    const payload = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of resources) {
        // eslint-disable-next-line no-await-in-loop
        await isExist(
            resource,
            { id: item },
            statusMessage.RESOURCE_NOT_FOUND,
            'EXIST',
        );
        payload.push({
            resource_id: item,
            processStepId: req.params.id,
            createdBy: req.user.id,
            updatedBy: req.user.id,
        });
    }
    return sequelize.transaction(async (transaction) => {
        await processStepResource.destroy(
            { where: { processStepId: req.params.id } },
            { transaction },
        );
        await processStepResource.bulkCreate(payload, { transaction });
        return { message };
    });
};
module.exports = {
    createProcessStep,
    getListProcessStep,
    getProcessStepUsingId,
    updateProcessStepData,
    addResourcesByProcessStep,
};
