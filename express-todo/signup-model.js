exports.add = function({username, password, email}) {
  return conn.query("insert into users (username, password, email) values (?, ?, ?)"
    , [username, password, email])
}
