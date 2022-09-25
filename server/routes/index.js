
const express = require('express')
const dayjs = require('dayjs')
// 创建服务器router
const router = express.Router();
// 文件处理
const upload = require('./modules/uploadImg')
// 引入连接池
const { conn, pool } = require('../mysql/index')
const axios = require("axios")

let refresh_token = '122.3d94748d6fc63e9366ad0634d061313c.YliRhfr5Xyc8yUHxptVOu3aOTOs9Q6v3n4kptl-.jAPGew'
let access_token = '121.39d0b9c5d88acc152ec57d0ca317163f.YCy7fJAT4xW05TeHQeywF-g0s62H_K6H16Qn-sn._sZ8lA'
let expires_in = ''
const apiKey = 'PLFuZ5UHascuRd9cANO6SrMdP8GhX6lF'
const secretKey = 'rYhbIuz4YWqK3PTNqzpK5xRzGGpNjbp1'
// 注册
router.post('/signUp', async(req, res) => {
  console.log(req.body)
  const { name, password } = req.body
  const sql1 = `select count(name) from user where name='${name}';`
  const sql2 = 'insert into user set ?;'
  const  data = { name, password }
  const results = await conn(sql1)
  if (results.code === 200) {
    if (results.data[0]['count(name)'] === 0) {
      const results = await conn(sql2, data)
      res.json(results)
    } else {
      res.json({code: 200, msg: '该名称已被注册'})
    }
  } else {
    res.json(results)
  }
})

// 登录
router.post('/login', async(req, res) => {
  const { name, password} = req.body
  const sql = `select * from user where name='${name}' and password='${password}';`
  const results = await conn(sql)
  if (results.code === 200) {
    if (results.data.length !== 0) {
      res.json(results)
    } else {
      res.json({code: 200, msg: '该账号不存在，请先注册后再次尝试'})
    }
  } else {
    res.json(results)
  }
})

router.get('/overview',(req, res) => {
  console.log(dayjs().subtract(90, 'day').format('YYYYMMDD'))
  const params = {
    access_token: access_token,
    site_id: '18341059',
    method: 'overview/getTimeTrendRpt',
    start_date: '20220701',
    end_date: dayjs().format('YYYYMMDD'),
    metrics: 'pv_count,visitor_count'
  }
  axios.get('https://openapi.baidu.com/rest/2.0/tongji/report/getData',
    {
      params: {
        access_token: access_token,
        site_id: '18341059',
        method: 'overview/getTimeTrendRpt',
        start_date: dayjs().subtract(90, 'day').format('YYYYMMDD'),
        end_date: dayjs().format('YYYYMMDD'),
        metrics: 'pv_count,visitor_count'
      }
    }).then(result => {
      res.json({code: 200, data: result.data.result, message: '获取数据成功'})
    }).catch(err => {
      console.log(err)
      if (err.data.error_code === 110) {
        res.json({code: 110, data: [], message: 'token过期,正在重新刷新token'})
      }
    })
})

router.get('/refreshToken',(req, res) => {
  axios(
    {
      url: 'http://openapi.baidu.com/oauth/2.0/token',
      method: 'get',
      params: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: apiKey,
        client_secret: secretKey
      }
    }).then(result => {
      refresh_token = result.data.refresh_token
      access_token = result.data.access_token
      expires_in = result.data.expires_in
      res.json({code: 200, data: result.data, message: '获取数据成功'})
    }).catch(err => {
      console.log(err)
      res.json({code: 2001, message: err.data })
    })
})

// 获取文章列表
router.get('/articleList', async(req, res) => {
  const { page, pageSize } = req.query
  let sql = ''
  if (req.query.id) {
    sql = `select * from articleList where id=${req.query.id}`
  } else {
    sql = `select * from articleList order by id DESC limit ${(page - 1)*pageSize},${pageSize}`
  }
  const results1 = await conn(sql, null)
  const sqlS = 'select count(*) from articleList'
  const results2 = await conn(sqlS, null)
  res.json({code: 200, data:results1.data, total: results2.data[0]['count(*)'], msg: results1.msg})
})


// 获取文章列表(博客端)
router.get('/publishArticleList', async(req, res) => {
  const { page, pageSize } = req.query
  let sql = ''
  let sqlS = ''
  // 条件查询
  if (req.query.type) {
    if (req.query.type === 'category') {
      sql = `select * from articleList where classifyId=${req.query.id} and articleStatus=1 limit ${(page - 1)*pageSize},${pageSize}`
      sqlS = `select count(*) from articleList where classifyId=${req.query.id} and articleStatus=1`
    }
  } else {
    if (req.query.id) {
      sql = `select * from articleList where id=${req.query.id} and articleStatus=1`
      const results = await conn(sql, null)
      res.json(results)
      return 
    } else {
      sql = `select * from articleList where articleStatus=1 order by id DESC limit ${(page - 1)*pageSize},${pageSize}`
      sqlS = 'select count(*) from articleList where articleStatus=1'
    }
  }
  const results1 = await conn(sql, null)
  const results2 = await conn(sqlS, null)
  res.json({code: 200, data: { rows: results1.data, total: results2.data[0]['count(*)'] }, msg: results1.msg})
})


// 保存草稿
router.post('/saveDraft', async(req, res) => {
  console.log(req.query, req.params, req.body)
  const { id, title, articleContent, articleStatus, classifyId, describe, coverUrl } = req.body
  let sql = ''
  let saveSql = ''
  let data = null
  if (id) {
    sql = `select * from articleList where id=${id}`
    const results = await conn(sql, null)
    if (results.code === 200) {
        saveSql = 'update articleList set ?  where id=?'
        data = [{ id, title, articleContent, articleStatus, classifyId, describe, coverUrl }, id]
        res.json(await conn(saveSql, data))
    } else {
      res.json(results)
    }
  } else {
    saveSql = 'insert into articleList set ?;'
    // const returnSql = 'select max(id) from articleList;'
    const returnSql = 'SELECT LAST_INSERT_ID();'
    data = { title, articleContent, articleStatus, classifyId, describe, coverUrl }
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


// 获取分类列表
router.get('/classifyList', async(req, res) => {
  const sql = `select a.*, count(*) as 'artNum' from classifylist as a 
  INNER JOIN articlelist as b 
  WHERE a.id = b.classifyId
  GROUP BY a.id
  order by id asc
  `
  const results = await conn(sql, null)
  res.json(results)
})

// 添加分类
router.post('/saveClassify', async(req, res) => {
  const { name, describe } = req.body
  const sql = 'insert into classifyList set ?;'
  const data = { name, describe }
  const results = await conn(sql, data)
  res.json(results)
})


module.exports = router