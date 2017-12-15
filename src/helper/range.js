/**
 * Created by jch866 on 2017/12/15.
 */

/**
Accept-Ranges:bytes    响应
Content-Range:bytes start-end/total
Range:bytes = [start]-[end]  请求
 **/
module.exports = (totalSize,req,res)=>{
    let range = req.headers['range'];
    if(!range){
        return {code:200}
    }
    let sizes = range.match(/bytes=(\d*)-(\d*)/);
    let end = sizes[2] || totalSize-1;
    let start = sizes[1] || totalSize - end;
    if(start>end||start<0 || end>totalSize){
       return {code:200}
    }
    res.setHeader('Accept-Ranges','bytes');
    res.setHeader('Content-range',`bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-length',end-start)

    return {
        code:206,
        start:parseInt(start),
        end:parseInt(end)
    }
}