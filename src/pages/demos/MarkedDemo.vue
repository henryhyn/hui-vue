<template lang='pug'>
  section
    h2 MarkDown 编辑器
    marked-editor
</template>

<script>
  import MarkedEditor from '@/components/MarkedEditor';

  export default {
    components: {MarkedEditor}
  };
</script>
