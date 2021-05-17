<template lang='pug'>
  section
    sequence-editor(v-model='text' :options='options')
    h4 标注结果:
    .post-body: pre: code {{ text }}
</template>

<script>
  import SequenceEditor from '@/components/SequenceEditor';

  export default {
    data() {
      return {
        options: ['COM', 'LOC', 'PRO', 'PER', 'TIM'],
        text: '[今天]_TIM_我在小[红书]_PER_上班, 在[小红书]_PRO_购物'
      };
    },

    components: { SequenceEditor }
  };
</script>
