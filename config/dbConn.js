const mysql = require("mysql");

// Conexão com o banco de dados MySQL
const connMySQL = () => {
  return mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
  });
};

module.exports = () => {
  return connMySQL;
};
