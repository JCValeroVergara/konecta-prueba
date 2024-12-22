const { models } = require('../../db/sequelize');
const { Op } = require('sequelize');

const getAll = async (page, pageSize, searchNombre, searchFechaIngreso, searchSalario) => {
    let whereClause = {};
    if (searchNombre) whereClause.NOMBRE = { [Op.like]: `%${searchNombre}%` };
    if (searchFechaIngreso) whereClause.FECHA_INGRESO = { [Op.like]: `%${searchFechaIngreso}%` };
    if (searchSalario) whereClause.SALARIO = { [Op.like]: `%${searchSalario}%` };

    const empleados = await models.Empleados.findAll({
        where: whereClause,
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [
            ['NOMBRE', 'ASC'],
            ['FECHA_INGRESO', 'ASC'],
            ['SALARIO', 'ASC']
        ]
    });
    const empleadosCount = await models.Empleados.count({where: whereClause});
    return {empleados, empleadosCount};
}

module.exports = getAll;