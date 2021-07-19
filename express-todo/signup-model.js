const { log } = require('debug')
const mysql = require('mysql2/promise')
const sha1 = require('js-sha1')

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
  // salt creation
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!/\\@#~:|"
  const saltlength = 255
  let salt = "";

  for (let i = 0; i < saltlength; i++) {
    const randomInt = Math.floor(Math.random() * characters.length)
    salt += characters[randomInt]
  }

  // salts here
  const saltedPassword = password + salt

  // encryption
  const hashedPassword = sha1(saltedPassword)

  // adds it in the database
  return conn.query("insert into users (username, password, email, salt) values (?, ?, ?, ?)"
    , [username, hashedPassword, email, salt])
}