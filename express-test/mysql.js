const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mytest'
})

function getAllGuestsCb(cb) {
  conn.query('select * from my_guests', function(err, results, fields) {
    cb(err, results)
  })
}

function getAllGuestsPromise() {
  
}

getAllGuests((err, results) => {
  console.log('results', results)
  conn.end()
})