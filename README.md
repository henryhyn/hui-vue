# HUI VUE [![Build Status](https://travis-ci.org/henryhyn/hui-vue.svg?branch=master)](https://travis-ci.org/henryhyn/hui-vue)

基于 Vue, Element 开发一些中后台高阶组件, 以及一些有用的工具方法

## 安装

```
npm install hui-vue --save
```

## 开发

```
npm start
```

## 发布

```
npm run build
npm version patch
npm publish
```

## 演示

```
git checkout gh-pages
git merge master
npm run build
cp -fa dist/admin.* .
git commit -a -m 'update'
git push
```
