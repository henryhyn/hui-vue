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
        const clipboard = this.clipboard = new Clipboard('.copy-code-btn', {
          text: function (trigger) {
            return unescape(trigger.getAttribute('data-clipboard-text'));
          }
        });
        clipboard.on('success', e => {
          e.trigger.innerHTML = 'Copied!';
          e.clearSelection();
          setTimeout(() => {
            e.trigger.innerHTML = 'copy';
          }, 1000);
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
