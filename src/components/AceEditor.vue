<template lang='pug'>
  div
</template>

<script>
  import ace from 'ace-builds/src-noconflict/ace';
  import 'ace-builds/src-noconflict/mode-markdown';
  import 'ace-builds/src-noconflict/mode-mysql';
  import 'ace-builds/src-noconflict/mode-json';
  import 'ace-builds/src-noconflict/theme-monokai';
  import 'ace-builds/src-noconflict/ext-searchbox';
  import 'ace-builds/src-noconflict/ext-settings_menu';
  import 'ace-builds/src-noconflict/ext-prompt';

  export default {
    data() {
      return {
        content: '',
        editor: null
      };
    },

    props: {
      options: {
        type: Object,
        default() {
          return {};
        }
      },
      mode: {
        type: String,
        default: 'markdown'
      },
      value: String
    },

    mounted() {
      this.$nextTick(this.initialize);
    },

    beforeDestroy() {
      if (this.editor) {
        this.editor.destroy();
      }
    },

    methods: {
      initialize() {
        if (this.$el) {
          const editor = this.editor = ace.edit(this.$el);
          const options = this.options;
          editor.$blockScrolling = Infinity;
          editor.getSession().setTabSize(2);
          editor.getSession().setUseSoftTabs(true);
          editor.getSession().setUseWrapMode(true);
          editor.getSession().setMode(`ace/mode/${this.mode}`);
          editor.setTheme('ace/theme/monokai');
          editor.setOptions(options);
          editor.setHighlightActiveLine(true);
          editor.setShowPrintMargin(false);
          editor.setReadOnly(this.readOnly);
          editor.clearSelection();

          editor.setValue(this.value || '', 1);

          editor.on('change', () => {
            this.content = editor.getValue();
            this.$emit('change', this.content);
            this.$emit('input', this.content);
          });

          this.$emit('init', editor);
        }
      }
    },

    watch: {
      value(newVal) {
        if (this.editor && newVal !== this.content) {
          this.editor.setValue(newVal || '', 1);
        }
      }
    }
  };
</script>
