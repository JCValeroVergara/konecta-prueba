const allEmpleados = require('./../../controllers/empleados/getAll');
const getById = require('./../../controllers/empleados/getById');
const create = require('./../../controllers/empleados/create');
const update = require('./../../controllers/empleados/update');
const deleteOne = require('./../../controllers/empleados/delete');

const getAllEmpleados = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 25;
        const searchNombre = req.query.searchNombre || '';
        const searchFechaIngreso = req.query.searchFechaIngreso || '';
        const searchSalario = req.query.searchSalario || '';
        const empleados = await allEmpleados( page, pageSize, searchNombre, searchFechaIngreso, searchSalario );
        res.status(200).json(empleados);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getEmpleadoById = async (req, res) => {
    try {
        const empleado = await getById(req.params.id);

        if (!empleado) {
            res.status(404).json({ message: 'Empleado no encontrado' });
        } else {
            res.status(200).json(empleado);
        }
    } catch (error) {
        console.log(error);
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