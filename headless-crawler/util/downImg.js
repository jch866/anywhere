/**
 * Created by jch866 on 2018/1/11.
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);
let count=0;

const urlToImg = promisify((url, dir, callback) => {
    let ext = path.extname(url);
    let mode = /^http:/.test(url) ? http : https;
    let filedir = `${dir}/${Date.now()}${ext}`;
    //let filedir = path.join(path,`${Date.now()}${ext}`);
    mode.get(url, res => {
        res.pipe(fs.createWriteStream(filedir))
            .on('finish', () => {
                callback && callback(); //把回调改成await
                count++
                console.log(`${filedir}===${count}`);
            })
    })
})

const base64ToImg = async (base64str, dir) => {
    // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAg
    const reg = /^data:(.+?);base64,(.+)$/;

    try {
        let matches = base64str.match(reg);
        let ext = matches[1].split('/')[1].replace('jpeg', 'jpg');
        let file = path.join(dir, `${Date.now()}.${ext}`);
        let content = matches[2];
        await writeFile(file, content, 'base64');
        count++;
    } catch (e) {
        console.log('base64 has wrong')
    }
}
module.exports = async (url, dir) => {
    if ((/.(jpg|gif|png)$/).test(url)) {
        // console.log(url)
        await urlToImg(url, dir) //因为用promisify处理成了promise函数 才可以用await
    } else {
        await base64ToImg(url, dir)
    }
}

