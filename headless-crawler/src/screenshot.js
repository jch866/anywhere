/**
 * Created by jch866 on 2018/1/10.
 */
const puppeteer = require('puppeteer');
const { screenshot } = require('../config/cfg');
(async () => {
    console.log(puppeteer.toString())
    const browser = await  puppeteer.launch({
        executablePath: '../../chromium/chromium.app/Contents/MacOS/chromium',
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('http://www.baidu.com');
    await page.screenshot({
        path: `${screenshot}/${Date.now()}.png`
    })
    await browser.close();
})()