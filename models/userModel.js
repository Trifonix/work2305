// models/userModel.js
const connection = require('../db');

async function createUser(name, email, password) {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [name, email, password]);
    return result.insertId;
}

async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const [rows] = await connection.execute(query);
    return rows;
}

async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await connection.execute(query, [id]);
    return rows[0];
}

async function updateUser(id, name, email, password) {
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    const [result] = await connection.execute(query, [name, email, password, id]);
    return result.affectedRows;
}

async function deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await connection.execute(query, [id]);
    return result.affectedRows;
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
