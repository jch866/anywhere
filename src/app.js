/**
 * Created by jch866 on 2017/12/13.
 */
const http = require('http');
const chalk = require('chalk');
const path = require('path');
const cfg = require('./config/defaultConfig')
const route = require('./helper/route');
const openUrl = require('./helper/openUrl');

class Server {
    constructor(config) {
        this.cfg = Object.assign({}, cfg, config)
    }

    start() {
        let server = http.createServer((req, res) => {
            let fspath = path.join(this.cfg.root, req.url);
            //route(req,res,fspath);
            route(req, res, fspath, this.cfg); //便于获取自定义的config
        })
        server.listen(this.cfg.port, this.cfg.host, () => {
            let addr = `http://${this.cfg.host}:${this.cfg.port}`;
            console.info(`Server start at ${chalk.green(addr)}`);
            openUrl(addr)
        })
    }
}

module.exports = Server;