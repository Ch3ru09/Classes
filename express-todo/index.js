const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

const todoModel = require('./model/todo')
const accountModel = require('./model/accounts')
const { cache } = require('ejs')

const tasks = []

var redirectIfNoLogin = function (req, res, next) {
  const userId = req.session.userId
  if (!userId) {
    return res.redirect(301, '/login')
  }
  req.userId = 'aaaaa'
  next()
}

const app = express()
const port = 3000

app.use('/static', express.static('public'))

app.set('trust proxy', 1)

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/', (req, res) => {
  res.render('lobby')
})

app.get('/login', (req, res) => {
  const err = false
  res.render('login', {err})
})

app.post('/login', (req, res) => {
  const {username, password} = req.body
  // accountModel.login({username, password}, function callback(result, userId) {
  //   if (result == true) {
  //     req.session.userId = userId
  //     res.redirect(301, '/todo')
  //     console.log(userId);
  //   } else {
  //     const err = true
  //     res.render('login', {err})
  //     console.log(userId);
  //   }
  // })
  accountModel.loginPromise({username, password})
    .then(userId => {
      if (userId) {
        req.session.userId = userId
        res.redirect(301, '/todo')
        console.log(userId);
      } else {
        const err = true
        res.render('login', {err})
        console.log(userId);
      }
    })
})

app.get('/logout', (req, res) => {
  // req.session.userId = undefined
  delete req.session.userId
  res.redirect(301, '/')

  // req.session.userId = user.id
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  const {username, email, password} = req.body
  accountModel.signup({username, email, password}) 
    .then(user => {
      req.session.userId = user.id
      res.redirect(301, "/todo")
    })
})

// app.post('/redirect', (req, res) => {
//   res.redirect(301, "/todo")
// })

app.use('/todo', redirectIfNoLogin)

app.get('/todo', (req, res) => {
  const userId = req.session.userId
  console.log('login userId:', userId)
  const userInfo = todoModel.getUser(userId)
    .then(info => {
      return {
        // TODO userId: info.userId
        username: info.username,
        email: info.email,
      }
    })
    todoModel.getAll(userId)
      .then(results => {
        res.render('todo', { tasks: results, userId, userInfo })
      })
})

app.post('/todo', (req, res) => {
  const userId = req.session.userId
  const {taskName, taskDescription} = req.body
  todoModel.add({taskName, taskDescription, userId})
    .then(() => {
      res.redirect(301, "/todo")
    })
})

app.post('/todo/:id', (req, res) => {
  const userId = req.session.userId
  const taskId = req.params.id;
  new Promise((resolve, reject) => {
    if (req.body.checkbox == 'checked') {
      resolve(todoModel.update('finished', taskId, userId))
    } else {
      resolve(todoModel.update('unfinished', taskId, userId))
    }
  })
  .then(() => {
    res.redirect(301, "/todo")
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

