const { Model, DataTypes } = require('sequelize');

const EMPLEADOS_TABLE = 'empleados';

const EmpleadosSchema = {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    FECHA_INGRESO: {
        type: DataTypes.DATE,
        allowNull: false
    },
    SALARIO: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
};

class Empleados extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: EMPLEADOS_TABLE,
            modelName: 'Empleados',
            timestamps: false
        };
    }
}

module.exports = { Empleados, EmpleadosSchema, EMPLEADOS_TABLE };