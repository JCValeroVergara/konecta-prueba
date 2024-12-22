const bcrypt = require('bcrypt');
const { models } = require('../../db/sequelize');

const update = async (id, data) => { 
    const user = await models.Users.findByPk(id);

    if (!user) {
        throw new Error('User not found');
    }
    const { NOMBRE, EMAIL, PASSWORD, ROL } = data;

    if (user) {
        user.NOMBRE = NOMBRE ? NOMBRE : user.NOMBRE;
        user.EMAIL = EMAIL ? EMAIL : user.EMAIL;
        user.PASSWORD = PASSWORD ? await bcrypt.hash(PASSWORD, 10) : user.PASSWORD;
        user.ROL = ROL ? ROL : user.ROL;

        await user.save();
    }

    return user;
};

module.exports = update;