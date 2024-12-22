const { models } = require('../../db/sequelize');

const create = async ({ CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO }) => {
    const solicitud = await models.Solicitud.create({ CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO });
    return solicitud;
}

module.exports = create;