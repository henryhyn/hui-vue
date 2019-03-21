<template lang='pug'>
  section
    h2 获取帮助

    p 本前端使用 Vue 前端框架开发, 基于饿了么开源的 Element UI 完成的. 主要技术栈: Vue + Vue-Router + Vuex + Element UI. 欢迎感兴趣的童鞋一起来学习!

    h3 基础
    ul.list-inline
      li: a(href='https://cn.vuejs.org' target='_blank') Core Docs
      li: a(href='https://forum.vuejs.org' target='_blank') Forum
      li: a(href='https://gitter.im/vuejs/vue' target='_blank') Gitter Chat
      li: a(href='https://twitter.com/vuejs' target='_blank') Twitter
      li: a(href='http://vuejs-templates.github.io/webpack/' target='_blank') Docs for This Template

    h3 生态
    ul.list-inline
      li: a(href='http://router.vuejs.org' target='_blank') vue-router
      li: a(href='https://vuex.vuejs.org/zh-cn' target='_blank') vuex
      li: a(href='http://vue-loader.vuejs.org' target='_blank') vue-loader
      li: a(href='https://github.com/vuejs/awesome-vue' target='_blank') awesome-vue
      li: a(href='http://element.eleme.io' target='_blank') Element UI
      li: a(href='http://www.muse-ui.org' target='_blank') Muse UI
      li: a(href='https://www.vue-js.com' target='_blank') Vue 中文社区

    h3 基础知识
    h4 文本插值
    p 欢迎 {{ msg }}!
    p 也可以这样绑定 <span v-text='msg'/>

    h4 绑定 DOM 元素属性
    p(v-bind:title='message') 鼠标悬停几秒钟查看此处动态绑定的提示信息！
    p(:title='message') 鼠标悬停几秒钟查看此处动态绑定的提示信息！

    h4 条件
    p(v-if='seen') 现在你看到我了
    p(v-show='!seen') 现在你看到我了

    h4 循环
    ol: li(v-for='todo in todos') {{ todo.text }}

    h4 处理用户输入
    input(v-model='msg')
    button(v-on:click='reverseMessage') 逆转消息
    button(@click='reverseMessage') 逆转消息

    h4 组件化应用构建
    card
    ol: todo-item(:todo='item' v-for='item in todos' :key='item.text')

    h3 Button 按钮
    h4 基础用法
    el-button 默认按钮
    el-button(type='primary') 主要按钮
    el-button(type='text') 文字按钮

    h4 禁用状态
    el-button(:disabled='true') 默认按钮
    el-button(:disabled='true' type='primary') 主要按钮
    el-button(:disabled='true' type='text') 文字按钮

    h4 有颜色倾向
    el-button(type='success') 成功按钮
    el-button(type='warning') 警告按钮
    el-button(type='danger') 危险按钮
    el-button(type='info') 信息按钮

    h4 hover 显示颜色
    el-button(:plain='true' type='success') 成功按钮
    el-button(:plain='true' type='warning') 警告按钮
    el-button(:plain='true' type='danger') 危险按钮
    el-button(:plain='true' type='info') 信息按钮

    h4 图标按钮
    el-button(type='primary' icon='el-icon-edit')
    el-button(type='primary' icon='el-icon-share')
    el-button(type='primary' icon='el-icon-delete')
    el-button(type='primary' icon='el-icon-search') 搜索

    h4 按钮组
    el-button-group
      el-button(type='primary' icon='el-icon-arrow-left') 上一页
      el-button(type='primary') 上一页 <i class="el-icon-arrow-right el-icon--right"></i>

    el-button-group
      el-button(type='primary' icon='el-icon-edit')
      el-button(type='primary' icon='el-icon-share')
      el-button(type='primary' icon='el-icon-delete')
    p 基于 Vue 全家桶的通用前端
    div {{ count }}
    el-button(@click='increment') +
    el-button(@click='decrement') -
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Card from '@/components/Card';
  import TodoItem from '@/components/TodoItem';

  export default {
    data() {
      return {
        list: [],
        seen: true,
        todos: [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' }
        ],
        msg: 'Henry',
        message: '页面加载于 ' + new Date()
      };
    },

    components: { Card, TodoItem },

    computed: mapState(['count']),

    methods: {
      ...mapMutations(['increment', 'decrement']),
      reverseMessage() {
        this.msg = this.msg.split('').reverse().join('');
      }
    }
  };
</script>
