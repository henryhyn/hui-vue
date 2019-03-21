<template lang='pug'>
  aside
    nav: el-menu(router unique-opened :default-active='active' :collapse='settings.isCollapsed' background-color='#545c64' text-color='#fff' active-text-color='#ffd04b')
      el-submenu(v-for='menu in menus' :key='menu.index' :index='menu.index')
        template(slot='title')
          i(:class='`glyphicon glyphicon-${menu.icon} hui-hspace`')
          span {{menu.name}}
        el-menu-item(v-for='item in menu.children' :key='item.index' :index='item.index')
          template(slot='title')
            i(:class='`glyphicon glyphicon-${item.icon} hui-hspace`')
            span {{item.name}}
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { menus } from '@/utils';

  export default {
    data() {
      return {
        menus,
        active: '/'
      };
    },

    computed: mapState(['settings']),

    methods: {
      ...mapMutations(['addVisitedViews']),

      initialize() {
        this.active = '/' + this.$route.path.split('/')[1];
        const { fullPath, name } = this.$route;
        this.addVisitedViews({ fullPath, name });
      }
    },

    watch: {
      '$route': function () {
        this.initialize();
      }
    },

    mounted() {
      this.$nextTick(this.initialize);
    }
  };
</script>

<style lang='less' scoped>
  aside {
    background-color: #545c64;
  }

  .el-menu {
    border-right: none;

    &:not(.el-menu--collapse) {
      width: 200px;
    }

    i.glyphicon {
      font-size: 16px;
    }
  }
</style>
