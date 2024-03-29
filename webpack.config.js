const path = require('path');

// 定义源码和构建结果的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const TEM_PATH = path.resolve(ROOT_PATH, 'templates');

const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 项目入口. 可以直接用文件夹名称, 默认会找 index.js; 也可以确定是哪个文件名字
  entry: {
    index: '@/index.js',
    admin: '@/main.js'
  },

  // 项目出口. 让 webpack 把处理完成的文件放在哪里
  output: {
    clean: true,
    path: DIST_PATH,
    libraryTarget: 'umd',
    filename: '[name].js'
  },

  // 模块. 要用什么不同的模块来处理各种类型的文件
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /node_modules/,
      use: {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      type: 'asset/inline'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      type: 'asset/inline'
    }, {
      test: /\.(md|txt|snippets)$/,
      type: 'asset/source'
    }]
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': SRC_PATH,
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  devtool: 'eval-source-map',

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    // 添加我们的插件会自动生成一个 html 文件
    new HtmlWebpackPlugin({
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['admin'],
      title: '数据中后台'
    })
  ]
};
