<template lang='pug'>
  el-button(:data-clipboard-text='value' icon='el-icon-tickets') {{label}}
</template>

<script>
  import Clipboard from 'clipboard';

  export default {
    props: {
      label: {
        type: String,
        default: '复制'
      },
      value: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        clipboard: null
      };
    },

    mounted () {
      this.$nextTick(this.initialize);
    },

    beforeDestroy () {
      this.clipboard.destroy();
      this.clipboard = null;
    },

    methods: {
      initialize () {
        const clipboard = this.clipboard = new Clipboard(this.$el);
        clipboard.on('success', e => {
          this.$message.success('复制成功!');
          e.clearSelection();
        });
      }
    }
  };
</script>