const db = require('./db')

exports.add = ({taskName, taskDescription, userId}) => {
  return db.getConn().query('INSERT into tasks SET ?', {
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

exports.fetchTodos = (userId) => {
  return db.getConn().query('select * from tasks where user_id = ?', [userId])
    .then(([todos]) => {
      return todos
    })
}

exports.update = (checkstatus, id, userId) => {
  return db.getConn().query('update tasks set status = ? WHERE id = ? and user_id = ?', [checkstatus, id, userId])
    .then(([result]) => {
      if (result.affectedRows > 0) {
        return db.getConn().query('select * from tasks where id = ?', [id])
          .then(([rows]) => {
            return rows[0]
          })
      }
    })
}

exports.image = (image, id, userId) => {
  // !! ALTER TABLE my_todos.tasks MODIFY COLUMN image LONGBLOB NULL;

  return db.getConn().query('UPDATE tasks SET image = ? WHERE id = ? AND user_id = ?', [image.data, id, userId])
    .then(([result]) => {
      if (result.affectedRows > 0) {
        return db.getConn().query('select * from tasks where id = ?', [id])
          .then(([rows]) => {
            return rows[0]  
          })
      } 
    })
}

exports.remove = (id, userId) => {
  return db.getConn().query('delete from tasks where id = ? AND user_id = ?', [id, userId])
    .then(() => {
      return id
    })
}