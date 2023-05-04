<template lang='pug'>
  div(v-html='compiledMarkdown')
</template>

<script>
  import Marked from '../utils/marked_v2';
  import Clipboard from 'clipboard';

  export default {
    props: {
      mdContent: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        clipboard: null,
        marked: null
      };
    },

    computed: {
      compiledMarkdown() {
        if (!this.marked) {
          return '';
        }
        return this.marked.convert(this.mdContent || '');
      }
    },

    methods: {
      initialize() {
        this.marked = new Marked();
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
