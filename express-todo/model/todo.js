const { log } = require('debug')

const db = require('./db')


exports.getAll = function(userId) {
  return db.getConn().query('select * from tasks where userId = ?', [userId])
    .then(([results]) => {
      return results
    })
}

exports.getUser = (userId) => {
  return db.getConn().query('select username, email from users where id = ?', [userId])
    .then(results => {
      return {
        username: results.username,
        email: results.email
      }
    })
}

exports.add = function({taskName, taskDescription, userId}) {
  return db.getConn().query('insert into tasks set ?', {
    taskName,
    taskDescription,
    userId
  })
}

exports.update = function(checkstatus, id) {
  console.log(checkstatus, id);
  return db.getConn().query("update tasks set status = ? where id = ?", [checkstatus, id])
}