const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, //sesuaikan dengan user database anda
  password: process.env.DB_PASSWORD, //sesuaikan dengan password database anda
  database: process.env.DB_NAME,
  namedPlaceholders: true,
});

module.exports = connection;
