<template lang='pug'>
  #app
    sider
    #main-body
      header.hui-flex-box
        #logo: img(src='../../assets/logo.png')
        a#project-name.link-muted.large.strong(href='/') {{ projectName }}
        .hui-flex-fill
        #user-name 当前用户
        a#logout.link-muted(href='/logout') 登出
      article: transition(name='el-fade-in-linear' mode='out-in')
        router-view
</template>

<script>
  import { mapState } from 'vuex';
  import { config } from '@/utils';
  import Sider from './Sider';

  export default {
    data () {
      return {
        projectName: config.projectName
      };
    },

    computed: mapState(['config']),

    components: { Sider }
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
      }
    }
  }

  header {
    > #logo {
      height: 60px;
      display: inline-block;
      margin-right: 8px;
      > img {
        height: 60px;
      }
    }

    > #project-name, > #user-name, > #logout {
      margin-left: 16px;
      margin-right: 16px;
      height: 60px;
      line-height: 60px;
      display: inline-block;
    }
  }
</style>
