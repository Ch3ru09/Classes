const { log } = require('debug')
const sha1 = require('js-sha1')

const db = require('./db')

exports.add = function({username, password, email}) {
  // salts here
  const saltedPassword = password + createSalt()

  // encryption
  const hashedPassword = sha1(saltedPassword)

  // adds it in the database
  return db.getConn().query("insert into users (username, password, email, salt) values (?, ?, ?, ?)"
    , [username, hashedPassword, email, salt])
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