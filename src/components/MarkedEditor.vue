<template lang='pug'>
  div
    div 工具栏
    .hui-flex
      ace-editor.hui-marked-input(:value='mdContent' @input='inputHandler' @change='changeHandler' @save='saveHandler')
      .hui-marked-output(v-html='compiledMarkdown')
</template>

<script>
  import _ from 'lodash';
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
        return marked(this.mdContent || '');
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
  .hui-flex {
    display: flex;
  }

  .hui-marked-input, .hui-marked-output {
    flex: 1;
  }
</style>
