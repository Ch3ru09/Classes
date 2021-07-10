const express = require('express')
const bodyParser = require('body-parser')

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
  res.redirect(301, "/Todo")
})

app.post('/Todo', (req, res) => {
  const {name, description} = req.body
  tasks.push({
    id: idIndex++,
    name,
    description
  })
  res.redirect(301, "/Todo")
})

app.get('/Todo', (req, res) => {
  res.render('todo', { tasks })
})

app.post('/Todo/:id', (req, res) => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == req.params.id) {
      if (req.body.checkbox == 'checked') {
        tasks[i].done = true
      } else {
        tasks[i].done = false
      }
    }
  }
  // res.redirect(301, "/Todo")
  res.send("hi")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

