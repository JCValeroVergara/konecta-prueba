const { models } = require('../../db/sequelize');

const deleteOne = async (id) => {
    const user = await models.Users.findByPk(id);

    if (user) {
        await user.destroy();
        return 'User eliminado correctamente';
    } else {
        throw new Error('User no encontrado');
    }
}

module.exports = deleteOne;