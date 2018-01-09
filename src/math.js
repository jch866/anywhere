/**
 * Created by jch866 on 2018/1/9.
 */
/**
 * Created by jch866 on 2018/1/9.
 */
function min(a,b){
    const c =3;
    return (b-a)*c;
}
module.exports = {
    add: (...args) => {
        return args.reduce((prev, curr) => {
            return prev + curr;
        })
    },
    mul: (...args) => {
        return args.reduce((prev, curr) => {
            return prev * curr
        })
    },
    reduce: (...args) => {
        return args.reduce((prev, curr) => {
            return prev - curr;
        })
    },
    cover: (a, b) => {
        if(a>b){
            return a-b
        }else if (a==b){
            return 0
        }else{
            return min(a,b)
        }
    }
}