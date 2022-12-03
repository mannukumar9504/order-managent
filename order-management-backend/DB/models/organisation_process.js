module.exports = (sequelize, DataTypes) => {
    const organisationProcess = sequelize.define('organisation_process', {
        organisationId: {
            type: DataTypes.UUID,
            field: 'organisation_id',
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
            organisationProcess.belongsTo(models.process, { foreignKey: 'processId', as: 'processes' });
            organisationProcess.belongsTo(models.organisation, { foreignKey: 'organisation_id', as: 'organisations' });
        },
    });
    return organisationProcess;
};
