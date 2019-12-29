<template lang='pug'>
  el-button(:data-clipboard-text='value' icon='el-icon-tickets' :type='type' v-if='!!label') {{label}}
  el-button(:data-clipboard-text='value' icon='el-icon-tickets' :type='type' v-else)
</template>

<script>
  import Clipboard from 'clipboard';

  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      },
      label: {
        type: String,
        default: null
      },
      value: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        clipboard: null
      };
    },

    mounted() {
      this.$nextTick(this.initialize);
    },

    beforeDestroy() {
      this.clipboard.destroy();
      this.clipboard = null;
    },

    methods: {
      initialize() {
        const clipboard = this.clipboard = new Clipboard(this.$el);
        clipboard.on('success', e => {
          this.$message.success('复制成功!');
          e.clearSelection();
        });
      }
    }
  };
</script>
