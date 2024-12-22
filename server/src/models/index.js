const { Empleados, EmpleadosSchema } = require('./empleados');
const { Solicitud, SolicitudSchema } = require('./solicitud');
const { Users, UsersSchema } = require('./users');


function setupModels(sequelize) {
    const models = {
        Users: Users.init(UsersSchema, Users.config(sequelize)),
        Empleados: Empleados.init(EmpleadosSchema, Empleados.config(sequelize)),
        Solicitud: Solicitud.init(SolicitudSchema, Solicitud.config(sequelize))
    };

    // Add associations here
    models.Empleados.hasMany(models.Solicitud, { foreignKey: 'ID_EMPLEADO', as: 'Solicitudes' });
    models.Solicitud.belongsTo(models.Empleados, { foreignKey: 'ID_EMPLEADO', as: 'Empleado' });

    Object.keys(models).forEach((modelName) => {
        if ('associate' in models[modelName]) {
            models[modelName].associate(models);
        }
    });

    return models;
}

module.exports = setupModels;