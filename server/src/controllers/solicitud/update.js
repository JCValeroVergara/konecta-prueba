const { models } = require('../../db/sequelize');

const update = async (id, data) => { 

    const solicitud = await models.Solicitud.findByPk(id);
    if (!solicitud) {
        throw new Error('Solicitud no encontrada');
    }
    const { CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO } = data;

    if (solicitud) {
        solicitud.CODIGO = CODIGO ? CODIGO : solicitud.CODIGO;
        solicitud.DESCRIPCION = DESCRIPCION ? DESCRIPCION : solicitud.DESCRIPCION;
        solicitud.RESUMEN = RESUMEN ? RESUMEN : solicitud.RESUMEN;
        solicitud.ID_EMPLEADO = ID_EMPLEADO ? ID_EMPLEADO : solicitud.ID_EMPLEADO;

        await solicitud.save();
    }

    return solicitud;
}

module.exports = update;