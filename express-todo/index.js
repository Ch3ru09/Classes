const express = require('express')
const bodyParser = require('body-parser')


<<<<<<< Updated upstream
const todoModel = require('./todo-model')
const signupModel = require('./signup-model')
=======
const todoModel = require('./model/todo')
const accountModel = require('./model/accounts')
>>>>>>> Stashed changes

const tasks = []

const app = express()
const port = 3000

app.use('/static', express.static('public'))

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('lobby')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
<<<<<<< Updated upstream

=======
  // req.session.userId = user.id
  const {username, password} = req.body
  accountModel.login({username, password}, function callback(result) {
    console.log(">", result);
    if (result == true) {
      res.redirect(301, '/todo')
    } else {
      res
    }
  })
})

app.get('/logout', (req, res) => {
  // req.session.userId = undefined
  delete req.session.userId
  res.redirect(301, '/')
>>>>>>> Stashed changes
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  const {username, email, password} = req.body
  accountModel.signup({username, email, password}) 
    .then(user => {
      res.redirect(301, "/todo")
      // add which user here
    })
})

// app.post('/redirect', (req, res) => {
//   res.redirect(301, "/todo")
// })

app.get('/todo', (req, res) => {
  const userId = req.session.userId
  todoModel.getAll(userId)
    .then(results => {
      res.render('todo', { tasks: results, userId })
    })
})

app.post('/todo', (req, res) => {
  const {taskName, taskDescription} = req.body
  const userId = req.session.userId
  todoModel.add({taskName, taskDescription, userId})
    .then(() => {
      res.redirect(301, "/todo")
    })
})

<<<<<<< Updated upstream
app.get('/todo', (req, res) => {
  todoModel.getAll(username)
    .then(results => {
        res.render('todo', { tasks: results })
    })
})

=======
>>>>>>> Stashed changes
app.post('/todo/:id', (req, res) => {
  const taskId = req.params.id;
  console.log(" checkbox >> ", req.body.checkbox)
  new Promise((resolve, reject) => {
    console.log(" checkbox >> ", req.body.checkbox)
    if (req.body.checkbox == 'checked') {
      resolve(todoModel.update('finished', taskId))
    } else {
      resolve(todoModel.update('unfinished', taskId))
    }
  })
  .then(() => {
    res.redirect(301, "/todo")
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

