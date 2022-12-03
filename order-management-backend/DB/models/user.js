module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
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
        password: {
            type: DataTypes.STRING,
            allownull: false,
        },
        userSalt: {
            type: DataTypes.STRING,
            field: 'user_salt',
            allownull: false,
        },
        email: {
            type: DataTypes.STRING,
            field: 'email',
            validate: {
                isEmail: true,
            },

        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',

        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
            allownull: false,

        },
        isDeleted: {
            field: 'is_deleted',
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        contactNumber: {
            type: DataTypes.STRING,
            field: 'contact_number',
            validate: {
                len: [10, 15],
            },

        },
        roleId: {
            type: DataTypes.UUID,
            validate: {
                isUUID: 4,
            },

        },
        groupId: {
            type: DataTypes.UUID,
            validate: {
                isUUID: 4,
            },
        },
        createdBy: {
            type: DataTypes.UUID,
            field: 'created_by',
            validate: {
                isUUID: 4,
            },
        },
        updatedBy: {
            type: DataTypes.UUID,
            field: 'updated_by',
            validate: {
                isUUID: 4,
            },
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
            user.belongsTo(models.role);
            user.belongsTo(models.group);
            user.belongsToMany(models.resource, {
                through: 'user_resource',
                as: 'resources',
                foreignKey: 'user_id',
            });
        },
    });
    return user;
};
