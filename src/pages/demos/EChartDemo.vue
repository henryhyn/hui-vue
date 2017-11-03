<template lang='pug'>
  section
    el-row
      el-col(:span=12): e-chart(:option='option')
      el-col(:span=12): e-chart(:option='option')
</template>

<script>
  import EChart from '@/components/EChart';

  export default {
    data () {
      return {
        option: {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      };
    },

    components: {EChart}
  };
</script>