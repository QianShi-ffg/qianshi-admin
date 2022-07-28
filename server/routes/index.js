
const express = require('express')
// 创建服务器router
const router = express.Router();
// 文件处理
const upload = require('./modules/uploadImg')
// 引入连接池
const { conn, pool } = require('../mysql/index')
// 获取文章列表
router.get('/articleList', async(req, res) => {
  let sql = ''
  if (req.query.id) {
    sql = `select * from articleList where id=${req.query.id}`
  } else {
    sql = 'select * from articleList order by id DESC'
  }
  const results = await conn(sql, null)
  res.json(results)
})


// 保存草稿
router.post('/saveDraft', async(req, res) => {
  console.log(req.query, req.params, req.body)
  const { id, title, articleContent, articleStatus } = req.body
  let sql = ''
  let saveSql = ''
  let data = null
  if (id) {
    sql = `select * from articleList where id=${id}`
    const results = await conn(sql, null)
    if (results.code === 200) {
        saveSql = 'update articleList set ?  where id=?'
        data = [{ id, title, articleContent, articleStatus }, id]
        res.json(await conn(saveSql, data))
    } else {
      res.json(results)
    }
  } else {
    saveSql = 'insert into articleList set ?;'
    // const returnSql = 'select max(id) from articleList;'
    const returnSql = 'SELECT LAST_INSERT_ID();'
    data = { title, articleContent, articleStatus }
    const results = await conn(saveSql, data)
    if (results.code === 200) {
      const res1 = await conn(returnSql, data)
      res1.data = { id: res1.data[0]['LAST_INSERT_ID()'] }
      res.json(res1)
    } else {
      res.json(results)
    }
  }
})

//发布
router.put('/publish', async (req, res) => {
  const { id } = req.body
  let sql = ''
  if (id.split(',').length > 1) {
    sql = `update articleList set articleStatus = 1  where id in (${id})`
  } else {
    sql = `update articleList set articleStatus = 1  where id=${id}`
  }
  const results = await conn(sql)
  res.json(results)
})

// 删除文章
router.delete('/deleteArticle', async (req, res) => {
  const { id } = req.body
  console.log(id)
  let sql = ''
  if (id.split(',').length > 1) {
    sql = `delete from articleList where id in (${id})`
  } else {
    sql = `delete from articleList where id=${id}`
  }
  const results = await conn(sql)
  res.json(results)
})


// 图片上传
router.post('/uploadImg', upload.array('file', 10), (req, res) => {
  const data = req.files.map(item => {
    console.log('文件类型：%s', item.mimetype);
    console.log('原始文件名：%s', item.originalname);
    console.log('文件大小：%s', item.size);
    console.log('文件保存路径：%s', item.path);
    console.log('文件新名称：%s', item.filename);
    const obj = {
      mimetype: item.mimetype,
      originalname: item.originalname,
      size: item.size,
      path: `/public/uploads/${item.filename}`
    }
    return obj
  })
  res.json({ code: 200, data: data });
})


module.exports = router