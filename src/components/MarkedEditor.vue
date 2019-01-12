<template lang='pug'>
  .hui-marked-editor(:style='styleObject')
    .toolbar
      el-tooltip(v-for='item in toolbar' :key='item.name' :content='item.win')
        el-button(@click='execute(item.action)') {{item.name}}
      clipboard(:value='content')
    .editor: .inner(ref='editor')
      ace-editor.input(:value='content' @input='inputHandler' @change='changeHandler' @init='initHandler')
      .output.post-body(v-html='compiledMarkdown')
</template>

<script>
  import _ from 'lodash';
  import Marked from '../utils/marked';
  import AceEditor from './AceEditor';
  import Clipboard from './Clipboard';
  import { Hex } from '../index';
  import functions from './functions';

  const marked = new Marked();

  export default {
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      value: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        editor: null,
        selection: null,
        session: null,
        toolbar: functions.toolbar || [],
        styleObject: {
          width: Hex.px(this.width),
          height: Hex.px(this.height)
        },
        _content: '',
        content: ''
      };
    },

    mixins: [{ methods: functions.methods }],

    components: { AceEditor, Clipboard },

    computed: {
      compiledMarkdown () {
        const html = marked.convert(this.content || '');
        this.$emit('change', html);
        return html;
      }
    },

    methods: {
      initHandler (editor) {
        this.editor = editor;
        this.selection = editor.getSelection();
        this.session = editor.getSession();
      },

      execute (action) {
        this[action]();
      },

      editorKeyBindings () {
        this.toolbar.forEach(({ name, win, mac, action }) => {
          this.editor.commands.addCommand({
            name,
            bindKey: { win, mac },
            exec: this[action]
          });
        });
      },

      inputHandler (val) {
        this._content = val;
        this.$emit('input', val);
      },

      changeHandler: _.debounce(function (val) {
        this.content = val;
      }, 500)
    },

    mounted () {
      this.content = this.value || '';
      this.editorKeyBindings();
    },

    watch: {
      value (newVal) {
        if (newVal !== this._content) {
          this.content = newVal || '';
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
          width: 620px;
          overflow: scroll;
          border: 1px solid #e6e6e6;
          padding: 40px;
          background-color: white;
          font-size: 16px;
          line-height: 1.6;

          img {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      }
    }
  }
</style>
