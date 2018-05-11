import * as mutations from "../mutationTypes";

const tablet = 980;
const mobile = 640;

const env = {
  state: {
    screenSize: 0,
  },

  getters: {
    device: state => {
      const MOBILE = "MOBILE";
      const TABLET = "TABLET";
      const DESKTOP = "DESKTOP";

      if (state.screenSize < mobile) {
        return MOBILE;
      } else if (state.screenSize < tablet) {
        return TABLET;
      } else {
        return DESKTOP;
      }
    },
  },

  mutations: {
    [mutations.UPDATE_SCREENSIZE](state) {
      state.screenSize = window.innerWidth;
      if (state.screenSize > tablet) {
        state.isGlobalNavOpen = true;
        state.isMenuNavOpen = true;
      } else {
        state.isGlobalNavOpen = false;
        state.isMenuNavOpen = false;
      }
    },
  },

  actions: {},
};

export default env;
