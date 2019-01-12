import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/main.less';
import Layout from '@/pages/app/Layout';
import router from '@/router';
import store from '@/store';
import { filters } from '@/index';

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(Element, { size: 'medium' });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Layout)
});
/* eslint-enable no-new */
