module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'resource_manufacturer',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                sapIdentifier: {
                    type: Sequelize.DataTypes.UUID,
                    field: 'sap_identifier',
                },
                name: {
                    type: Sequelize.DataTypes.STRING,
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
        return queryInterface, 'resource_manufacturer', () => queryInterface.dropTable('resource_manufacturer');
    },
};
