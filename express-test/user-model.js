const mysql = require('mysql2/promise');

let conn

mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mytest'
})
  .then(connection => {
    conn = connection
  })

function getAll() {
  return conn.query('select * from my_guests')
    .then(([results]) => {
      return results
    })
}

exports.getAll = getAll

// exports.getAll = () => {
//   return conn.query('select * from my_guests')
//     .then(([results]) => {
//       return results
//     })
// }

exports.update = function(id, {checkStatus, firstName, lastName}) {
  let sql = 'update my_guests set'
  const where = []
  const whereValues = []
  if (firstName) {
    where.push(' firstName = ?')
    whereValues.push(firstName)
  }
  if (lastName) {
    where.push (' lastName = ?')
    whereValues.push(lastName)
  }
  
  sql += where.join(',') + ' where id = ?'
  whereValues.push(id)
  console.log('sql > ' + sql)
  return conn.query(sql, whereValues)
}

exports.search = function({firstNameLike}) {
  if (firstNameLike == '') {
    return Promise.resolve([]) // !!
  }
  // warning: firstnameLike = a' or '1' = '1
  // return conn.query('select * from my_guests where firstname = "' + firstNameLike + '"')
  // return conn.query(`select * from my_guests where firstname = ?`, [firstNameLike])
  return conn.query(`select * from my_guests where firstname like ?`, [`%${firstNameLike}%`])
    .then(([results]) => {
      return results
    })
}

exports.add = function({firstName, lastName, email}) {
  return conn.query('insert into my_guests (firstname, lastname, email) values (?, ?, ?)'
    , [firstName, lastName, email])
}

// setTimeout(() => {
//   getAllGuests()
//     .then(results => {
//       console.log('>.', results)
//     })
// }, 100)