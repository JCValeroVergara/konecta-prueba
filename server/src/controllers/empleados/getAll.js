const { models } = require('../../db/sequelize');

const getAll = async () => {
    const empleados = await models.Empleados.findAll();
    return empleados;
}

module.exports = getAll;