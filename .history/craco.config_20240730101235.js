//配置路径别名
const path = require('path')
module.exports = {
    //webpack配置
    webpack: {
        //别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}