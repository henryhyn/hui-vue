<template lang='pug'>
  div
    div 工具栏
    .hui-flex
      ace-editor.hui-marked-input(:content='content' @input='inputHandler')
      .hui-marked-output(v-html='compiledMarkdown')
</template>

<script>
  import _ from 'lodash';
  import marked from 'marked';
  import AceEditor from './AceEditor';

  export default {
    data () {
      return {
        content: ''
      };
    },

    components: {AceEditor},

    computed: {
      compiledMarkdown () {
        return marked(this.content || '');
      }
    },

    methods: {
      inputHandler: _.debounce(function (val) {
        this.content = val;
      }, 300)
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
