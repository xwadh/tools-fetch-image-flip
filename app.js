const Jimp = require('jimp');
const axios = require('axios')
const fs = require('fs')
let x
let y
async function resize(url = 'https://images.unsplash.com/photo-1631086459990-06bc4d7ad6cf') {
    // 读取图片
    console.log('+++开始读取+++');
    const image = await Jimp.read(url)
    const mime = image.getMIME()
    const type = mime.substring(mime.indexOf('/')+1,mime.length)
    const buffer = await image.getBufferAsync(mime)
    x = `./x.${type}`
    y = `./y.${type}`
    console.log(x);
    fs.writeFileSync(`./origin.${type}`,buffer)
    await image.flip(true,false);
    // 写文件到本地
    await image.writeAsync(y);
    await image.flip(true,false).flip(false,true)
    await image.writeAsync(x);
    console.log('+++翻转结束+++');
    return type
}

// setTimeout(() => {
//   fs.unlinkSync(x)
//   fs.unlinkSync(y)
// }, 10000);
resize();

module.exports = {
  resize
}