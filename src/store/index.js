import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    compName: null,
    compCode: null,
    comps: null,
    contestinfo: null
  },
  getters: {
    getComps: (state) => state.comps,
  },
  mutations: {
    setComps: (state, newData) => (state.comps = newData),
  },
  actions: {},
  modules: {},
});
