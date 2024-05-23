const express = require('express');
const connection = require('./db');
const app = express();

app.use(express.json());

// Создание пользователя
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    connection.query(query, [name, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// Получение всех пользователей
app.get('/users', (req, res) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Получение пользователя по ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM users WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Нету такого пользователя" });
        }
        res.json(results[0]);
    });
});

// Обновление пользователя
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    connection.query(query, [name, email, password, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Нету такого пользователя" });
        }
        res.json({ message: "Данные обновлены" });
    });
});

// Удаление пользователя
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Нету такого пользователя" });
        }
        res.json({ message: "Пользователь стерт" });
    });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Порт сервера: ${PORT}`);
});