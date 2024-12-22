const { models } = require('../../db/sequelize');

const deleteOne = async (id) => {
    const empleado = await models.Empleados.findByPk(id);

    if (empleado) {
        await empleado.destroy();
        return 'Empleado eliminado correctamente';
    } else {
        throw new Error('Empleado no encontrado');
    }
}

module.exports = deleteOne;