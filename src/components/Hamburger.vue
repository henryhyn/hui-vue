<template lang='pug'>
  div(@click='clickHandler')
    el-tooltip(:content=`active?'展开':'折叠'`)
      i.pointer(:class=`active?'el-icon-s-unfold':'el-icon-s-fold'`)
</template>

<script>
  export default {
    props: {
      active: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      clickHandler() {
        this.$emit('toggle');
      }
    }
  };
</script>
