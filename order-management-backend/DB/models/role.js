module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
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
            type: DataTypes.ENUM('ADMIN', 'OPERATOR', 'WORKER'),
            field: 'name',
        },
        createdBy: {
            field: 'created_by',
            type: DataTypes.UUID,
        },
        updatedBy: {
            field: 'updated_by',
            type: DataTypes.UUID,
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
            role.hasMany(models.user);
        },
    });
    return role;
};
