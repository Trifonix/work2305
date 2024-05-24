/* Создание пула соединений с БД MySQL
 * Это позволяет управлять несколькими соединениями
 * Улучшает производительность приложения */

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;