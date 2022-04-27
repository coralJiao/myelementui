'use strict'
// 引入node path 中间件 可以获取到 path 路径的一些信息
const path = require('path')
// 引入utils工具模块 utils主要用来处理css-loader和vue-style-loader的
const utils = require('./utils')
// 引入config下面的index文件 主要是配置一些开发环境和生产环境的配置
const config = require('../config')
// 用来解决各种css 文件 sass less stulys 等
const vueLoaderConfig = require('./vue-loader.conf')

// 定义了一个路径函数 返回当前的目录的平行目录下的dir因为有'..'也就是获取绝对路径，方便对import时引入地址的方便填写
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

//eslint 的检测规则
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  // enforce执行的意思 有两个值 pre post
  // pre是在其他规则执行之前执行 post是在其他规则执行之后执行
  enforce: 'pre',
  // 进行检测的文件目录包括哪些 调用了路径函数
  include: [resolve('src'), resolve('test')],
  options: {
    // 使用第三方的插件进行eslint 检测
    formatter: require('eslint-friendly-formatter'),
    // 是否输出eslint报错信息
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// webpack的配置，可以理解成是开发环境和正式环境的一些公共配置
module.exports = {
  context: path.resolve(__dirname, '../'),
  name: '哈哈',
  entry: {
    app: './src/main.js'
  },
  output: {
    // 项目buid的出口文件的目录地址,这里指的是(../dist文件目录) 引入的是config.build 下面的配置
    path: config.build.assetsRoot,
    // 文件的名字
    filename: '[name].js',
    // 输出解析文件的目录，url 相对于 HTML 页面(生成的html文件中，css和js等静态文件的url前缀)
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    // 指定哪些文件在引用时可以省略后缀名
    extensions: ['.js', '.vue', '.json'],
    // 别名，在引用文件时 使用别名代理真实目录 后面再在目录时以别名代替
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    // 转换解析规则
    // 1.test是用来解析所有此后缀名的文件，
    // 2.loader我们用什么npm什么形式的loader去解析
    // 3.include是代表我们解析的文件只包含那些东西
    // 4.options解析文件参数设置 具体看下面的解释
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // 对vue的css进行解析
        options: vueLoaderConfig
      },
      {
        // 对js文件使用babel-loader转码,该插件是用来解析es6等代码
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        // 对图片使用url-loader解析 这个插件的作用是将一个足够小的文件生成一个64位的DataURL
        // 当limit小于10000进行将图片生成base64
        // name 指的是引入的utils里面的一个方法 将name ,7位哈希 .ext 代表后缀名
        // 传入方法 返回结果是 /static/img/[name].[hash:7].[ext]
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 对一些音频文件进行解析
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        // 对字体文件进行解析
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // 是否 polyfill 或 mock
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    // 源包含它（虽然仅在本地使用)
    setImmediate: false,
    // 预防webpack从注入模拟节点到node原生模块
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client 这对客户端没有影响
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
}
}
