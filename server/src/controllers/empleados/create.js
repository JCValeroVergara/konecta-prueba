const { models } = require('../../db/sequelize');

const create = async ({ NOMBRE, FECHA_INGRESO, SALARIO }) => {
    return models.Empleados.create({ NOMBRE, FECHA_INGRESO, SALARIO });
}

module.exports = create;