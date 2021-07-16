const express = require('express')
const bodyParser = require('body-parser')

const todoModel = require('./todo-model')

let idIndex = 0
const tasks = []

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('../lobby/lobby')
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
  for (let i = 0; i < tasks.length; i++) {
    const taskId = req.params.id;
    if (tasks[i].id == taskId) {
      if (req.body.checkbox == 'checked') {
        todoModel.update('finished', taskId)
      } else {
        todoModel.update('unfinished', taskId) 
      }
    }
  }
  // res.redirect(301, "/todo")
  res.send("hi")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

