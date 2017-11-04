<template lang='pug'>
  .hui-marked-editor
    .toolbar
      el-button(type='primary' @click='screenFull') 全屏
    .editor: .inner(ref='editor')
      ace-editor.input(:value='mdContent' @input='inputHandler' @change='changeHandler' @save='saveHandler')
      .output(v-html='compiledMarkdown')
</template>

<script>
  import _ from 'lodash';
  import screenfull from 'screenfull';
  import marked from 'marked';
  import katex from 'katex';
  import macros from '../utils/macros';
  import AceEditor from './AceEditor';

  import '../style/katex.css';

  const renderer = new marked.Renderer();
  renderer.paragraph = function (text) {
    if (text.indexOf('$$') > -1) {
      return '<p style="text-align: center; font-size: 15px">'
          + katex.renderToString(text.replace(/\$\$/g, '').replace(/<\/?em>/g, '_'), {macros, displayMode: true})
          + '</p>';
    } else if (text.indexOf('$') > -1) {
      return '<p>' + text.replace(/\$([^$]+)\$/g, (all, math) => katex.renderToString(math.replace(/<\/?em>/g, '_'), {macros})) + '</p>';
    } else {
      return '<p>' + text + '</p>';
    }
  };
  marked.setOptions({renderer: renderer, breaks: true, smartypants: true});

  export default {
    data () {
      return {
        mdValue: '',
        mdContent: ''
      };
    },

    props: {
      value: String,
      content: String
    },

    components: {AceEditor},

    computed: {
      compiledMarkdown () {
        const content = marked(this.mdContent || '');
        this.$emit('change', content);
        return content;
      }
    },

    methods: {
      saveHandler () {
        this.$emit('save');
      },

      changeHandler (val) {
        this.mdValue = val;
        this.$emit('input', val);
      },

      screenFull () {
        if (screenfull.enabled) {
          screenfull.toggle(this.$refs.editor);
        }
      },

      inputHandler: _.debounce(function (val) {
        this.mdContent = val;
      }, 500)
    },

    mounted () {
      if (this.value || this.content) {
        this.mdValue = this.value || this.content;
        this.mdContent = this.value || this.content;
      }
    },

    watch: {
      value (newVal) {
        if (newVal !== this.mdValue) {
          this.mdContent = newVal || '';
        }
      },

      content (newVal) {
        if (newVal !== this.mdValue) {
          this.mdContent = newVal || '';
        }
      }
    }
  };
</script>

<style lang='less'>
  .hui-marked-editor {
    display: flex;
    flex-direction: column;

    .toolbar {
      margin-bottom: 8px;
    }

    .editor {
      flex: 1;
      position: relative;

      .inner {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;

        .input {
          flex: 1;
        }

        .output {
          flex: 1;
          overflow: scroll;
          border: 1px solid #e6e6e6;
          padding: 0 16px;
        }
      }
    }
  }
</style>
