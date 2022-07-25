
const express = require('express')
// 创建服务器
const router = express.Router();
// const formidable = require('express-formidable')
const upload = require('./modules/uploadImg')
// const { mysql, conn } = require('../mysql/index')
const connection = require('../mysql/index')
// const connection = conn()
// 获取文章列表
router.get('/articleList',(req, res) => {
  let data = {title: '666', articleContent: '999988888888', articleStatus: '0'}
  connection.query('select * from articleList', function(err,results,fields){
    console.log(err,'2222',results, '66666', fields)
    if(!err) {
      res.send({
        code: 200,
        data: results,
        msg: 'success'
      })
    }
  })
  
})


// 图片上传
router.post('/uploadImg', upload.array('file',10), (req, res) => {
  console.log(req,req.files,55555555555)
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
  res.json({code: 200, data: data});
})

// 保存草稿
router.post('/saveDraft', (req, res) => {
  console.log(req.query, req.params, req.body)
  const { title, articleContent, articleStatus } = req.body
  let data = { title, articleContent, articleStatus }
  connection.query('insert into articleList set ?', data, function(err,results,fields){
    console.log(err,results,fields)
    if(!err) {
      res.send({
        code: 200,
        msg: 'success'
      })
    }
  })
})
module.exports = router