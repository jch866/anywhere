/**
 * Created by jch866 on 2017/12/13.
 */
const path = require('path');
const mime = {
    'swf':' application/x-shockwave-flash',
    'dll':'   application/x-msdownload',
    'exe':' application/octet-stream',
    'msi':' application/octet-stream',
    'chm':' application/octet-stream',
    'cab':' application/octet-stream',
    'ocx':' application/octet-stream',
    'rar':'  application/octet-stream',
    'tar':'  application/x-tar',
    'tgz':' application/x-compressed',
    'zip':' application/x-zip-compressed',
    'wav':'audio/wav',
    'wma':'audio/x-ms-wma',
    'wmv':'video/x-ms-wmv',
    'bmp':'  image/bmp',
    'gif':'  image/gif',
    'png':' image/png',
    'jpg':'  image/jpeg',
    'jpeg':'  image/jpeg',
    'txt':'    text/plain',
    'xml':'  text/xml',
    'html':'   text/html',
    'css':'   text/css',
    'js':'    text/javascript'
}
module.exports =  (filepath)=>{
    //pop()返回数组最后一个值
    let ext = path.extname(filepath).split('.').pop().toLowerCase();
    //console.log(ext)
    if(ext){
        return mime[ext]
    }else{
        ext = filepath;
        return mime['txt']
    }
}