const router = require('express').Router();
const authenticate = require('../../helpers/middlewares/authenticate');
const authorize = require('../../helpers/middlewares/authorize');

//handlers
const {
    createEmpleado,
    deleteEmpleado,
    getAllEmpleados,
    getEmpleadoById,
    updateEmpleado,
} = require('../../handlers/empleados');

router.use(authenticate);

router.get('/', authorize(['Administrador', 'Empleado']), getAllEmpleados);
router.get('/:id', authorize(['Administrador', 'Empleado']), getEmpleadoById);
router.post('/', authorize(['Administrador']), createEmpleado);
router.put('/:id', authorize(['Administrador']), updateEmpleado);
router.delete('/:id', authorize(['Administrador']), deleteEmpleado);

module.exports = router;