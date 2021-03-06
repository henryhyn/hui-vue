<template lang='pug'>
  el-card(:body-style='{padding: 0}' :style='`width: ${width}px`')
    div
      video(:width='width' :height='height' v-show='isOpen')
      img(:width='width' :height='height' v-show='!isOpen')
      canvas(:width='width' :height='height' v-show='false')
    ul.list-inline(style='padding: 16px')
      li: el-switch(v-model='isOpen' @change='changeHandler' active-text='开' inactive-text='关')
      li: el-button(@click='photoHandler' size='small' type='primary' :disabled='!isOpen') 拍照
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 300
      }
    },

    data() {
      return {
        isOpen: false,
        video: null,
        mediaTrack: null,
        constraints: {
          audio: false,
          video: {
            width: this.width,
            height: this.height
          }
        }
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.video = document.querySelector('video');
      });
    },

    beforeDestroy() {
      this.close();
      this.video = null;
    },

    methods: {
      changeHandler(value) {
        value ? this.open() : this.close();
      },

      open() {
        if (!this.video) {
          return;
        }
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {};
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = constraints => {
            const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise((resolve, reject) => getUserMedia.call(navigator, constraints, resolve, reject));
          };
        }
        navigator.mediaDevices.getUserMedia(this.constraints)
          .then(stream => {
            this.mediaTrack = stream.getTracks()[0];
            this.video.src = window.URL.createObjectURL(stream);
            this.video.onloadedmetadata = this.video.play;
          }).catch(err => this.$message.error(err.name + ': ' + err.message));
      },

      close() {
        this.isOpen = false;
        this.mediaTrack && this.mediaTrack.stop();
      },

      photoHandler() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this.video, 0, 0, this.width, this.height);
        const image = document.querySelector('img');
        image.src = canvas.toDataURL('image/jpeg');
        this.close();
      }
    }
  };
</script>
