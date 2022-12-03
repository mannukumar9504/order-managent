module.exports = (sequelize, DataTypes) => {
    const organisation = sequelize.define('organisation', {
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
        name: {
            type: DataTypes.STRING,
            field: 'name',
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
            organisation.belongsToMany(models.process, {
                through: 'organisation_process',
                as: 'processes',
                foreignKey: 'organisation_id',
            });
            organisation.belongsToMany(models.group, {
                through: 'organisation_group',
                as: 'groups',
                foreignKey: 'organisation_id',
            });
        },
    });
    return organisation;
};
