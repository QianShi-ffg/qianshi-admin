const express = require('express')
// 创建服务器
const app = express();
const bodyParser = require('body-parser')
const formidable = require('express-formidable')

app.use(bodyParser.urlencoded({extended:true})) 
 // 将数据转换为json格式
app.use(bodyParser.json())
const router = require('./routes/index')
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
