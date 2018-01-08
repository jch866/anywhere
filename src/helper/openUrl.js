const {exec} = require('child_process');
module.exports = (url) => {
    switch (process.platform) {
        case 'darwin': //mac平台
            exec(`open ${url}`);
            break;
        case 'win32': //win平台
            exec(`start ${url}`);
            break;
    }
}