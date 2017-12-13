/**
 * Created by jch866 on 2017/12/13.
 */
const http = require('http');
const chalk = require('chalk');
const path=require('path');
const cfg = require('./config/defaultConfig')
const route =  require('./helper/route')

let server = http.createServer((req,res)=>{
    let fspath = path.join(cfg.root,req.url);
    route(req,res,fspath);
})
server.listen(cfg.port,cfg.host,()=>{
    let addr = `http://${cfg.host}:${cfg.port}`;
    console.info(`Server start at ${chalk.green(addr)}`)
})