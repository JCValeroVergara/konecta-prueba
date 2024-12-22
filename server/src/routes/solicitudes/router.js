const router = require('express').Router();
const passport = require('passport');

//handlers
const {
    createSolicitud,
    deleteSolicitud,
    getAllSolicitudes,
    getSolicitudById,
    updateSolicitud,
} = require('../../handlers/solicitud');

router.get('/', getAllSolicitudes);
router.get('/:id', getSolicitudById);
router.post('/', createSolicitud);
router.put('/:id', updateSolicitud);
router.delete('/:id', deleteSolicitud);

module.exports = router;