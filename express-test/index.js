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
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
  // res.render('index', { currentTime: new Date() })
  res.render('users', { users })
})

app.post('/users', (req, res) => {
  // console.log(req.body)
  const {name, password} = req.body
  users.push({
    id: idIndex++,
    name,
    password,
    createdAt: new Date(),
  })
  console.log(users)

  // res.send('Got it!')
  // res.render('users', { users })
  res.redirect(301, '/users')
})

app.post('/users/:id', (req, res) => {
  console.log('id: ', req.params.id)
  console.log('checkStatus: ', req.body.checkStatus)
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == req.params.id) {
      console.log('user found!')
      if (req.body.checkStatus == 'checked') {
        users[i].done = true
      } else {
        users[i].done = false
      }
    }
  }
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

