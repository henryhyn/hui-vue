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
        content: '',
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
      value: String
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

          editor.setValue(this.value || '', 1);

          editor.commands.addCommand({
            name: 'save',
            bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
            exec: () => this.$emit('save')
          });

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
      value (newVal) {
        if (this.editor && newVal !== this.content) {
          this.editor.setValue(newVal || '', 1);
        }
      }
    }
  };
</script>
