const router = require('express').Router();
const passport = require('passport');

//handlers
const {
    createEmpleado,
    deleteEmpleado,
    getAllEmpleados,
    getEmpleadoById,
    updateEmpleado,
} = require('../../handlers/empleados');

router.get('/', getAllEmpleados);
router.get('/:id', getEmpleadoById);
router.post('/', createEmpleado);
router.put('/:id', updateEmpleado);
router.delete('/:id', deleteEmpleado);

module.exports = router;