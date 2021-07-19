const { log } = require('debug')

const db = require('./db')

exports.getAll = function (username) {
  return db.getConn().query('select * from tasks where username = ?', [username])
    .then(([results]) => {
        return results
      }
    )
}

exports.add = function({taskName, taskDescription}) {
  return db.getConn().query("insert into tasks (taskName, taskDescription) values (?, ?)"
    , [taskName, taskDescription])
}

exports.update = function(checkstatus, id) {
  console.log(checkstatus, id);
  return db.getConn().query("update tasks set status = ? where id = ?", [checkstatus, id])
}