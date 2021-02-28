import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movies";
import loaderStore from "./modules/loader";
import notification from "@/store/modules/notification";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    loaderStore,
    notification,
  }
});

store.dispatch("initMoviesStore");

export default store;
