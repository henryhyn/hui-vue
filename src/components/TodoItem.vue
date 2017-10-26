<template lang='pug'>
  li.hui-todo-item {{ todo.text }}
</template>

<script>
  export default {
    props: ['todo']
  };
</script>
