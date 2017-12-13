/**
 * Created by jch866 on 2017/12/13.
 */
const http = require('http');
const chalk = require('chalk');
const path=require('path');
const fs = require('fs');
const cfg = require('./config/defaultConfig');
let server = http.createServer((req,res)=>{

    let fspath = path.join(cfg.root,req.url);
    fs.stat(fspath,(err,stat)=>{
        if(err){
            res.statusCode=404;
            res.setHeader('Content-Type','text/plain');
            res.end(`${fspath} is not exits or not direction or file`)
            return
        }
        if(stat.isFile()){
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain');
            // fs.readFile(fspath,(err,data) =>{
            //     res.end(data)
            // })
            fs.createReadStream(fspath).pipe(res) //这个以流的方式读的速度快
        }else if(stat.isDirectory()){
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain');
            fs.readdir(fspath,(err,files) =>{
                res.end(files.join('\n'))
            })
        }
    })

})
server.listen(cfg.port,cfg.host,()=>{
    let addr = `http://${cfg.host}:${cfg.port}`;
    console.info(`Server start at ${chalk.green(addr)}`)
})