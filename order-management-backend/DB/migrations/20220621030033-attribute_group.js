module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'attribute_group',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                name: {
                    type: Sequelize.STRING,
                    field: 'name',
                },
                processId: {
                    type: Sequelize.UUID,
                    field: 'process_id',
                    onDelete: 'CASCADE',
                    references: {
                        model: 'process',
                        key: 'id',
                    },
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
        return queryInterface, 'attribute_group', () => queryInterface.dropTable('attribute_group');
    },
};
