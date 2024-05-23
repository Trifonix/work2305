const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_management'
});

connection.connect(err => {
    if (err) {
        console.error("Подключение не удалось: ", err);
        return;
    }
    console.log("Подключились успешно");
});

module.exports = connection;