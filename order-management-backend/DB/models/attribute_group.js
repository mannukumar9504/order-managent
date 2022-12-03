module.exports = (sequelize, DataTypes) => {
    const attributeGroup = sequelize.define('attribute_group', {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            allownull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4,
            },

        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
        },
        processId: {
            type: DataTypes.UUID,
            field: 'process_id',
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
            attributeGroup.belongsTo(models.process, { foreignKey: 'process_id', onDelete: 'CASCADE' });
            attributeGroup.hasMany(models.attribute);
        },
    });
    return attributeGroup;
};
