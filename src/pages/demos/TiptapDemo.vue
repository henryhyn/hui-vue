<template lang='pug'>
  tiptap-editor(v-model='content')
</template>

<script>
  import TiptapEditor from '@/components/TiptapEditor';

  export default {
    data() {
      return {
        content: '<h1>Hello world!</h1><p><ki src="a^2+b^2=c^2"></ki></p>'
      };
    },

    components: { TiptapEditor }
  };
</script>
