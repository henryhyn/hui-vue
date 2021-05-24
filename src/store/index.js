import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      userId: 'userId',
      userName: 'userName'
    },
    settings: {
      visitedViews: JSON.parse(localStorage.getItem('visitedViews')) || [],
      isCollapsed: JSON.parse(localStorage.getItem('isCollapsed'))
    },
    count: 0
  },

  mutations: {
    increment(state) {
      state.count++;
    },

    decrement(state) {
      state.count--;
    },

    addVisitedViews(state, route) {
      const { visitedViews } = state.settings;
      if (visitedViews.some(v => v.fullPath === route.fullPath)) {
        return;
      }
      const idx = visitedViews.findIndex(v => v.name === route.name);
      if (idx > -1) {
        visitedViews[idx].fullPath = route.fullPath;
      } else {
        visitedViews.unshift(route);
      }
      state.settings.visitedViews = visitedViews.slice(0, 5);
      localStorage.setItem('visitedViews', JSON.stringify(state.settings.visitedViews));
    },

    updateSettings(state, settings) {
      state.settings = { ...state.settings, ...settings };
      Object.keys(settings).forEach(key => {
        localStorage.setItem(key, JSON.stringify(settings[key]));
      });
    }
  }
});
