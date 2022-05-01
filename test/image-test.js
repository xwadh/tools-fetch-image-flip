var should = require('should');
const fs = require('fs');
const {resize} = require('../app')

describe('图片测试',function(){
  it('第一个测试实例',async function(){
    const type = await resize('https://img0.baidu.com/it/u=4125559692,3819825694&fm=253&fmt=auto&app=138&f=JPEG?w=670&h=500')
    const [origin,x,y] = await Promise.all([
      fs.statSync(`origin1.${type}`),
      fs.statSync(`x.${type}`),
      fs.statSync(`y.${type}`)
    ])
    origin.size.should.be.below(x.size)
    origin.size.should.be.below(y.size)
    await Promise.all([
      fs.unlinkSync(`x.${type}`),
      fs.unlinkSync(`y.${type}`),
      fs.unlinkSync(`origin1.${type}`)
    ])
    return Promise.resolve()
  })
})