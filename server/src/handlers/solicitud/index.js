const allSolicitudes = require('../../controllers/solicitud/getAll');
const getById = require('../../controllers/solicitud/getById');
const create = require('../../controllers/solicitud/create');
const update = require('../../controllers/solicitud/update');
const deleteOne = require('../../controllers/solicitud/delete');

const getAllSolicitudes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 25;
        const searcCodigo = req.query.searchCodigo || '';
        const empleado = req.query.empleado;

        const solicitudes = await allSolicitudes( page, pageSize, searcCodigo, empleado );
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSolicitudById = async (req, res) => {
    try {
        const solicitud = await getById(req.params.id);

        if (!solicitud) {
            res.status(404).json({ message: 'Solicitud not found' });
        } else {
            res.status(200).json(solicitud);
        }
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createSolicitud = async (req, res) => {
    try {
        const solicitud = await create(req.body);
        res.status(201).json(solicitud);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateSolicitud = async (req, res) => {
    try {
        const solicitud = await update(req.params.id, req.body);
        res.status(200).json(solicitud);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteSolicitud = async (req, res) => {
    try {
        await deleteOne(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    createSolicitud,
    deleteSolicitud,
    getAllSolicitudes,
    getSolicitudById,
    updateSolicitud,
}