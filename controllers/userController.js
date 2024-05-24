/* Обработка http запросов и взаимодействие с моделью данных пользователя
 * Разделение логики обработки запросов и логики работы с данными
 * Маршрутизация и взаимодействие с БД */

const userModel = require('../models/userModel');

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const id = await userModel.createUser(name, email, password);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const rowsAffected = await userModel.updateUser(id, name, email, password);
        if (rowsAffected === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json({ message: 'Пользователь обновлен' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const rowsAffected = await userModel.deleteUser(id);
        if (rowsAffected === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json({ message: 'Пользователь удален' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
