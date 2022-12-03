module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'resource',
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
                    type: Sequelize.UUID,
                    field: 'sap_identifier',
                },
                name: {
                    type: Sequelize.STRING,
                    field: 'name',
                },
                categoryId: {
                    type: Sequelize.UUID,
                    refrences: {
                        model: 'resource_category',
                        key: 'id',
                    },
                },
                manufacturerId: {
                    type: Sequelize.UUID,
                    refrences: {
                        model: 'resource_manufacturer',
                        key: 'id',
                    },
                },
                typeId: {
                    type: Sequelize.UUID,
                    refrences: {
                        model: 'resource_type',
                        key: 'id',
                    },
                },
                locationId: {
                    type: Sequelize.UUID,
                    references: {
                        model: 'location',
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
        return queryInterface, 'resource', () => queryInterface.dropTable('resource');
    },
};
