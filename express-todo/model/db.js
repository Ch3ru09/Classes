const mysql = require('mysql2/promise')

const config = require('../config')

let conn

mysql.createConnection(config.db)
  .then(connection => {
    conn = connection
  })

exports.getConn = () => {
  return conn
}