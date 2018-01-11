/**
 * Created by jch866 on 2018/1/11.
 */
const puppeteer = require('puppeteer');
const {baidu_img_path} = require('../config/cfg');
const downImg = require('../util/downImg');

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '../../chromium/Chromium.app/Contents/MacOs/Chromium',
        headless: true
    })
    const page = await browser.newPage();
    await page.goto('https://image.baidu.com/');
    console.log('current page is baidu')
    await page.setViewport({
        width: 2880,
        height: 1800
    })

    await page.focus('#kw');
    await page.keyboard.sendCharacter('狗');
    await page.keyboard.down('Enter');//直接回车也可以搜索
    // try {
    //     await page.click('.s_search');
    // } catch (e) {
    //     console.log(e);
    //     console.log('this selector may be not exist!');
    //     browser.close();
    //     return;
    // }
    console.log('go to search page')
    page.on('load', async () => {
        console.log('page loaded,start fetch')
        const srcs = await page.evaluate(() => {
            const imgs = document.querySelectorAll('img.main_img');
            return Array.prototype.map.call(imgs, img => img.src)
        });
        console.log(srcs.length);
        srcs.forEach(async (src) => {
            await page.waitFor(200);
            await downImg(src, baidu_img_path)
        })
        await browser.close();
    });

})();
