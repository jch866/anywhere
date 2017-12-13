/**
 * Created by jch866 on 2017/12/13.
 */
const fs = require('fs');
const util = require('util');
const path = require('path');
const handlebars = require('handlebars');

const config = require('../config/defaultConfig');

let stat = util.promisify(fs.stat);
let readdirList = util.promisify(fs.readdir);

//拼接绝对路径
let filepath = path.join(__dirname,'../view/dir.tpl');
let source  = fs.readFileSync(filepath);
//编译模板
let template = handlebars.compile(source.toString())

module.exports = async function (req,res,fpath) {
        try{
            let stats = await stat(fpath);
            if(stats.isFile()){
                res.statusCode=200;
                res.setHeader('Content-Type','text/plain');
                fs.createReadStream(fpath).pipe(res) //这个以流的方式读的速度快
            }else if(stats.isDirectory()){
                let files = await readdirList(fpath);
                //对文件路径的处理
                let dir = path.relative(config.root,fpath) ;
                let data = {
                    title:path.basename(fpath),
                    files,
                    dir:dir?`${dir}`:'',
                }
                res.statusCode=200;
                res.setHeader('Content-Type','text/html');
                res.end(template(data));
            }
        }catch (err){
            console.log(err)
            errTip(req,res,fpath)
        }

}

let errTip=(req,res,fpath)=>{
    res.statusCode=404;
    res.setHeader('Content-Type','text/plain');
    res.end(`${fpath} is not exits or not direction or file`)
}