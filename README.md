## Проект создан с помощью следующих популярных инструментов:

MySQL, phpMyAdmin, Node, Express, JS

--------

CREATE DATABASE user_management;

USE user_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

--------

npm init -y

npm install express mysql2

--------

db.js

--------

app.js

--------

node app.js