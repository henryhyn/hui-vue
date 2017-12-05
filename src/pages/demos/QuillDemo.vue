<template lang='pug'>
  section
    h2 Quill 富文本编辑器
    p 你在富文本编辑器中输入了以下内容:
    p {{content}}
    quill-editor(v-model='content' :image='image')
</template>

<script>
  import QuillEditor from '@/components/QuillEditor';

  export default {
    data () {
      return {
        image: {
          upload: {
            url: '',
            field: 'file',
            params: {}
          }
        },
        content: ''
      };
    },

    components: { QuillEditor }
  };
</script>
