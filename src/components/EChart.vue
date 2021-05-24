<template lang='pug'>
  div(:style='{width, height}')
</template>

<script>
  import echarts from 'echarts';

  export default {
    data() {
      return {
        chart: null
      };
    },

    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      },
      option: {
        type: Object,
        default() {
          return {
            series: []
          };
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$el);
        this.chart.setOption(this.option);
        this.chart.on('click', 'series', params => this.$emit('clickSeries', params));
      });
    },

    watch: {
      option(newVal) {
        if (this.chart) {
          this.chart.setOption(newVal);
        }
      }
    }
  };
</script>
