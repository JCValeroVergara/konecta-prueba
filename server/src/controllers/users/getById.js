const { models } = require('../../db/sequelize');

const getById = async (id) => {
    const user = await models.Users.findByPk(id);
    return user;
}

module.exports = getById;