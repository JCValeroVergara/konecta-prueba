const bcrypt = require('bcrypt');
const { models } = require('../../db/sequelize');

const create = async ({ NOMBRE, EMAIL, PASSWORD, ROL }) => {
    const user = await models.Users.findOne({ where: { EMAIL } });

    if (user) {
        throw new Error('User ya existe');
    }

    const hash = await bcrypt.hash(PASSWORD, 10);

    return models.Users.create({ NOMBRE, EMAIL, PASSWORD: hash, ROL });
}

module.exports = create;