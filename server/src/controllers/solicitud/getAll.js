const { models } = require('../../db/sequelize');
const { Op } = require('sequelize');


const getAll = async (page, pageSize, searcCodigo, empleado) => {
    let whereClause = {};
    if (searcCodigo) whereClause.CODIGO = { [Op.like]: `%${searcCodigo}%` };
    if (empleado) whereClause.ID_EMPLEADO = empleado;


    const solicitudes = await models.Solicitud.findAll({
        where: whereClause,
        include: [
            {
                model: models.Empleados,
                as: 'Empleado',
                attributes: ['NOMBRE', 'FECHA_INGRESO', 'SALARIO']
            }
        ],
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [
            ['CODIGO', 'ASC']
        ]
    });

    const solicitudesCount = await models.Solicitud.count({where: whereClause});

    return {solicitudes, solicitudesCount};
}

module.exports = getAll;