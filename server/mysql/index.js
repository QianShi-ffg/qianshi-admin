const mysql = require('mysql')

let sqlConfig = {
  host:'localhost',
  port: '3306',
  user:'root',
  password:'root',
  database:'mysql', //数据库名称
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