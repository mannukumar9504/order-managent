const mysql = require('mysql2');

const client = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

client.connect();

module.exports = {
    client,
};
