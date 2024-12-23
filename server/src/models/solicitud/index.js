const { Model, DataTypes } = require('sequelize');

const SOLICITUD_TABLE = 'Solicitud';

const SolicitudSchema = {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CODIGO: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    DESCRIPCION: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    RESUMEN: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ID_EMPLEADO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
};

class Solicitud extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: SOLICITUD_TABLE,
            modelName: 'Solicitud',
            timestamps: false
        };
    }
}

module.exports = { Solicitud, SolicitudSchema, SOLICITUD_TABLE };