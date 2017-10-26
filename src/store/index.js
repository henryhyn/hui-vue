import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      isNotCollapsed: localStorage.getItem('isNotCollapsed') + '' === 'true'
    },
    count: 0
  },

  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  },

  actions: {
    updateSettings (state, settings) {
      state.settings = {...state.settings, ...settings};
      Object.keys(settings).forEach(key => {
        localStorage.setItem(key, settings[key]);
      });
    }
  }
});
