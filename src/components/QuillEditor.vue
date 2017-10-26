<template lang='pug'>
  div
    div(ref='editor' :style="{height: '500px'}")
    image-upload(v-model='imageUploadVisible' :url='image.upload.url' :field='image.upload.fieldName' :params='image.upload.params' @crop-upload-success='uploadSuccess')
</template>

<script>
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  import ImageUpload from './ImageUpload';

  import '../style/katex.css';
  window.katex = require('katex');

  const options = {
    modules: {
      formula: true,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'direction': 'rtl'}],
        [{'size': ['small', false, 'large', 'huge']}],
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],
        [{'font': []}],
        [{'align': []}],
        ['clean'],
        ['link', 'image', 'video', 'formula']
      ]
    },
    placeholder: '请输入内容...',
    theme: 'snow'
  };

  export default {
    data () {
      return {
        imageUploadVisible: false,
        _content: '',
        quill: null
      };
    },

    props: {
      image: Object,
      value: String,
      content: String
    },

    components: {ImageUpload},

    mounted: function () {
      this.initialize();
    },

    beforeDestroy: function () {
      this.quill = null;
    },

    methods: {
      initialize () {
        if (this.$el) {
          const quill = this.quill = new Quill(this.$refs.editor, options);

          if (this.value || this.content) {
            quill.pasteHTML(this.value || this.content);
          }

          quill.getModule('toolbar').addHandler('image', state => {
            if (state) {
              this.imageUploadVisible = true;
            }
          });

          quill.on('text-change', () => {
            const html = this.$refs.editor.children[0].innerHTML;
            this._content = html === '<p><br></p>' ? '' : html;
            this.$emit('input', this._content);
          });
        }
      },

      uploadSuccess (res) {
        const url = this.image.uploadHandler(res);
        const quill = this.quill;
        quill.focus();
        quill.insertEmbed(quill.getSelection().index, 'image', url);
      }
    },

    watch: {
      value: function (newVal) {
        if (this.quill && newVal !== this._content) {
          this.quill.pasteHTML(newVal || '');
        }
      },

      content: function (newVal) {
        if (this.quill && newVal !== this._content) {
          this.quill.pasteHTML(newVal || '');
        }
      }
    }
  };
</script>
