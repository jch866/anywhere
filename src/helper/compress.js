/**
 * Created by jch866 on 2017/12/13.
 */
const {createGzip,createDeflate}=require('zlib');
//const cfg = require('../config/defaultConfig')
module.exports = (readstream,req,res)=>{
    let acceptEncoding = req.headers['accept-encoding'];
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return readstream
    }else if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip')
        return readstream.pipe(createGzip())
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding','deflate')
       return  readstream.pipe(createDeflate())
    }
}