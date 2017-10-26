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
  import AceEditor from './AceEditor';

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
      }, 300)
    },

    mounted () {
      if (this.value || this.content) {
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
