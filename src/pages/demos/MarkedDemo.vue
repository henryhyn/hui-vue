<template lang='pug'>
  marked-editor(stretch v-model='MarkedSource')
</template>

<script>
  import MarkedEditor from '@/components/MarkedEditor';
  import MarkedSource from '@/../test/utils/test.md';

  export default {
    data() {
      return {
        MarkedSource
      };
    },

    components: { MarkedEditor }
  };
</script>
