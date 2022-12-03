module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        KDAUF: {
            type: DataTypes.STRING(12),
        },
        KDPOS: {
            type: DataTypes.STRING(8),
        },
        WERKS: {
            type: DataTypes.STRING(6),
        },
        VORNR: {
            type: DataTypes.STRING(6),
        },
        VORNR_TXT: {
            type: DataTypes.STRING(42),

        },
        NAME1: {
            type: DataTypes.STRING(32),
            field: 'name_1',
        },
        HALL: {
            type: DataTypes.STRING(4),
            field: 'hall',
        },
        MATNR_P: {
            type: DataTypes.STRING(20),
            field: 'matnr_p',
        },
        ARKTX_P: {
            type: DataTypes.STRING(42),
            field: 'arktx_p',
        },
        MATKL_P: {
            type: DataTypes.STRING(11),
            field: 'matkl_p',
        },
        THICKNESS_P: {
            type: DataTypes.FLOAT,
            field: 'thickness_p',
        },
        WIDTH_P: {
            type: DataTypes.FLOAT,
            field: 'width_p',
        },
        LENGTH_P: {
            type: DataTypes.FLOAT,
            field: 'length_p',
        },
        GUETE_P: {
            type: DataTypes.STRING(8),
            field: 'guete_p',
        },
        ATTES_P: {
            type: DataTypes.STRING(6),
            field: 'attes_p',
        },
        SDATE: {
            type: DataTypes.DATE,
        },
        FDATE: {
            type: DataTypes.DATE,
        },
        GAMNG: {
            type: DataTypes.FLOAT,
        },
        GMEIN: {
            type: DataTypes.STRING(4),

        },
        GMNGA: {
            type: DataTypes.FLOAT,
        },
        MachId: {
            type: DataTypes.INTEGER,
            field: 'mach_id',

        },
        STATUS_KB: {
            type: DataTypes.STRING(12),
        },
        CHARG: {
            type: DataTypes.STRING(12),
        },
        MATNR_S: {
            type: DataTypes.STRING(20),
        },
        PICK_TXT: {
            type: DataTypes.STRING(42),
        },
        LGORT: {
            type: DataTypes.STRING(6),
        },
        LGPBE: {
            type: DataTypes.STRING(8),
        },
        MATKL_S: {
            type: DataTypes.STRING(11),
        },
        THICKNESS_S: {
            type: DataTypes.FLOAT,
        },
        WIDTH_S: {
            type: DataTypes.FLOAT,
        },
        processId: {
            type: DataTypes.UUID,
            field: 'process_id',
        },
        LENGTH_S: {
            type: DataTypes.FLOAT,
        },
        GUETE_S: {
            type: DataTypes.STRING(8),
        },
        ATTES_S: {
            type: DataTypes.STRING(6),
        },
        RSNUM: {
            type: DataTypes.STRING(12),
        },
        RSPOS: {
            type: DataTypes.STRING(8),
        },
        createdBy: {
            type: DataTypes.UUID,
            field: 'created_by',
        },
        updatedBy: {
            type: DataTypes.UUID,
            field: 'updated_by',
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
            order.belongsTo(models.process, { foreignKey: 'process_id', onDelete: 'CASCADE' });
        },
    });
    return order;
};
