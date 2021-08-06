const db = require('./db')


exports.getAll = function(userId) {
  return db.getConn().query('select * from tasks where user_id = ?', [userId])
    .then(([results]) => {
      return results
    })
}

exports.add = function({task_name, task_description, user_id}) {
  return db.getConn().query('insert into tasks set ?', {
    task_name,
    task_description,
    user_id
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