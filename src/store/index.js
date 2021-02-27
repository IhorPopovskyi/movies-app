import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";
import loaderStore from "./modules/loader";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    loaderStore
  }
});

store.dispatch("initMoviesStore");

export default store;
