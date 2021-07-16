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

exports.getAll = function () {
  return conn.query('select * from tasks')
    .then(([results]) => {
        return results
      }
    )
}

exports.add = function({taskName, taskDescription}) {
  return conn.query("insert into tasks (taskName, taskDescription) values (?, ?)"
    , [taskName, taskDescription])
}

exports.update = function(checkstatus, id) {
  console.log(checkstatus, id);
  return conn.query("update tasks set status = ? where id = ?", [checkstatus, id])
}