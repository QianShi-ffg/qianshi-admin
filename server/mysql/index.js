const mysql = require('mysql')

let sqlConfig = {
  host:'188.131.164.41',
  port: '3306',
  user:'blogServer',
  password:'blogServer@123',
  database:'blogserver', //数据库名称
  useConnectionPooling: true
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

const connection = conn()
// console.log(connection().query())
module.exports = connection()