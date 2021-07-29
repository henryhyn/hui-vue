<template lang='pug'>
  el-container#app
    sider
    el-container
      el-header#header
        ul#headbar.list-inline
          li: hamburger.large.strong(@toggle='toggleCollapse' :active='settings.isCollapsed')
          li: router-link.link-muted.large.strong(to='/') {{ projectName }}
          li.fill
          li: router-link(v-for='item in settings.visitedViews' :key='item.name' :to='item.fullPath'): el-tag.hui-hspace(:type="$route.fullPath === item.fullPath ? 'success' : 'default'") {{item.name}}
          li(v-for='item in links' :key='item.href'): a.link-muted(:href='item.href' target='blank') {{item.name}}
          li: el-dropdown
            span.el-dropdown-link {{ currentUser.userName }}<i class='el-icon-arrow-down el-icon--right'/>
            el-dropdown-menu(slot='dropdown')
              a.link-muted(href='/logout'): el-dropdown-item 登出
      el-main#main-body: transition(name='el-fade-in-linear' mode='out-in')
        router-view
      el-backtop(target='#main-body'): i.el-icon-caret-top
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { config } from '@/utils';
  import Hamburger from '@/components/Hamburger';
  import Sider from './Sider';

  export default {
    data() {
      return {
        projectName: config.projectName,
        links: config.links
      };
    },

    computed: mapState(['currentUser', 'config', 'settings']),

    components: { Sider, Hamburger },

    methods: {
      ...mapMutations(['updateSettings']),

      toggleCollapse() {
        this.updateSettings({ isCollapsed: !this.settings.isCollapsed });
      }
    }
  };
</script>

<style lang='less'>
  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    #header {
      background-color: #eef1f6;
    }

    #main-body {
      position: relative;
    }
  }

  #headbar {
    height: 60px;
    display: flex;
    align-items: center;

    .fill {
      flex: 1;
    }
  }
</style>
