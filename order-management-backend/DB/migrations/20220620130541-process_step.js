module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'process_step',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                position: {
                    type: Sequelize.INTEGER,
                    field: 'position',
                },
                description: {
                    type: Sequelize.TEXT,
                    field: 'description',
                },
                label: {
                    type: Sequelize.STRING,
                    field: 'label',
                },
                icon: {
                    type: Sequelize.BLOB,
                    field: 'icon',
                },
                attribute: {
                    type: Sequelize.STRING,
                    field: 'attribute',
                },
                processId: {
                    type: Sequelize.UUID,
                    field: 'process_id',
                    onDelete: 'CASCADE',
                    refrences: {
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
        return queryInterface, 'process_step', () => queryInterface.dropTable('process_step');
    },
};
