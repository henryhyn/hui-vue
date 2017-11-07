<template lang='pug'>
  aside#hui-sider
    el-switch(v-model='settings.isNotCollapsed' active-text='开' inactive-text='关' @change='collapse')
    nav: el-menu(router unique-opened :default-active='active' :collapse='!settings.isNotCollapsed' background-color='#545c64' text-color='#fff' active-text-color='#ffd04b')
      el-submenu(v-for='menu in menus' :key='menu.index' :index='menu.index')
        template(slot='title')
          span.hui-hspace.glyphicon(:class='`glyphicon-${menu.icon}`')
          span {{menu.name}}
        el-menu-item(v-for='item in menu.children' :key='item.index' :index='item.index')
          span.hui-hspace.glyphicon(:class='`glyphicon-${item.icon}`')
          span {{item.name}}
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import {menus} from '@/utils';

  export default {
    data () {
      return {
        menus,
        active: '/'
      };
    },

    computed: {
      ...mapState(['settings'])
    },

    methods: {
      ...mapActions(['updateSettings']),

      collapse (isNotCollapsed) {
        this.updateSettings({isNotCollapsed});
      }
    },

    watch: {
      '$route': function () {
        this.active = '/' + this.$route.path.split('/')[1];
      }
    },

    created () {
      this.active = '/' + this.$route.path.split('/')[1];
    }
  };
</script>

<style lang='less'>
  aside#hui-sider {
    background-color: #545c64;

    .el-menu {
      border-right: none;

      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }
</style>
