const express = require('express')
const bodyParser = require('body-parser')

let idIndex = 0
const users = []

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
  todo.push({
    name,
    description
  })
})

app.get('/Todo', (req, res) => {
  // res.render('index', { currentTime: new Date() })
  res.render('todo', { users })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

