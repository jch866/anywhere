/**
 * Created by jch866 on 2017/12/15.
 */
//利用yargs 处理成cli 命令行 配置
const Server = require('./app');
const yargs = require('yargs');
const argv = yargs.usage('anywhere [option]')   //yargs配置
    .option('p',{
        alias:'port',
        describe:'端口号',
        default:9527
    }).option('h',{
        alias:'hostname',
        describe:'host',
        default:'127.0.0.1'
    }).option('d',{
        alias:'root',
        describe:'root path',
        default:process.cwd()
    }).version().alias('v','version').help().argv;


const  appServer = new Server(argv);
appServer.start()