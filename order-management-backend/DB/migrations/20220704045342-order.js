module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable(
            'order',
            {
                id: {
                    type: Sequelize.UUID,
                    field: 'id',
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                KDAUF: {
                    type: Sequelize.STRING(12),
                    unique: true,
                },
                KDPOS: {
                    type: Sequelize.STRING(8),
                    unique: true,
                },
                WERKS: {
                    type: Sequelize.STRING(6),
                    unique: true,
                },
                VORNR: {
                    type: Sequelize.STRING(6),
                    unique: true,
                },
                VORNR_TXT: {
                    type: Sequelize.STRING(42),

                },
                NAME1: {
                    type: Sequelize.STRING(32),
                    field: 'name_1',
                },
                HALL: {
                    type: Sequelize.STRING(4),
                    field: 'hall',
                },
                MATNR_P: {
                    type: Sequelize.STRING(20),
                    field: 'matnr_p',
                },
                ARKTX_P: {
                    type: Sequelize.STRING(42),
                    field: 'arktx_p',
                },
                MATKL_P: {
                    type: Sequelize.STRING(11),
                    field: 'matkl_p',
                },
                THICKNESS_P: {
                    type: Sequelize.FLOAT,
                    field: 'thickness_p',
                },
                WIDTH_P: {
                    type: Sequelize.FLOAT,
                    field: 'width_p',
                },
                LENGTH_P: {
                    type: Sequelize.FLOAT,
                    field: 'length_p',
                },
                GUETE_P: {
                    type: Sequelize.STRING(8),
                    field: 'guete_p',
                },
                ATTES_P: {
                    type: Sequelize.STRING(6),
                    field: 'attes_p',
                },
                SDATE: {
                    type: Sequelize.DATE,
                },
                FDATE: {
                    type: Sequelize.DATE,
                },
                GAMNG: {
                    type: Sequelize.FLOAT,
                },
                GMEIN: {
                    type: Sequelize.STRING(4),

                },
                GMNGA: {
                    type: Sequelize.FLOAT,
                },
                MachId: {
                    type: Sequelize.INTEGER,
                    field: 'mach_id',

                },
                STATUS_KB: {
                    type: Sequelize.STRING(12),
                },
                CHARG: {
                    type: Sequelize.STRING(12),
                    unique: true,
                },
                MATNR_S: {
                    type: Sequelize.STRING(20),
                },
                PICK_TXT: {
                    type: Sequelize.STRING(42),
                },
                LGORT: {
                    type: Sequelize.STRING(6),
                },
                LGPBE: {
                    type: Sequelize.STRING(8),
                },
                MATKL_S: {
                    type: Sequelize.STRING(11),
                },
                THICKNESS_S: {
                    type: Sequelize.FLOAT,
                },
                WIDTH_S: {
                    type: Sequelize.FLOAT,
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
                LENGTH_S: {
                    type: Sequelize.FLOAT,
                },
                GUETE_S: {
                    type: Sequelize.STRING(8),
                },
                ATTES_S: {
                    type: Sequelize.STRING(6),
                },
                RSNUM: {
                    type: Sequelize.STRING(12),
                },
                RSPOS: {
                    type: Sequelize.STRING(8),
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
        return queryInterface, 'order', () => queryInterface.dropTable('order');
    },
};
