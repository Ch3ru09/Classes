const { log } = require('debug')
const { resolveInclude } = require('ejs')
const sha1 = require('js-sha1')

const db = require('./db')

exports.signup = function({username, password, email}) {
  // salts here
  const salt = randomString(64)
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
    token: randomString(32)
  })
    .then(results => {
      const id = results[0].insertId
      return exports.fetch(id)
    })
}

exports.login = ({username, password}, callback) => {
  // takes username, gets the salt and hashed password, hashes login password + salt and compare
  getStored(username, (results) => {
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
        return exports.fetch(userId)
      }
      return
    })
}

function getStoredPromise(username) {
  return db.getConn().query('select id, password, salt from users where username = ?', [username])
    .then(([rows])=> {
      const user = rows[0]
      if (!user) {
        console.debug('User is not exists. username=' + username)
        throw new Error('User is not exists or password does not match.')
      }
      return {
        userId: rows[0].id,
        storedPassword: rows[0].password,
        storedSalt: rows[0].salt,
      }
    })
}

exports.fetch = (id) => {
  return db.getConn().query('select id, username, email, reg_time, token from users where id = ?', [id])
    .then(results => {
      const {id, username, email, reg_time, token} = results[0][0]
      return {
        id,
        username,
        email,
        regTime: reg_time,
        token,
      }
    })
}

exports.fetchByToken = (token) => {
  return db.getConn().query('select id, username, email, reg_time, token from users where token = ?', [token])
    .then(results => {
      const {id, username, email, reg_time, token} = results[0][0]
      console.log('>>', {id, username, email, reg_time, token})
      return {
        id,
        username,
        email,
        regTime: reg_time,
        token,
      }
    })
}

function randomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!/\\@#~:|'
  length = length || 32
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomInt = Math.floor(Math.random() * characters.length)
    result += characters[randomInt]
  }
  return result
}