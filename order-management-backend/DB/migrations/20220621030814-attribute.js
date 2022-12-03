module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'attribute',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                attributeGroupId: {
                    type: Sequelize.UUID,
                    field: 'attribute_group_id',
                    onDelete: 'CASCADE',
                    refrences: {
                        model: 'attribute_group',
                        key: 'id',
                    },
                },
                attributeTypeId: {
                    type: Sequelize.UUID,
                    field: 'attribute_type_id',
                    onDelete: 'CASCADE',
                    refrences: {
                        model: 'attribute_type',
                        key: 'id',
                    },
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
                isChangable: {
                    type: Sequelize.STRING,
                    field: 'is_changable',
                    defaultValue: false,
                },
                isRequired: {
                    type: Sequelize.STRING,
                    field: 'is_required',
                    defaultValue: false,
                },
                sapIdentifier: {
                    type: Sequelize.UUID,
                    field: 'sap_identifier',
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
        return queryInterface, 'attribute', () => queryInterface.dropTable('attribute');
    },
};
