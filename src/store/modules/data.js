import Vue from "vue";
import * as mutations from "../mutationTypes";
import * as actions from "../actionTypes";

import api from "@/api";

import sampleSize from "lodash/sampleSize";

const data = {
  state: {
    securityCodes: [],
    categories: [],
    companies: {},
    picked: [],
  },

  getters: {},

  mutations: {
    [mutations.UPDATE_CODES](state, payload) {
      state.securityCodes = payload;
    },
    [mutations.UPDATE_CATEGORIES](state, payload) {
      state.categories = payload;
    },
    [mutations.ADD_COMPANY](state, payload) {
      Vue.set(state.companies, payload.id, payload);
    },
    [mutations.UPDATE_PICKED](state, payload) {
      state.picked = payload;
    },
  },

  actions: {
    [actions.FETCH_CODES](context) {
      api
        .get("/codes")
        .then(res => {
          context.commit(mutations.UPDATE_CODES, res.data);
          // TODO Don't call pick_companies here
          context.dispatch(actions.PICK_COMPANIES, 5);
        })
        .catch(error => {
          console.log(context, error);
        });
    },
    [actions.FETCH_CATEGORIES](context) {
      api
        .get("/categories")
        .then(res => {
          context.commit(mutations.UPDATE_CATEGORIES, res.data);
        })
        .catch(error => {
          console.log(context, error);
        });
    },
    [actions.PICK_COMPANIES](context, payload) {
      let picked = sampleSize(context.state.securityCodes, 5);
      context.commit(mutations.UPDATE_PICKED, picked);
      for (let i in picked) {
        api
          .get(`/companies/${picked[i].code}`)
          .then(res => {
            context.commit(mutations.ADD_COMPANY, res.data);
          })
          .catch(error => {
            console.log(context, error);
          });
      }
    },
  },
};

export default data;
