module.exports = (sequelize, DataTypes) => {
    const processStepResource = sequelize.define('process_step_resource', {
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
        resourceId: {
            type: DataTypes.UUID,
            field: 'resource_id',
        },
        processStepId: {
            type: DataTypes.UUID,
            field: 'process_step_id',
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
            processStepResource.belongsTo(models.resource, { foreignKey: 'resource_id', as: 'resources' });
            processStepResource.belongsTo(models.process_step, { foreignKey: 'process_step_id', as: 'processSteps' });
        },
    });
    return processStepResource;
};
