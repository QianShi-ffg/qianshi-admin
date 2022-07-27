
const express = require('express')
// 创建服务器router
const router = express.Router();
// 文件处理
const upload = require('./modules/uploadImg')
// 引入连接池
const pool = require('../mysql/index')
// 获取文章列表
router.get('/articleList', async(req, res) => {
  let sql = ''
  if (req.query.id) {
    sql = `select * from articleList where id=${req.query.id}`
  } else {
    sql = 'select * from articleList'
  }
  await conn(pool, sql, null, res)
  // pool.getConnection((err, connection) => {
  //   connection.query(sql, function (err, results) {
  //     if (!err) {
  //       res.json({
  //         code: 200,
  //         data: results,
  //         msg: 'success'
  //       })
  //     }
  //     // connection.release()
  //   })
  // })
})


// pool.getConnection((err, connection) => {
//   if (err) throw err
//   router.get('/articleList', (req, res) => {
//     let sql = ''
//     if (req.query.id) {
//       sql = `select * from articleList where id=${req.query.id}`
//     } else {
//       sql = 'select * from articleList'
//     }
//     connection.query(sql, function (err, results, fields) {
//       if (!err) {
//         res.json({
//           code: 200,
//           data: results,
//           msg: 'success'
//         })
//       }
//     })
//   })

//   // 保存草稿
//   router.post('/saveDraft', async(req, res) => {
//     console.log(req.query, req.params, req.body)
//     const { id, title, articleContent, articleStatus } = req.body
//     let sql = ''
//     let saveSql = ''
//     let data = null
//     if (id) {
//       sql = `select * from articleList where id=${id}`
//       connection.query(sql, (err, results, fields) => {
//         console.log(err, results, fields)
//         if (!err) {
//           saveSql = 'update articleList set ?  where id=?'
//           data = [{ id, title, articleContent, articleStatus }, id]
//           conn(connection, saveSql, data, res)
//         } else {
//           res.send({ code: 500,msg: err })
//         }
//       })
//     } else {
//       saveSql = 'insert into articleList set ?'
//       data = { title, articleContent, articleStatus }
//       conn(connection, saveSql, data, res)
//     }
//   })

//   // 删除文章
//   router.delete('/deleteArticle', (req, res) => {
//     const { id } = req.body
//     console.log(id.split(','))
//     let sql = 'delete from articleList where id=?'
//     connection.query(sql, id.split(','), function (err, results, fields) {
//       if (!err) {
//         res.json({
//           code: 200,
//           data: results,
//           msg: 'success'
//         })
//       }
//     })
//     // res.json({
//     //         code: 200,
//     //         msg: 'success'
//     //       })
//     // if (req.query.id) {
//     //   sql = `select * from articleList where id=${req.query.id}`
//     // } else {
//     //   // sql = 'delete from articleList where id in (640,634,633);'
//     //   sql = 'delete from articleList where id=?;'
//     // }
    
//   })
//   // 释放
//   // connection.release();
// })


// // 图片上传
// router.post('/uploadImg', upload.array('file', 10), (req, res) => {
//   const data = req.files.map(item => {
//     console.log('文件类型：%s', item.mimetype);
//     console.log('原始文件名：%s', item.originalname);
//     console.log('文件大小：%s', item.size);
//     console.log('文件保存路径：%s', item.path);
//     console.log('文件新名称：%s', item.filename);
//     const obj = {
//       mimetype: item.mimetype,
//       originalname: item.originalname,
//       size: item.size,
//       path: `/public/uploads/${item.filename}`
//     }
//     return obj
//   })
//   res.json({ code: 200, data: data });
// })


const conn = (pool, sql, data, res) => {
  const callback = (err, results, fields) => {
    if (!err) {
      res.send({
        code: 200,
        data: Object.prototype.toString.call(results) === '[object Array]' ? results : '',
        msg: 'success'
      })
    } else {
      res.send({ code: 500,msg: err })
    }
  }
  if (data) {
    pool.getConnection((err, connection) => {
      connection.query(sql, data, callback)
      // connection.release();
    })
  } else {
    pool.getConnection((err, connection) => {
      connection.query(sql, callback)
      // connection.release();
    })
  }
}
module.exports = router