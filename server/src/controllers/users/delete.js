const { models } = require('../../db/sequelize');

const deleteOne = async (id) => {
    const user = await models.Users.findByPk(id);

    if (user) {
        await user.destroy();
        return 'User deleted successfully';
    } else {
        throw new Error('User not found');
    }
}

module.exports = deleteOne;