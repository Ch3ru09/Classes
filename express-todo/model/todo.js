const db = require('./db')


exports.getAll = function(userId) {
  return db.getConn().query('select * from tasks where user_id = ?', [userId])
    .then(([results]) => {
      return results
    })
}

exports.add = function({taskName, taskDescription, userId}) {
  return db.getConn().query('insert into tasks set ?', {
    task_name: taskName,
    task_description: taskDescription,
    user_id: userId
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
  return db.getConn().query('select * from tasks where user_id = ?', [userId])
    .then(([todos]) => {
      return todos
    })
}

exports.update = function(checkstatus, id, userId) {
  return db.getConn().query('update tasks set status = ? where id = ? and user_id = ?', [checkstatus, id, userId])
    .then(([result]) => {
      if (result.affectedRows > 0) {
        return db.getConn().query('select * from tasks where id = ?', [id])
          .then(([rows]) => {
            return rows[0]
          })
      }
    })
}

exports.remove = function(id, userId) {
  return db.getConn().query('delete from tasks where id = ? and user_id = ?', [id, userId])
    .then(() => {
      return id
    })
}