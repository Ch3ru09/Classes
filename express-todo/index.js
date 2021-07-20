const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')


const todoModel = require('./model/todo')
const signupModel = require('./model/signup')

const tasks = []

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
  console.log('>>>>', req.session.userId)
  res.render('lobby')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {

  // req.session.userId = user.id
})

app.get('/logout', (req, res) => {
  // req.session.userId = undefined
  delete req.session.userId
  res.send('logout!')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  const {username, email, password} = req.body
  signupModel.add({username, email, password}) 
    .then(user => {
      req.session.userId = user.id
      res.redirect(301, "/todo")
      // add which user here
    })
})

// app.post('/redirect', (req, res) => {
//   res.redirect(301, "/todo")
// })

app.post('/todo', (req, res) => {
  const {taskName, taskDescription} = req.body
  todoModel.add({taskName, taskDescription})
    .then(() => {
      res.redirect(301, "/todo")
    })
})

app.get('/todo', (req, res) => {
  console.log('>>>>', req.session.userId)
  todoModel.getAll(username)
    .then(results => {
        res.render('todo', { tasks: results })
    })
})

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

