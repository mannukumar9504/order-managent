const { Op: OP } = require('sequelize');
const {
    sequelize,
    organisation_process: organisationProcess,
    organisation_group: organisationGroup,
    group,
    process,
} = require('../../DB/models');
const {
    isExist,
} = require('../utils/common');
const { throwIfNot } = require('../../services/assert');
const { BaseError } = require('../../services/errors');

const statusMessage = require('../../config/status-message');

const includeCondition = [
    {
        model: group,
        as: 'groups',
        attributes: ['id', 'name'],
        through: {
            attributes: [],
        },
    },
    {
        model: process,
        as: 'processes',
        attributes: ['id', 'name'],
        through: {
            attributes: [],
        },
    },
];

const addOrganisationData = async (model, req, message) => {
    throwIfNot(req?.body, new BaseError(statusMessage.NOT_FOUND, statusMessage.ID_DOES_NOT_EXIST));
    return sequelize.transaction(async (transaction) => {
        const orgData = req.body;
        const userId = req.user.id;
        orgData.createdBy = userId;
        orgData.updatedBy = userId;

        const { groups, processes } = await getGroupAndProcess(req);

        const result = await model.create(req.body, { transaction });
        throwIfNot(result, new BaseError(
            statusMessage.BAD_REQUEST,
            statusMessage.ORGANISATION_NOT_CREATED,
        ));
        if (groups.length) {
            const groupsData = groups.map((groupObj) => ({
                ...groupObj,
                organisation_id: result.id,
            }));

            await organisationGroup.bulkCreate(groupsData, { transaction });
        }
        if (processes.length) {
            const processData = processes.map((processObj) => ({
                ...processObj,
                organisation_id: result.id,
            }));

            await organisationProcess.bulkCreate(processData, { transaction });
        }
        return { message };
    });
};

const getGroupAndProcess = async (req) => {
    const groupData = [];
    const groups = req?.body?.groups;
    const userId = req.user.id;
    if (groups?.length) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of groups) {
            // eslint-disable-next-line no-await-in-loop
            const result = await group.count({ where: { id: item } });
            throwIfNot(result, new BaseError(
                statusMessage.BAD_REQUEST,
                statusMessage.GROUP_NOT_FOUND,
            ));
            groupData.push({
                group_id: item,
                createdBy: userId,
                updatedBy: userId,
            });
        }
    }

    const processData = req?.body?.processes;
    const processesData = [];
    if (processData?.length) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of processData) {
            // eslint-disable-next-line no-await-in-loop
            const result = await process.count({ where: { id: item } });
            throwIfNot(result, new BaseError(
                statusMessage.BAD_REQUEST,
                statusMessage.PROCESS_NOT_FOUND,
            ));
            processesData.push({
                process_id: item,
                createdBy: userId,
                updatedBy: userId,
            });
        }
    }
    return { groups: groupData, processes: processesData };
};

const updateReferenceTable = async (req, refTable, model) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const organisationId = req?.params.id;

    const condition = {
        where: {
            organisation_id: organisationId,
        },
    };
    return sequelize.transaction(async (transac) => {
        await model.destroy(condition, { transac });

        const referenceData = refTable.map((item) => ({
            organisation_id: organisationId,
            ...item,
        }));
        await model.bulkCreate(referenceData, { transac });
    });
};

const updateOrganisationData = async (model, req, message) => {
    const organisationId = req.params.id || req.body.id;
    const conditionObj = {
        where: {
            id: organisationId,
        },
    };
    const result = await model.count(conditionObj);
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

    await isExist(model, { id: { [OP.not]: organisationId }, name: req.body.name }, statusMessage.ORGANISATION_ALREADY_EXIST, 'DUPLICATE');
    req.body.updatedBy = req.user.id;
    return sequelize.transaction(async (transaction) => {
        const { groups, processes } = await getGroupAndProcess(req);
        if (groups?.length) {
            await updateReferenceTable(req, groups, organisationGroup);
            delete req.body.groups;
        }

        if (processes?.length) {
            await updateReferenceTable(req, processes, organisationProcess);
            delete req.body.processes;
        }
        await model.update(req.body, conditionObj, { transaction });
        return { message };
    });
};

const getOrganisationList = async (model, condition) => {
    const conditionObj = condition;
    // eslint-disable-next-line no-param-reassign
    conditionObj.include = includeCondition;
    const result = await model.findAll(conditionObj);
    return { data: result };
};

const getOrganisationUsingId = async (model, conditionObj, colVal) => {
    const condition = conditionObj;
    // eslint-disable-next-line no-param-reassign
    condition.where = colVal;
    condition.include = includeCondition;

    const result = await model.findOne(conditionObj);
    return { data: result };
};

module.exports = {
    addOrganisationData,
    updateOrganisationData,
    getOrganisationList,
    getOrganisationUsingId,
    // isExist,
};
