/**
 * Created by jch866 on 2018/1/9.
 */
const {should,expect,assert}=require('chai');

const {add, mul, reduce,cover} = require('../src/math');

describe('#math', () => {
    describe('add', () => {
        it('should return 5 when 2 + 3', () => {
            expect(add(2, 3)).to.equal(5)
        })
        it('should return 5 when 2 + 3', () => {
            expect(add(2, 3)).to.equal(5)
        })
        it('should return -5 when -2 + -3', () => {
            expect(add(-2, -3)).to.equal(-5)
        })
    });
    describe('mul',()=>{
        it('should return 6 when 2*3',()=>{
            expect(mul(2,3)).to.equal(6)
        })
    });
    describe('reduce',()=>{
        it('should return 6 when 7-1',()=>{
            expect(reduce(7,1)).to.equal(6)
        })
    });
    describe('cover',()=>{
        it('should return 1 when a=3 b=2',()=>{
            expect(cover(3,2)).to.equal(1)
        })
        it('should return 0 when a = b',()=>{
            expect(cover(3,3)).to.equal(0)
        })
        it('should return 3 when a<b',()=>{
            expect(cover(2,3),).to.equal(3)
        })
    })
})