module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'attribute_field_mapping',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                attributeId: {
                    type: Sequelize.UUID,
                    field: 'attribute_id',
                    unique: true,
                    onDelete: 'CASCADE',
                    references: {
                        model: 'attribute',
                        key: 'id',
                    },
                },
                isSticky: {
                    type: Sequelize.BOOLEAN,
                    field: 'is_sticky',
                    defaultValue: true,
                },
                isArchive: {
                    type: Sequelize.BOOLEAN,
                    field: 'is_archive',
                    defaultValue: false,
                },
                inMobileCollapsed: {
                    type: Sequelize.BOOLEAN,
                    field: 'in_mobile_collapsed',
                    defaultValue: false,
                },
                inMobileExpanded: {
                    type: Sequelize.BOOLEAN,
                    field: 'in_mobile_Expanded',
                    defaultValue: false,
                },
                inMobileDetail: {
                    type: Sequelize.BOOLEAN,
                    field: 'in_mobile_detail',
                    defaultValue: false,
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
        return queryInterface, 'attribute_field_mapping', () => queryInterface.dropTable('attribute_field_mapping');
    },
};
