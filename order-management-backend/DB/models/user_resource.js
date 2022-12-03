module.exports = (sequelize, DataTypes) => {
    const userResource = sequelize.define('user_resource', {
        userId: {
            type: DataTypes.UUID,
            field: 'user_id',
        },
        resourceId: {
            type: DataTypes.UUID,
            field: 'resource_id',
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
            userResource.belongsTo(models.resource, {
                foreignKey: 'resource_id',
                as: 'resources',
            });
            userResource.belongsTo(models.user, {
                foreignKey: 'user_id',
                as: 'users',
            });
        },
    });
    return userResource;
};
