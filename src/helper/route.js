/**
 * Created by jch866 on 2017/12/13.
 */
const fs = require('fs');
const util = require('util');
let stat = util.promisify(fs.stat);
let readdirList = util.promisify(fs.readdir);
module.exports = async function (req,res,path) {
        try{
            let stats = await stat(path);
            if(stats.isFile()){
                res.statusCode=200;
                res.setHeader('Content-Type','text/plain');
                fs.createReadStream(path).pipe(res) //这个以流的方式读的速度快
            }else if(stats.isDirectory()){
                let files = await readdirList(path)
                res.statusCode=200;
                res.setHeader('Content-Type','text/plain');
                res.end(files.join('\n'))
            }
        }catch (err){
            errTip(req,res,path)
        }

}

let errTip=(req,res,path)=>{
    res.statusCode=404;
    res.setHeader('Content-Type','text/plain');
    res.end(`${path} is not exits or not direction or file`)
}