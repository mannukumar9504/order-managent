module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'role',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                name: {
                    type: Sequelize.ENUM('ADMIN', 'OPERATOR', 'WORKER'),
                    field: 'name',
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
        return queryInterface, 'role', () => queryInterface.dropTable('role');
    },
};
