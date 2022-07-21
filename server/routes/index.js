
const express = require('express')
// 创建服务器
const router = express.Router();
const upload = require('./modules/uploadImg')

// 获取文章列表
router.get('/articleList',(req, res) => {
  res.send({
    code:0,
    data:{aa:66666666666}  
  })
})


// 图片上传
router.post('/uploadImg', upload.array('file',10), (req, res) => {
  console.log(req.file,req.files,55555555555)
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
module.exports = router