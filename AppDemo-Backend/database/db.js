const mysql = require('mysql');
const util = require('util');
require("dotenv").config();

function DB() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  return {
    connect() {
      console.log("MySql DB Connected successfully.");
      return util.promisify(connection.connect)
        .call(connection);
    },
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}



module.exports = { DB };