import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/store";
import { sync } from "vuex-router-sync";

Vue.config.productionTip = false;

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
});
