const router = require('express').Router();
const authenticate = require('../../helpers/middlewares/authenticate');
const authorize = require('../../helpers/middlewares/authorize');

//handlers
const {
    createSolicitud,
    deleteSolicitud,
    getAllSolicitudes,
    getSolicitudById,
    updateSolicitud,
} = require('../../handlers/solicitud');

router.use(authenticate);

router.get('/', authorize(['Administrador', 'Empleado']), getAllSolicitudes);
router.get('/:id', authorize(['Administrador', 'Empleado']), getSolicitudById);
router.post('/', authorize(['Administrador']), createSolicitud);
router.put('/:id', authorize(['Administrador']), updateSolicitud);
router.delete('/:id', authorize(['Administrador']), deleteSolicitud);

module.exports = router;