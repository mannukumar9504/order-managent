/* eslint-disable no-param-reassign */
const {
    sequelize,
    attribute,
    attribute_field_mapping: attributeFieldMapping,
} = require('../../DB/models');
const { getList, isExist } = require('../utils/common');
const statusMessage = require('../../config/status-message');

const conditionObj = {
    attributes: ['id', 'name'],
    include: [
        {
            model: attribute,
            attributes: ['id', 'position', 'label'],
            include: {
                model: attributeFieldMapping,
                attributes: ['isSticky', 'isArchive', 'inMobileCollapsed', 'inMobileExpanded', 'inMobileDetail'],
            },
        },
    ],
};

const getListAttributeFieldMappingData = async (model) => {
    let result = await getList(model, conditionObj);
    result = JSON.parse(JSON.stringify(result));
    const data = result.data.map((item) => {
        if (item.attributes?.length) {
            item.attributes = item.attributes.map((item1) => {
                if (item1.attribute_field_mappings?.length) {
                    item1.isSticky = item1.attribute_field_mappings[0].isSticky;
                    item1.isArchive = item1.attribute_field_mappings[0].isArchive;
                    item1.inMobileCollapsed = item1.attribute_field_mappings[0].inMobileCollapsed;
                    item1.inMobileExpanded = item1.attribute_field_mappings[0].inMobileExpanded;
                    item1.inMobileDetail = item1.attribute_field_mappings[0].inMobileDetail;
                }
                delete item1.attribute_field_mappings;
                return item1;
            });
        }
        return item;
    });
    return data;
};

const updateAttributeFieldMappingData = async (model, req, message) => {
    const condition = {
        fields: ['id', 'attributeId', 'isSticky', 'isArchive', 'inMobileCollapsed', 'inMobileExpanded', 'inMobileDetail', 'createdBy', 'updatedBy'],
        updateOnDuplicate: ['attributeId', 'isSticky', 'isArchive', 'inMobileCollapsed', 'inMobileExpanded', 'inMobileDetail', 'updatedBy'],
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const item of req.body) {
        item.createdBy = req.user.id;
        item.updatedBy = req.user.id;
        // eslint-disable-next-line no-await-in-loop
        await isExist(attribute, { id: item.attributeId }, statusMessage.ATTRIBUTE_ID_NOT_EXIST, 'EXIST');
    }
    return sequelize.transaction(async (transaction) => {
        await model.bulkCreate(req.body, condition, { transaction });
        return { message };
    });
};

module.exports = {
    getListAttributeFieldMappingData,
    updateAttributeFieldMappingData,
};
