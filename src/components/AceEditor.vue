<template lang='pug'>
  div
</template>

<script>
  import ace from 'brace';
  import 'brace/mode/markdown';
  import 'brace/theme/monokai';

  export default {
    data () {
      return {
        _content: '',
        editor: null
      };
    },

    props: {
      options: {
        type: Object,
        default () {
          return {};
        }
      },
      value: String,
      content: String
    },

    mounted () {
      this.initialize();
    },

    beforeDestroy () {
      this.editor = null;
    },

    methods: {
      initialize () {
        if (this.$el) {
          const editor = this.editor = ace.edit(this.$el);
          const options = this.options;
          editor.$blockScrolling = Infinity;
          editor.getSession().setUseSoftTabs(true);
          editor.getSession().setUseWrapMode(true);
          editor.getSession().setMode('ace/mode/markdown');
          editor.setTheme('ace/theme/monokai');
          editor.setOptions(options);
          editor.setHighlightActiveLine(true);
          editor.setReadOnly(this.readOnly);
          editor.clearSelection();

          if (this.value || this.content) {
            editor.setValue(this.value || this.content, 1);
          }

          editor.commands.addCommand({
            name: 'save',
            bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
            exec: () => this.$emit('save')
          });

          editor.on('change', () => {
            this._content = editor.getValue();
            this.$emit('change', this._content);
            this.$emit('input', this._content);
          });
        }
      }
    },

    watch: {
      value (newVal) {
        if (this.editor && newVal !== this._content) {
          this.editor.setValue(newVal || '', 1);
        }
      },

      content (newVal) {
        if (this.editor && newVal !== this._content) {
          this.editor.setValue(newVal || '', 1);
        }
      }
    }
  };
</script>
