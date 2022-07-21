const mysql = require('mysql')

let sqlConfig = {
  host:'localhost',
  user:'root',
  password:'root',
  database:'mysql' //数据库名称
}

const conn = function(){
  let connection = mysql.createConnection(sqlConfig)
  connection.connect()
  connection.on('error',err=>{
      console.log('Re-connecting lost connection: 已重新连接');
      connection = mysql.createConnection(sqlConfig)

  })
  return function(){
      return connection
  }
}

module.exports = conn