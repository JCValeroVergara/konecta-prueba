const { models } = require('../../db/sequelize');

const getById = async (id) => {
    const empleado = await models.Empleados.findByPk(id, {
        include: [
            {
                model: models.Solicitud,
                as: 'Solicitudes', 
                attributes: ['ID', 'CODIGO', 'DESCRIPCION'],
            }
        ]
    });
    return empleado;
}

module.exports = getById;