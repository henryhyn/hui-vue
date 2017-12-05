<template lang='pug'>
  #app
    sider
    #main-body
      header
        ul#headbar.list-inline.hui-flex-box
          li: el-tooltip(content='菜单折叠'): hamburger.large.strong(@toggle='toggleCollapse' :active='settings.isCollapsed')
          li: a.link-muted.large.strong(href='/') {{ projectName }}
          li.hui-flex-fill
          li: router-link(v-for='item in settings.visitedViews' :key='item.name' :to='item.fullPath'): el-tag.hui-hspace(:type="$route.fullPath === item.fullPath ? 'success' : 'default'") {{item.name}}
          li(v-for='item in links' :key='item.href'): a.link-muted(:href='item.href' target='blank') {{item.name}}
          li: el-dropdown
            div
              span.hspace {{ currentUser.userName }}
              span.glyphicon.glyphicon-menu-down
            el-dropdown-menu(slot='dropdown')
              a.link-muted(href='/logout'): el-dropdown-item 登出
      article: transition(name='el-fade-in-linear' mode='out-in')
        router-view
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { config } from '@/utils';
  import Hamburger from '@/components/Hamburger';
  import Sider from './Sider';

  export default {
    data () {
      return {
        projectName: config.projectName,
        links: config.links
      };
    },

    computed: mapState(['currentUser', 'config', 'settings']),

    components: { Sider, Hamburger },

    methods: {
      ...mapMutations(['updateSettings']),

      toggleCollapse () {
        this.updateSettings({ isCollapsed: !this.settings.isCollapsed });
      }
    }
  };
</script>

<style lang='less'>
  #app {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    > #main-body {
      flex: 1;
      display: flex;
      flex-direction: column;

      > header {
        background-color: #eef1f6;
      }

      > article {
        flex: 1;
        overflow-y: scroll;
        padding: 16px;
        position: relative;
      }
    }
  }

  #headbar {
    height: 60px;
    align-items: center;

    li {
      margin-right: 16px;

      &:first-child {
        margin-left: 16px;
      }
    }
  }
</style>
