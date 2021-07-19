const { log } = require('debug')
const sha1 = require('js-sha1')

const db = require('./db')

exports.add = function({username, password, email}) {
  // salts here
  const salt = createSalt()
  const saltedPassword = password + salt

  // encryption
  const hashedPassword = sha1(saltedPassword)

  // adds it in the database
  //return db.getConn().query("insert into users (username, password, email, salt) values (?, ?, ?, ?)"
  //  , [username, hashedPassword, email, salt])
  return db.getConn().query('insert into users set ?', {
    username,
    password: hashedPassword,
    email,
    salt,
  })
    .then(results => {
      const id = results[0].insertId
      return fetch(id)
    })
}

exports.login = function({username, password}) {

  return user
}

function fetch(id) {
  return db.getConn().query('select id, username, email, reg_time from users where id = ?', [id])
    .then(results => {
      const {id, username, email, reg_time} = results[0][0]
      return {
        id,
        username,
        email,
        regTime: reg_time
      }
    })
}

function createSalt() {
  // salt creation
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!/\\@#~:|"
  const saltlength = 255
  let salt = "";

  for (let i = 0; i < saltlength; i++) {
    const randomInt = Math.floor(Math.random() * characters.length)
    salt += characters[randomInt]
  }
  return salt
}