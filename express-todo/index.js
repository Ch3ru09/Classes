const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')
const fileUpload = require('express-fileupload')

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

const fetchUserByToken = (req, res, next) => {
  const userToken = req.headers['x-user-token']
  accountModel.fetchByToken(userToken)
    .then(user => {
      req.user = user
      next()
    })
    .catch(() => {
      return res.status(401).send({
        errMessage: 'User not found'
      })
    })
}

const app = express()
const port = 3000

app.use(fileUpload())
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
    .then(({id: userId}) => {
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
  accountModel.fetch(userId)
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

app.post('/api/signup', (req, res) => {
  const {username, email, password} = req.body
  accountModel.signup({username, email, password}) 
    .then(user => {
      return res.json(user)
    })
})

app.post('/api/login', (req, res) => {
  const {username, password} = req.body
  accountModel.loginPromise({username, password})
    .then(user => {
      return res.json(user)
    })
    .catch(err => {
      return res.status(401).send({
        errMessage: err.message
      })
    })
})

app.use('/api/todos', fetchUserByToken)

app.post('/api/todos', (req, res) => {
  const {taskName, taskDescription} = req.body
  todoModel.add({taskName, taskDescription, userId: req.user.id})
    .then(todo => {
      return res.json(todo)
    })
})

app.get('/api/todos', (req, res) => {
  todoModel.fetchTodos(req.user.id)
    .then(todos => {
      return res.json(todos)
    })
})

app.put('/api/todos/:id', (req, res) => {
  const {status} = req.body
  todoModel.update(status, req.params.id, req.user.id)
    .then(todo => {
      if (todo) {
        return res.json(todo)
      }
      return res.status(404).end()
    })
})

app.post('/api/todos/image/:id', (req, res) => {
  const image = req.files.photo
  image.data = Buffer.from(image.data).toString('binary')
  todoModel.image(image, req.params.id, req.user.id)
    .then(todo => {
      if (todo) {
        return res.json(todo)
      }
      return res.status(404).end()
    })
})

app.delete('/api/todos/:id', (req, res) => {
  todoModel.remove(req.params.id, req.user.id)
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

