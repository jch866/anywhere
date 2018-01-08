/**
 * Created by jch866 on 2017/12/13.
 */
const fs = require('fs');
const util = require('util');
const path = require('path');
const handlebars = require('handlebars');//模块引擎

const mimeType = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isRefresh = require('./cache');

let stat = util.promisify(fs.stat);
let readdirList = util.promisify(fs.readdir);

//拼接绝对路径
let filepath = path.join(__dirname, '../view/dir.html');
let source = fs.readFileSync(filepath);
//编译模板
let template = handlebars.compile(source.toString())

module.exports = async function (req, res, fpath, config) {
    try {
        let stats = await stat(fpath);
        if (stats.isFile()) {
            //返回识别的文件
            let contentType = mimeType(fpath);
            res.setHeader('Content-Type', contentType);
            if (isRefresh(stats, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }
            let rs;
            let {code, start, end} = range(stats.size, req, res);
            if (code === 200) {
                res.statusCode = 200;
                rs = fs.createReadStream(fpath);
            } else {
                res.statusCode = 206;
                rs = fs.createReadStream(fpath, {start, end});
            }
            if (fpath.match(config.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res) //这个以流的方式读的速度快
        } else if (stats.isDirectory()) {
            let files = await readdirList(fpath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            //对文件路径的处理
            let dir = path.relative(config.root, fpath);
            let data = {
                title: path.basename(fpath),
                files: files.map((file) => {
                    return {
                        file,
                        //todo  find some icons
                        typeOrIcon: mimeType(file)
                    }
                }),
                dir: dir ? `/${dir}` : '',
            }

            res.end(template(data));
        }
    } catch (err) {
        console.log(err)
        errTip(req, res, fpath)
    }

}

let errTip = (req, res, fpath) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${fpath} is not exits or not direction or file -----------`)
}