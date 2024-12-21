const { Model, DataTypes } = require('sequelize');

const USERS_TABLE = 'Users';

const UsersSchema = {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRE: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    EMAIL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    PASSWORD: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ROL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['admin', 'user']]
        }
    }
};

class Users extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: USERS_TABLE,
            modelName: 'Users',
            timestamps: false
        };
    }
}

module.exports = { Users, UsersSchema, USERS_TABLE };