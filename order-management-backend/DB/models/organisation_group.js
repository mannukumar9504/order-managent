module.exports = (sequelize, DataTypes) => {
    const organisationGroup = sequelize.define('organisation_group', {
        organisationId: {
            type: DataTypes.UUID,
            field: 'organisation_id',
        },
        groupId: {
            type: DataTypes.UUID,
            field: 'group_id',
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
            organisationGroup.belongsTo(models.group, { foreignKey: 'groupId', as: 'groups' });
            organisationGroup.belongsTo(models.organisation, { foreignKey: 'organisation_id', as: 'organisations' });
        },
    });
    return organisationGroup;
};
