const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

// 定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  // 项目入口. 可以直接用文件夹名称, 默认会找 index.js; 也可以确定是哪个文件名字
  entry: {
    app: SRC_PATH
  },

  // 项目出口. 让 webpack 把处理完成的文件放在哪里
  output: {
    path: DIST_PATH,
    libraryTarget: 'umd',
    filename: '[name].js'
  },

  plugins: [
    // 添加我们的插件会自动生成一个 html 文件
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    })
  ]
};
