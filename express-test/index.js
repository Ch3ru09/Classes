const express = require('express')
const bodyParser = require('body-parser')

const userModel = require('./user-model')

let idIndex = 0
const users = []

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
  // res.render('index', { currentTime: new Date() })
  userModel.getAll()
    .then(results => {
      res.render('users', { users: results })
    })
})

app.post('/users', (req, res) => {
  // console.log(req.body)
  const {firstName, lastName} = req.body
  userModel.add({firstName, lastName})
    .then(() => {
      res.redirect(301, '/users')
    })
})

app.post('/users/:id', (req, res) => {
  console.log('id: ', req.params.id)
  const {checkStatus, firstName, lastName} = req.body
  userModel.update(req.params.id, {checkStatus, firstName, lastName})
    .then(() => {
      res.redirect('/users')
    })
})

app.get('/search', (req, res) => {
  const {firstNameLike} = req.query
  userModel.search({firstNameLike})
    .then(results => {
      res.render('users', { users: results })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

