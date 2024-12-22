const { models } = require('../../db/sequelize');
const { Op } = require('sequelize');

const getAll = async (page, pageSize, searchNombre, searchEmail) => {
    let whereClause = {};
    if (searchNombre) whereClause.NOMBRE = { [Op.like]: `%${searchNombre}%` };
    if (searchEmail) whereClause.EMAIL = { [Op.like]: `%${searchEmail}%` };



    const users = await models.Users.findAll({
        where: whereClause,
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: [
            ['NOMBRE', 'ASC']
        ]
    });

    const usersCount = await models.Users.count({ where: whereClause });
    
    return { users, usersCount };
}

module.exports = getAll;