const allEmpleados = require('./../../controllers/empleados/getAll');
const getById = require('./../../controllers/empleados/getById');
const create = require('./../../controllers/empleados/create');
const update = require('./../../controllers/empleados/update');
const deleteOne = require('./../../controllers/empleados/delete');

const getAllEmpleados = async (req, res) => {
    try {
        const empleados = await allEmpleados();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getEmpleadoById = async (req, res) => {
    try {
        const empleado = await getById(req.params.id);

        if (!empleado) {
            res.status(404).json({ message: 'Empleado not found' });
        } else {
            res.status(200).json(empleado);
        }
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createEmpleado = async (req, res) => {
    try {
        const empleado = await create(req.body);
        res.status(201).json(empleado);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateEmpleado = async (req, res) => {
    try {
        const empleado = await update(req.params.id, req.body);
        res.status(200).json(empleado);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteEmpleado = async (req, res) => {
    try {
        await deleteOne(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    createEmpleado,
    deleteEmpleado,
    getAllEmpleados,
    getEmpleadoById,
    updateEmpleado,
}