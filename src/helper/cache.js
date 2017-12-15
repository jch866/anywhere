/**
 * Created by jch866 on 2017/12/15.
 */
const {cache}=require('../config/defaultConfig');

function refreshRes(stats,res) {
    let {lastModified,etag,expires,cacheControl,maxage}= cache;
    if(expires){
        res.setHeader('Expires',
            new Date(Date.now()+maxage*1000).toUTCString()
        )
    }
    if(cacheControl){
        res.setHeader('Cache-Control',`public,max-age =  ${maxage}`)
    }
    if(lastModified){
        res.setHeader('Last-Modified',stats.mtime.toUTCString())
    }
    if(etag){
        res.setHeader('ETag',`${stats.size}-${stats.mtime}`)
    }
}

module.exports = function isRefresh(stats,req,res){
    refreshRes(stats,res);
    let lastmodified = req.headers['if-modified-since'];//从浏览器中读最后修改时间
    let etag  = req.headers['if-none-match'];
    console.log(req.headers)

    if(!lastmodified  && !etag){
        return false
    }

    if(lastmodified && lastmodified !== res.getHeader('Last-Modified')){
        return false;
    }
    if(etag && etag !== res.getHeader('ETag')){
        return false
    }
    return true;
}
