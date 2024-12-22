const router = require('express').Router();
const passport = require('passport');

//handlers
const {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} = require('../../handlers/users');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;