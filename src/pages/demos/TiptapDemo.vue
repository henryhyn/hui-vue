<template lang='pug'>
  tiptap-editor(v-model='content')
</template>

<script>
  import TiptapEditor from '@/components/TiptapEditor';

  export default {
    data() {
      return {
        content: '<p>Hello world!</p>'
      };
    },

    components: { TiptapEditor }
  };
</script>
