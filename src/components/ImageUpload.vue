<template lang='pug'>
  el-dialog(title='上传图片' :visible.sync='imageUploadVisible')
    el-upload(ref='upload' drag :auto-upload='false' list-type='picture' :file-list='fileList' :on-success='uploadSuccess' :action='url' :name='field' :data='params' :headers='headers')
      i.el-icon-upload
      .el-upload__text 将文件拖到此处，或<em>点击上传</em>
    div(slot='footer')
      el-button(@click='imageUploadVisible=false') 取消
      el-button(@click='uploadHandler' type='primary') 确定
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        imageUploadVisible: false
      };
    },

    props: {
      url: String,
      field: String,
      headers: Object,
      params: Object,
      value: Boolean,
      visible: Boolean
    },

    methods: {
      uploadHandler() {
        this.$refs.upload.submit();
      },

      uploadSuccess(res) {
        this.$emit('crop-upload-success', res);
        this.imageUploadVisible = false;
      }
    },

    watch: {
      imageUploadVisible(newVal) {
        this.$emit('input', newVal);
        if (!newVal) {
          this.fileList = [];
        }
      },

      value(newVal) {
        if (newVal !== this.imageUploadVisible) {
          this.imageUploadVisible = newVal;
        }
      },

      visible(newVal) {
        if (newVal !== this.imageUploadVisible) {
          this.imageUploadVisible = newVal;
        }
      }
    }
  };
</script>
