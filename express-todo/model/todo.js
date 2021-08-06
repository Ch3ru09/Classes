const db = require('./db')


exports.getAll = function(userId) {
  return db.getConn().query('select * from tasks where userId = ?', [userId])
    .then(([results]) => {
      return results
    })
}

exports.add = function({taskName, taskDescription, userId}) {
  return db.getConn().query('insert into tasks set ?', {
    taskName,
    taskDescription,
    userId
  })
    .then(result => {
      const id = result[0].insertId
      return db.getConn().query('select * from tasks where id = ?', [id])
    })
    .then(([results]) => {
      return results[0]
    })
}

exports.fetchTodos = function(userId) {
  return db.getConn().query('select * from tasks where userId = ?', [userId])
    .then(([todos]) => {
      return todos
    })
}

exports.update = function(checkstatus, id, userId) {
  return db.getConn().query('update tasks set status = ? where id = ? and userId = ?', [checkstatus, id, userId])
    .then(([result]) => {
      if (result.affectedRows > 0) {
        return db.getConn().query('select * from tasks where id = ?', [id])
          .then(([rows]) => {
            return rows[0]
          })
      }
    })
}