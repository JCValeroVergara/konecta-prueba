const allUsers = require('../../controllers/users/getAll');
const getById = require('../../controllers/users/getById');
const create = require('../../controllers/users/create');
const update = require('../../controllers/users/update');
const deleteOne = require('../../controllers/users/delete');


const getAllUsers = async (req, res) => {
    try {
        const users = await allUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await getById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createUser = async (req, res) => {
    try {
        const user = await create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await update(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await deleteOne(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
};