import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    compName: "남친룩",
    compCode: null,
    comps: null,
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
