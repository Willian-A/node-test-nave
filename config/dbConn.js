const mysql = require("mysql");

// Conexão com o banco de dados MySQL
const connMySQL = () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "nave_node",
  });
};

module.exports = () => {
  return connMySQL;
};
