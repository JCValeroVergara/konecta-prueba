const { models } = require('../../db/sequelize');

const getAll = async () => {
    const solicitudes = await models.Solicitud.findAll();
    return solicitudes;
}

module.exports = getAll;