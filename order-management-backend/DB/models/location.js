module.exports = (sequelize, DataTypes) => {
    const location = sequelize.define('location', {
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
    });
    return location;
};
