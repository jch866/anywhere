/**
 * Created by jch866 on 2017/12/13.
 */
module.exports={
    root:process.cwd(),
    host:'127.0.0.1',
    port:8256,
    compress:/\.(js|png|html|css)$/,
    cache:{
        maxage:600,
        expires:true,
        etag:true,
        cacheControl:true,
        lastModified:true
    }
}