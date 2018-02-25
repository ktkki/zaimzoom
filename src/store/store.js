import Vuex from "vuex";
import Vue from "vue";

// Modules
import app from "./modules/app";
import data from "./modules/data";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    data,
  },
});
