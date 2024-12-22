const { models } = require('../../db/sequelize');

const getById = async (id) => {
    const empleado = await models.Empleados.findByPk(id);
    return empleado;
}

module.exports = getById;