[![Build Status](https://travis-ci.org/jch866/anywhere.svg?branch=master)](https://travis-ci.org/jch866/anywhere)
[![codecov](https://codecov.io/gh/jch866/anywhere/branch/master/graph/badge.svg)](https://codecov.io/gh/jch866/anywhere)
### anywhere
static resource
Running static file server anywhere. 将当前目录变成一个静态文件服务器的根目录。

#### curl 使用方法
curl -I  http://127.0.0.1:8256/app.js   header
curl -i  http://127.0.0.1:8256/app.js   header and content
curl -r 2-300 -i http://127.0.0.1:8256/app.js    specify range

## 安装
```
npm insatll -g anywhere_jc
```
## 使用方法
```
anywhere  # 把当前文件夹作为静态资源服务器
anywhere -p 8080 # 设置端口
anywhere -h localhost # 设置主机
anywhere -d /usr  # 设置根目录为 /usr
```
