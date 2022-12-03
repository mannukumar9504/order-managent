module.exports = (sequelize, DataTypes) => {
    const processStep = sequelize.define('process_step', {
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
        icon: {
            type: DataTypes.BLOB,
            field: 'icon',
        },
        attribute: {
            type: DataTypes.STRING,
            field: 'attribute',
        },
        processId: {
            type: DataTypes.UUID,
            field: 'process_id',
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
            processStep.belongsToMany(models.resource, {
                through: 'process_step_resource',
                as: 'resources',
                foreignKey: 'process_step_id',
            });
            processStep.belongsTo(models.process, { foreignKey: 'process_id', onDelete: 'CASCADE' });
        },
    });
    return processStep;
};
