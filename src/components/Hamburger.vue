<template lang='pug'>
  div(@click='clickHandler')
    span.glyphicon.glyphicon-menu-hamburger.hamburger(:class="{'active': active}")
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
      clickHandler () {
        this.$emit('toggle');
      }
    }
  };
</script>

<style lang='less'>
  .hamburger {
    cursor: pointer;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;

    &.active {
      transform: rotate(90deg);
    }
  }
</style>
