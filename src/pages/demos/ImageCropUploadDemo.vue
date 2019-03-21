<template lang='pug'>
  section
    h2 图片剪切上传
    el-button(type='primary' @click='visible=true') 点击上传图片
    image-upload(v-model='visible' :url='image.url' :field='image.field' :params='image.params')
</template>

<script>
  import ImageUpload from 'vue-image-crop-upload/upload-2';

  export default {
    data() {
      return {
        image: {
          url: '',
          field: 'file',
          params: {}
        },
        visible: false
      };
    },

    components: { ImageUpload }
  };
</script>
