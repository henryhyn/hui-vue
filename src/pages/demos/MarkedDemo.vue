<template lang='pug'>
  section
    h2 MarkDown 编辑器
    marked-editor(:style="{height: '500px'}")
</template>

<script>
  import MarkedEditor from '@/components/MarkedEditor';

  export default {
    components: {MarkedEditor}
  };
</script>
