module.exports = (sequelize, DataTypes) => {
    const resource = sequelize.define('resource', {
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
        sapIdentifier: {
            type: DataTypes.UUID,
            field: 'sap_identifier',
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
        },
        categoryId: {
            type: DataTypes.UUID,
        },
        manufacturerId: {
            type: DataTypes.UUID,
        },
        typeId: {
            type: DataTypes.UUID,
        },
        locationId: {
            type: DataTypes.UUID,
        },
        isDeleted: {
            field: 'is_deleted',
            type: DataTypes.BOOLEAN,
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
            resource.belongsTo(models.resource_type, { foreignKey: 'typeId', as: 'type' });
            resource.belongsTo(models.resource_category, { foreignKey: 'categoryId', as: 'category' });
            resource.belongsTo(models.resource_manufacturer, { foreignKey: 'manufacturerId', as: 'manufacturer' });
            resource.belongsTo(models.location);
            resource.belongsToMany(models.user, {
                through: 'user_resource',
                as: 'users',
                foreignKey: 'resource_id',
            });
            resource.belongsToMany(models.process_step, {
                through: 'process_step_resource',
                as: 'processSteps',
                foreignKey: 'resource_id',
            });
        },
    });
    return resource;
};
