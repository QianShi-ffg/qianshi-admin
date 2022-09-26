const mysql = require('mysql')

let sqlConfig = {
  host:'localhost',
  port: '3306',
  user:'root',
  password:'root',
  database:'root', //数据库名称
  useConnectionPooling: true
}

// 不使用连接池方案
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


const pool = mysql.createPool(sqlConfig)

const conn = (sql, data) => {
  return new Promise((resolve, reject) => {
    // const fn =
    // if (data) {
      pool.getConnection((err, connection) => {
        if (err) return reject(err)
        connection.query(sql, data, (err, results, fields) => {
          connection.release();
          if (err) {
            return resolve({
              code: 500,
              msg: err
            });
          } else {
            return resolve({
              code: 200,
              data: Object.prototype.toString.call(results) === '[object Array]' ? results : '',
              msg: 'success'
            })
          }
        })
      })
    // } else {
    //   pool.getConnection((err, connection) => {
    //     connection.query(sql, fn)
    //     connection.release();
    //   })
    // }
  })
}
exports.conn = conn
exports.pool = pool
// module.exports = pool.getConnection((err, connection) => {