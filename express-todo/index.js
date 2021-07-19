const express = require('express')
const bodyParser = require('body-parser')

const todoModel = require('./todo-model')

let idIndex = 0
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

})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/signup', (req, res) => {
  
})

app.post('/redirect', (req, res) => {
  res.redirect(301, "/todo")
})

app.post('/todo', (req, res) => {
  const {taskName, taskDescription} = req.body
  todoModel.add({taskName, taskDescription})
    .then(() => {
      res.redirect(301, "/todo")
    })
})

app.get('/todo', (req, res) => {
  todoModel.getAll()
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

