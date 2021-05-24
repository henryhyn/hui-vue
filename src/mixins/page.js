export default {
  methods: {
    reload() {
      this.getListByPage({ params: {}, page: 1 });
    },

    handleCurrentChange(page) {
      this.getListByPage({ page });
    },

    handleSizeChange(pageSize) {
      this.getListByPage({ pageSize });
    }
  },

  mounted() {
    this.$nextTick(this.getListByPage);
  }
};
