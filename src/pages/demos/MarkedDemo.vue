<template lang='pug'>
  marked-editor(height=1200 v-model='MarkedSource')
</template>

<script>
  import MarkedEditor from '@/components/MarkedEditor';
  import MarkedSource from './MarkedSource';

  export default {
    data() {
      return {
        MarkedSource
      };
    },

    components: { MarkedEditor }
  };
</script>
