const { log } = require('debug')
const mysql = require('mysql2/promise')

let conn

mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'my_todos'
})
  .then(connection => {
    conn = connection
  })

exports.add = function({username, password, email}) {
  return conn.query("insert into users (username, password, email) values (?, ?, ?)"
    , [username, password, email])
}
