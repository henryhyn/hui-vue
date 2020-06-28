<template lang='pug'>
  el-popover(width='500' :disabled='!view.editable')
    el-input(v-model='src' type='textarea' :rows=5 @input='onEditorChanged')
    span(v-html='html' slot='reference')
</template>

<script>
  import katex from 'katex';

  export default {
    data() {
      return {
        timeout: 0,
        html: ''
      };
    },

    props: ['node', 'updateAttrs', 'view'],

    computed: {
      src: {
        get() {
          return this.node.attrs.src;
        },
        set(src) {
          this.updateAttrs({
            src
          });
        }
      }
    },

    methods: {
      onEditorChanged() {
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(this.renderKatex, 300);
      },

      renderKatex() {
        try {
          this.html = katex.renderToString(this.src || 'E=mc^2');
        } catch (e) {
          this.html = e.message;
        }
      }
    },

    mounted() {
      this.$nextTick(this.renderKatex);
    }
  };
</script>
