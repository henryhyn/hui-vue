<template lang='pug'>
  .hui-marked-editor(:style='styleObject')
    ul.list-inline
      li: slot(name='prepend')
      li(v-for='item in toolbar' :key='item.name'): el-tooltip(:content='item.win')
        el-button(@click='execute(item.action)') {{item.name}}
      li: clipboard(:value='content')
      li: el-autocomplete(v-model='wxStyleKey' placeholder='导出富文本' :fetch-suggestions='querySearch' clearable)
        el-button(slot='append' icon='el-icon-document-copy' @click='exportHandler')
    .editor: .inner(ref='editor')
      ace-editor.input(:value='content' @input='inputHandler' @change='changeHandler' @init='initHandler')
      .output.post-body(v-html='compiledMarkdown' ref='output')
    image-upload(v-model='imageUploadVisible' :url='image.upload.url' :field='image.upload.fieldName' :params='image.upload.params' @crop-upload-success='uploadSuccess')
</template>

<script>
  import _ from 'lodash';
  import juice from 'juice';
  import Marked from '../utils/marked';
  import AceEditor from './AceEditor';
  import ImageUpload from './ImageUpload';
  import Clipboard from './Clipboard';
  import { Hex } from '../index';
  import functions from './functions';
  import { normal, wxStyles } from './styled';

  export default {
    props: {
      image: {
        type: Object,
        default() {
          return {
            upload: {
              url: '',
              fieldName: 'file',
              params: {}
            },
            uploadHandler(res) {
              return res.data;
            }
          };
        }
      },
      stretch: {
        type: Boolean,
        default: false
      },
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

    data() {
      return {
        wxStyleKey: null,
        wxStyleMap: Hex.toMap(wxStyles, 'value', 'wxStyle'),
        imageUploadVisible: false,
        marked: null,
        editor: null,
        selection: null,
        session: null,
        toolbar: functions.toolbar || [],
        innerVal: '',
        content: ''
      };
    },

    mixins: [{ methods: functions.methods }],

    components: { AceEditor, ImageUpload, Clipboard },

    computed: {
      styleObject() {
        if (this.stretch) {
          return {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          };
        } else {
          return {
            width: Hex.px(this.width),
            height: Hex.px(this.height)
          };
        }
      },

      compiledMarkdown() {
        if (!this.marked) {
          return '';
        }
        // this.marked.options.wxFmt = !!this.wxStyleKey;
        let html = this.marked.convert(this.content || '');
        if (this.wxStyleKey) {
          const custom = this.wxStyleMap[this.wxStyleKey];
          html = juice.inlineContent(html, normal + custom, {
            inlinePseudoElements: true
          });
        }
        this.$emit('change', html);
        return html;
      }
    },

    methods: {
      initHandler(editor) {
        this.editor = editor;
        this.selection = editor.getSelection();
        this.session = editor.getSession();
      },

      execute(action) {
        this[action]();
      },

      uploadSuccess(res) {
        const url = this.image.uploadHandler(res);
        this.editor.insert(`![](${url})\n`);
        this.editor.focus();
      },

      editorKeyBindings() {
        this.toolbar.forEach(({ name, win, mac, action }) => {
          this.editor.commands.addCommand({
            name,
            bindKey: { win, mac },
            exec: this[action]
          });
        });
      },

      querySearch(query, cb) {
        cb(wxStyles);
      },

      exportHandler() {
        const clipboardDiv = this.$refs.output;
        clipboardDiv.focus();
        window.getSelection().removeAllRanges();
        const range = document.createRange();
        range.setStartBefore(clipboardDiv.firstChild);
        range.setEndAfter(clipboardDiv.lastChild);
        window.getSelection().addRange(range);
        if (document.execCommand('copy')) {
          this.$message({
            message: '导出成功!',
            type: 'success'
          });
        }
        window.getSelection().removeAllRanges();
      },

      inputHandler(val) {
        this.innerVal = val;
        this.$emit('input', val);
      },

      changeHandler: _.debounce(function (val) {
        this.content = val;
      }, 500)
    },

    mounted() {
      this.$nextTick(() => {
        this.marked = new Marked();
        this.content = this.value || '';
        this.editorKeyBindings();
      });
    },

    watch: {
      value(newVal) {
        if (newVal !== this.innerVal) {
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
        }
      }
    }
  }
</style>
