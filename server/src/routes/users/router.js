const router = require('express').Router();
const authenticate = require('../../helpers/middlewares/authenticate');
const authorize = require('../../helpers/middlewares/authorize');

//handlers
const {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} = require('../../handlers/users');

router.use(authenticate);

router.get('/', authorize(['Administrador', 'Empleado']), getAllUsers);
router.get('/:id', authorize(['Administrador', 'Empleado']), getUserById);
router.post('/', authorize(['Administrador']), createUser);
router.put('/:id', authorize(['Administrador']), updateUser);
router.delete('/:id', authorize(['Administrador']), deleteUser);

module.exports = router;