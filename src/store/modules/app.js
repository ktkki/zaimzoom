import * as mutations from "../mutationTypes";

const tablet = 980;
const mobile = 640;

const app = {
  state: {
    screenSize: 0,
    isGlobalNavOpen: true,
    isMenuNavOpen: true,
    isOverlayOn: false,
    isOverlayTransparent: false,
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

    [mutations.UPDATE_GLOBALNAV_STAT](state, flag) {
      state.isGlobalNavOpen = flag;
    },

    [mutations.UPDATE_MENUNAV_STAT](state, flag) {
      state.isMenuNavOpen = flag;
    },

    [mutations.ADD_OVERLAY](state, isTransparent) {
      state.isOverlayTransparent = isTransparent;
      state.isOverlayOn = true;
    },

    [mutations.REMOVE_OVERLAY](state) {
      state.isOverlayOn = false;
    },
  },

  actions: {},
};

export default app;
