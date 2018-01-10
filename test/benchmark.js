const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const {num1,num2} = require('../src/math')
//()=>{}
console.log(num1.toString())
console.log(num2.toString())
suite.add('parseInt',()=>{
    num1('1234')
}).add('number',()=>{
    num2('1234')
}).on('cycle', function (event) {
    console.log(String(event.target));
})
    .on('complete', function () { //因为要用this所以这里不能用箭头函数了
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    }).run({'async': true})

// add tests
// suite.add('RegExp#test', function () {
//     /o/.test('Hello World!');
//     })
//     .add('String#indexOf', function () {
//         'Hello World!'.indexOf('o') > -1;
//     })
//     .add('String#match', function () {
//         !!'Hello World!'.match(/o/);
//     })
//     // add listeners
//     .on('cycle', function (event) {
//         console.log(String(event.target));
//     })
//     .on('complete', function () {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     // run async
//     .run({'async': true});