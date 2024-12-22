const { models } = require('../../db/sequelize');

const getAll = async () => {
    const users = await models.Users.findAll();
    return users;
}

module.exports = getAll;