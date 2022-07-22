const express = require('express')
// 创建服务器
const app = express();
const formidable = require('express-formidable')

const conn = require('./mysql/index')
const router = require('./routes/index')
conn()
// app.use('/articleList',formidable());
app.use('/public', express.static('./public/'))
app.use((req,res,next)=>{
  if(req.originalUrl === '/uploadImg'){
    next()
  } else {
    app.use(formidable());
    next()
  }
})
app.use('/', router);



app.listen(3000, ()=>{
  console.log('服务已启动............')
})
