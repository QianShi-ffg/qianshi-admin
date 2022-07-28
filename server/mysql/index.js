const mysql = require('mysql')

let sqlConfig = {
  host:'188.131.164.41',
  port: '3306',
  user:'1',
  password:'blogServer@147258',
  database:'1', //数据库名称
  useConnectionPooling: true
}

const pool = mysql.createPool(sqlConfig)



// const conn = function(){
//   let connection = mysql.createConnection(sqlConfig)
  
//   connection.connect()
//   connection.on('error',err=>{
//       console.log('Re-connecting lost connection: 已重新连接');
//       connection = mysql.createConnection(sqlConfig)
//   })
//   return function(){
//       return connection
//   }
// }

// const connection = conn()

// module.exports = connection()
module.exports = pool