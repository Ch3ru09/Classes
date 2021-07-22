const { log } = require('debug')
const { resolveInclude } = require('ejs')
const sha1 = require('js-sha1')

const db = require('./db')

exports.signup = function({username, password, email}) {
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

exports.login = ({username, password}, callback) => {
  // takes username, gets the salt and hashed password, hashes login password + salt and compare
  const isUser = getStored(username, (results) => {
    const {userId, storedPassword, storedSalt} = results;
    const inputPassword = sha1(password + storedSalt)
    if (inputPassword == storedPassword) {
      callback(true, userId)
    } else {
      callback(false)
    }
  })
}

function getStored(username, cb) {
  return db.getConn().query('select id, password, salt from users where username = ?', [username])
    .then(results => {
      const {id, password, salt} = results[0][0]
      cb({
        userId: id,
        storedPassword: password,
        storedSalt: salt
      })
    })
}

exports.loginPromise = ({username, password}) => {
  return getStoredPromise(username)
    .then(({userId, storedPassword, storedSalt}) => {
      const inputPassword = sha1(password + storedSalt)
      if (inputPassword == storedPassword) {
        return userId
      }
      return 
    })
}

function getStoredPromise(username) {
  return db.getConn().query('select id, password, salt from users where username = ?', [username])
    .then(([rows])=> {
      return {
        userId: rows[0].id,
        storedPassword: rows[0].password,
        storedSalt: rows[0].salt,
      }
    })
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