module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'user',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                firstName: {
                    type: Sequelize.DataTypes.STRING,
                    field: 'first_name',
                },
                lastName: {
                    type: Sequelize.DataTypes.STRING,
                    field: 'last_name',
                },
                password: {
                    type: Sequelize.STRING,
                    field: 'password',
                },
                userSalt: {
                    type: Sequelize.STRING,
                    field: 'user_salt',
                    allownull: false,
                },
                roleId: {
                    type: Sequelize.UUID,
                    references: {
                        model: 'role',
                        key: 'id',
                    },
                },
                groupId: {
                    type: Sequelize.UUID,
                    references: {
                        model: 'group',
                        key: 'id',
                    },
                },
                email: {
                    type: Sequelize.DataTypes.STRING,
                    unique: true,
                    allownull: false,
                },

                isDeleted: {
                    type: Sequelize.DataTypes.BOOLEAN,
                    field: 'is_deleted',
                    defaultValue: false,
                },
                contactNumber: {
                    type: Sequelize.DataTypes.STRING,
                    field: 'contact_number',
                },
                createdBy: {
                    type: Sequelize.UUID,
                    field: 'created_by',
                },
                updatedBy: {
                    type: Sequelize.UUID,
                    field: 'updated_by',
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    field: 'created_at',
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    field: 'updated_at',
                },
            },
        );
    },
    down(queryInterface, Sequelize) {
        // eslint-disable-next-line no-sequences
        return queryInterface, 'user', () => queryInterface.dropTable('user');
    },
};
