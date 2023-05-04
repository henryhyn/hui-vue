<template lang='pug'>
  md-render.post-body(:md-content='MarkedSource' style='width:654px')
</template>

<script>
  import MdRender from '@/components/MdRender';
  import MarkedSource from '@/../test/utils/test.md';

  export default {
    data() {
      return {
        MarkedSource
      };
    },

    components: { MdRender }
  };
</script>
