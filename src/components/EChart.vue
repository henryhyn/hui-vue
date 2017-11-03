<template lang='pug'>
  .hui-e-chart
</template>

<script>
  import echarts from 'echarts';

  export default {
    data () {
      return {
        chart: null
      };
    },

    props: {
      option: {
        type: Object,
        required: true
      }
    },

    mounted: function () {
      this.chart = echarts.init(this.$el);
      this.chart.setOption(this.option);
    },

    watch: {
      option (newVal) {
        if (this.chart) {
          this.chart.setOption(newVal);
        }
      }
    }
  };
</script>

<style lang='less'>
  .hui-e-chart {
    width: 100%;
    height: 400px;
  }
</style>