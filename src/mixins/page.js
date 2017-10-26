export default {
  methods: {
    reload () {
      this.getListByPage();
    },

    handleCurrentChange (page) {
      this.getListByPage({page});
    },

    handleSizeChange (pageSize) {
      this.getListByPage({pageSize});
    }
  },

  mounted () {
    this.$nextTick(function () {
      this.getListByPage();
    });
  }
};
