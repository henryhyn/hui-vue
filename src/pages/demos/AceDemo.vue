<template lang='pug'>
  section
    h2 Ace 文本编辑器
    p 你在文本编辑器中输入了以下内容:
    p {{content}}
    ace-editor(v-model='content' :style="{height: '500px'}")
</template>

<script>
  import AceEditor from '@/components/AceEditor';

  export default {
    data () {
      return {
        content: ''
      };
    },

    components: {AceEditor}
  };
</script>
