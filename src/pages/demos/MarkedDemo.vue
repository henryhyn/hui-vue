<template lang='pug'>
  marked-editor(stretch v-model='MarkedSource')
</template>

<script>
  import MarkedEditor from '@/components/MarkedEditor';
  import MarkedSource from '@/../test/utils/test.md';
  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        clipboard: null,
        MarkedSource
      };
    },

    components: { MarkedEditor },

    methods: {
      initialize() {
        const clipboard = this.clipboard = new Clipboard('.copy-code-btn');
        clipboard.on('success', e => {
          this.$message.success('复制成功!');
          e.clearSelection();
        });
      }
    },

    beforeDestroy() {
      this.clipboard.destroy();
      this.clipboard = null;
    },

    mounted() {
      this.$nextTick(this.initialize);
    }
  };
</script>
