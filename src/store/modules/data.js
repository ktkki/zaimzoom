import Vue from "vue";
import * as mutations from "../mutationTypes";
import * as actions from "../actionTypes";

import api from "@/api";

import sampleSize from "lodash/sampleSize";

const data = {
  state: {
    securityCodes: [],
    categories: [],
    pickedCompanies: {},
    userAnswer: [],
    correctAnswer: [],
  },

  getters: {
    isAllAnswerSelected: state => {
      if (
        state.userAnswer !== [] &&
        state.userAnswer.length === state.correctAnswer.length
      ) {
        for (let i = 0; i < state.userAnswer.length; i++) {
          if (state.userAnswer[i] === undefined) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    },

    getCompanyByCode: state => secCode => {
      return state.pickedCompanies[secCode];
    },

    getElementById: state => (secCode, type, id) => {
      function idPicker(parent, id) {
        let len = parent.children.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            let child = parent.children[i];
            if (child.id.endsWith(id)) {
              return child;
            } else {
              let result = idPicker(child, id);
              if (result !== undefined) return result;
            }
          }
        }
      }
      let company = state.pickedCompanies[secCode];
      let parent = company[type][0];
      return idPicker(parent, id);
    },

    getChildrenById: state => (secCode, type, id) => {
      function childPicker(parent, id) {
        let len = parent.children.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            let child = parent.children[i];
            if (child.id.endsWith(id)) {
              let result = [];
              for (let i = 0; i < child.children.length - 1; i++) {
                result.push(child.children[i]);
              }
              return result;
            } else {
              let result = childPicker(child, id);
              if (result !== undefined) return result;
            }
          }
        }
      }
      let company = state.pickedCompanies[secCode];
      let parent = company[type][0];
      return childPicker(parent, id);
    },

    getElementByDepth: state => (secCode, type, targetDepth) => {
      function depthPicker(parent, targetDepth, result) {
        for (let i = 0; i < parent.length; i++) {
          if (targetDepth === 0) {
            result.push(parent[i]);
          } else {
            targetDepth--;
            depthPicker(parent[i].children, targetDepth, result);
          }
        }
        return result;
      }
      let company = state.pickedCompanies[secCode];
      let parent = company[type];
      let result = [];
      return depthPicker(parent, targetDepth, result);
    },

    getFlattenElement: state => (secCode, type) => {
      function flattenPicker(parent, result, depth = 0) {
        depth++;
        for (let i = 0; i < parent.length; i++) {
          parent[i].depth = depth;
          result.push(parent[i]);
          flattenPicker(parent[i].children, result, depth);
        }
        return result;
      }
      let company = state.pickedCompanies[secCode];
      let parent = company[type];
      let result = [];
      return flattenPicker(parent, result);
    },
  },

  mutations: {
    [mutations.UPDATE_CODES](state, payload) {
      state.securityCodes = payload;
    },
    [mutations.UPDATE_CATEGORIES](state, payload) {
      state.categories = payload;
    },
    [mutations.ADD_COMPANY](state, payload) {
      Vue.set(
        state.pickedCompanies,
        payload.data.info.security_code,
        payload.data
      );
      state.correctAnswer.push(parseInt(payload.id));
    },
    [mutations.INIT_STAT](state, payload) {
      state.pickedCompanies = {};
      state.correctAnswer = [];
      state.userAnswer = [];
      state.correctAnswer = [];
    },
    [mutations.SET_USER_ANSWER](state, payload) {
      let secCode = payload.company.info.security_code;
      let presentIndex = state.userAnswer.indexOf(secCode);
      if (presentIndex >= 0) {
        Vue.delete(state.userAnswer, presentIndex);
      }
      Vue.set(state.userAnswer, payload.index, secCode);
    },
  },

  actions: {
    [actions.FETCH_CODES](context) {
      if (Object.keys(context.state.securityCodes).length === 0) {
        return api
          .get("/data/codes.json")
          .then(res => {
            context.commit(mutations.UPDATE_CODES, res.data);
          })
          .catch(error => {
            console.log(context, error);
          });
      }
    },
    [actions.FETCH_CATEGORIES](context) {
      if (Object.keys(context.state.categories).length === 0) {
        return api
          .get("/data/categories.json")
          .then(res => {
            context.commit(mutations.UPDATE_CATEGORIES, res.data);
          })
          .catch(error => {
            console.log(context, error);
          });
      }
    },
    [actions.PICK_COMPANIES](context, payload) {
      let picked = sampleSize(context.state.securityCodes, payload);
      context.commit(mutations.INIT_STAT);
      for (let i in picked) {
        api
          .get(`/companies/${picked[i].id}.json`)
          .then(res => {
            context.commit(mutations.ADD_COMPANY, {
              data: res.data,
              id: picked[i].id,
            });
          })
          .catch(error => {
            console.log(context, error);
          });
      }
    },
  },
};

export default data;
