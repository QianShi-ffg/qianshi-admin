
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
const storage = multer.diskStorage({
  // 用来配置文件上传的位置
  destination: (req, file, cb) => {
    // 调用 cb 即可实现上传位置的配置
    cb(null, './public/uploads')
  },
  // 用来配置上传文件的名称（包含后缀）
  filename: (req, file, cb) => {
    //filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的。
    // 获取文件的后缀
    let ext = path.extname(file.originalname)
    // 拼凑文件名
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

// 创建文件夹
const createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder); 
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }  
};

const uploadFolder = './public/uploads';
createFolder(uploadFolder);

// 创建 multer 对象
const upload = multer({storage: storage})

module.exports = upload
