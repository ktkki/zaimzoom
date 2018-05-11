import Vuex from "vuex";
import Vue from "vue";

// Modules
import data from "./modules/data";
import env from "./modules/env";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    data,
    env,
  },
});
