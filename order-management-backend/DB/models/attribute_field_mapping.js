module.exports = (sequelize, DataTypes) => {
    const attributeFieldMapping = sequelize.define('attribute_field_mapping', {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            allownull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4,
            },

        },
        attributeId: {
            type: DataTypes.UUID,
            unique: true,
            field: 'attribute_id',
        },
        isSticky: {
            type: DataTypes.BOOLEAN,
            field: 'is_sticky',
            defaultValue: false,
        },
        isArchive: {
            type: DataTypes.BOOLEAN,
            field: 'is_archive',
            defaultValue: false,
        },
        inMobileCollapsed: {
            type: DataTypes.BOOLEAN,
            field: 'in_mobile_collapsed',
            defaultValue: false,
        },
        inMobileExpanded: {
            type: DataTypes.BOOLEAN,
            field: 'in_mobile_Expanded',
            defaultValue: false,
        },
        inMobileDetail: {
            type: DataTypes.BOOLEAN,
            field: 'in_mobile_detail',
            defaultValue: false,
        },
        createdBy: {
            type: DataTypes.UUID,
            field: 'created_by',
        },
        updatedBy: {
            type: DataTypes.UUID,
            field: 'updated_by',
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    }, {
        freezeTableName: true,
        associate: (models) => {
            attributeFieldMapping.belongsTo(models.attribute, { foreignKey: 'attribute_id', onDelete: 'CASCADE' });
        },
    });
    return attributeFieldMapping;
};
