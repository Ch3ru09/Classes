const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')

const todoModel = require('./model/todo')
const accountModel = require('./model/accounts')

var redirectIfNoLogin = function (req, res, next) {
  const userId = req.session.userId
  if (userId == 'undefined') {
    // return res.status(403)
    return res.redirect(301, '/login')
  }
  // req.user = user
  next()
}

const app = express()
const port = 3000

app.use('/static', express.static('public'))

app.set('trust proxy', 1)

app.use(cors())
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
      if (typeof userId != 'undefined') {
        req.session.userId = userId
        res.redirect(301, '/todo')
      } else {
        const err = true
        res.render('login', {err})
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
      res.redirect(301, '/todo')
    })
})

// app.post('/redirect', (req, res) => {
//   res.redirect(301, "/todo")
// })

app.use('/todo', redirectIfNoLogin)

app.get('/todo', (req, res) => {
  const userId = req.session.userId
  accountModel.getUser(userId)
    .then((info) => {
      return {
        username: info.username, 
        email: info.email
      }
    })
    .then(userInfo => {
      todoModel.getAll(userId)
        .then(results => {
          res.render('todo', { tasks: results, userId, userInfo })
        })
    })
  
})

app.post('/todo', (req, res) => {
  const userId = req.session.userId
  const {taskName, taskDescription} = req.body
  todoModel.add({taskName, taskDescription, userId})
    .then(() => {
      res.redirect(301, '/todo')
    })
})

app.post('/api/todos', (req, res) => {
  const {taskName, taskDescription, userId} = req.body
  todoModel.add({taskName, taskDescription, userId})
    .then(todo => {
      return res.json(todo)
    })
})

app.get('/api/todos', (_req, res) => {
  todoModel.fetchTodos(1)
    .then(todos => {
      return res.json(todos)
    })
})

app.put('/api/todos/:id', (req, res) => {
  const {status, userId} = req.body
  todoModel.update(status, req.params.id, userId)
    .then(todo => {
      if (todo) {
        return res.json(todo)
      }
      return res.status(404).end()
    })
})

app.delete('/api/todos/:id', (req, res) => {
  const {userId} = req.body
  todoModel.remove(req.params.id, userId)
    .then(id => {
      return res.send(id)
    })
})

app.post('/todo/:id', (req, res) => {
  const userId = req.session.userId
  const taskId = req.params.id
  new Promise((resolve, _reject) => {
    if (req.body.checkbox == 'checked') {
      resolve(todoModel.update('finished', taskId, userId))
    } else {
      resolve(todoModel.update('unfinished', taskId, userId))
    }
  })
    .then(() => {
      res.redirect(301, '/todo')
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

