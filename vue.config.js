
const path = require('path')
const px2rem = require("postcss-plugin-px2rem");
// t { config } = require('process')
function resolve(dir){
   return path.join(__dirname,dir)
}

module.exports={

    

    devServer: {
        // host: '47.108.193.75',
        // port: 80,
        // open: true,// vue项目启动时自动打开浏览器
        // proxy: {
        //     '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
        //         target: "https://163.lpddr5.cn", //目标地址，一般是指后台服务器地址
        //         changeOrigin: true, //是否跨域
        //         pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
        //             '^/api': "" 
        //         }
        //     }
        // }
    },

    lintOnSave:false,//关闭语法检查
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('assets',resolve('./src/assets'))
        .set('common',resolve('./src/common'))
        .set('components',resolve('./src/components'))
        .set('network',resolve('./src/network'))
        .set('pages',resolve('./src/pages'))

         //配置图片base64编码
        config.module
          .rule('images')
          .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))

    },

    css: {
        loaderOptions: {

            

            less: {
                // 属性值包裹在lessOptions内
                lessOptions: {
                    javascriptEnabled: true,
                    globalVars: {
                        primary: '#000'
                    }
                }
            },
            postcss: {
                plugins: [
                  px2rem({ // postcss-plugin-px2rem 默认配置
                    rootValue: 1, // 默认100
                    unitPrecision: 5,
                    propWhiteList: [],
                    propBlackList: [],
                    exclude: false,
                    selectorBlackList: [],
                    ignoreIdentifier: false,
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0
                  })
                ]
            }



        }
    }
}