const { models } = require('../../db/sequelize');

const deleteOne = async (id) => {
    const solicitud = await models.Solicitud.findByPk(id);

    if (solicitud) {
        await solicitud.destroy();
        return 'Solicitud eliminada correctamente';
    } else {
        throw new Error('Solicitud no encontrado');
    }
}

module.exports = deleteOne;