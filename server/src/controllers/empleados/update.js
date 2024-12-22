const { models } = require('../../db/sequelize');

const update = async (id, data) => { 
    const empleado = await models.Empleados.findByPk(id);

    if (!empleado) {
        throw new Error('Empleado no encontrado');
    }
    const { NOMBRE, FECHA_INGRESO, SALARIO } = data;

    if (empleado) {
        empleado.NOMBRE = NOMBRE ? NOMBRE : empleado.NOMBRE;
        empleado.FECHA_INGRESO = FECHA_INGRESO ? FECHA_INGRESO : empleado.FECHA_INGRESO;
        empleado.SALARIO = SALARIO ? SALARIO : empleado.SALARIO;

        await empleado.save();
    }

    return empleado;
}

module.exports = update;