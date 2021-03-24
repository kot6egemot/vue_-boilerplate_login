import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: ""
  },
  mutations: {
    setUser(state, response) {
      state.user = response;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  modules: {}
});
