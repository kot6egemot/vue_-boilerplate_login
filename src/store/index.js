import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    refresh_token: localStorage.getItem("refresh_token") || "",
    user: ""
  },
  mutations: {
    saveToken(state, response) {
      console.log(response);
      state.token = response.access_token;
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      localStorage.setItem("created_in", new Date().getTime().toString());
    },
    removeToken(state) {
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("created_in");
    },
    setUser(state, response) {
      state.user = response;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuth(state) {
      return state.token;
    }
  },
  modules: {}
});
