const { models } = require('../../db/sequelize');

const getById = async (id) => {
    const solicitud = await models.Solicitud.findByPk(id);
    return solicitud;
}

module.exports = getById;