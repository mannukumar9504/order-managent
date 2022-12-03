module.exports = (sequelize, DataTypes) => {
    const attribute = sequelize.define('attribute', {
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
        attributeGroupId: {
            type: DataTypes.UUID,
            field: 'attribute_group_id',
            onDelete: 'CASCADE',
        },
        attributeTypeId: {
            type: DataTypes.UUID,
            field: 'attribute_type_id',
            onDelete: 'CASCADE',
        },
        position: {
            type: DataTypes.INTEGER,
            field: 'position',
        },
        description: {
            type: DataTypes.TEXT,
            field: 'description',
        },
        label: {
            type: DataTypes.STRING,
            field: 'label',
        },
        isChangable: {
            type: DataTypes.BOOLEAN,
            field: 'is_changable',
            defaultValue: false,
        },
        isRequired: {
            type: DataTypes.BOOLEAN,
            field: 'is_required',
            defaultValue: false,
        },
        sapIdentifier: {
            type: DataTypes.UUID,
            field: 'sap_identifier',
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
            attribute.belongsTo(models.attribute_group, { as: 'attributeGroup' });
            attribute.belongsTo(models.attribute_type, { as: 'attributeType' });
            attribute.hasMany(models.attribute_field_mapping, { foreignKey: 'attribute_id' });
        },
    });
    return attribute;
};
