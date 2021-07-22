const { log } = require('debug')

const db = require('./db')


exports.getAll = function(userId) {
  return db.getConn().query('select * from tasks where userId = ?', [userId])
    .then(([results]) => {
      return results
    })
}

// TODO move to account.js
exports.getUser = (userId) => {
  return db.getConn().query('select username, email from users where id = ?', [userId])
    .then(results => { // TODO results = [rows, fields]; userInfo = rows[0]
      // console.log('>>', results)
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

exports.update = function(checkstatus, id, userId) {
  console.log(checkstatus, id);
  return db.getConn().query("update tasks set status = ? where id = ? and userId = ?", [checkstatus, id, userId])
}