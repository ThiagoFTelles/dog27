import {
  isContext
} from "vm";

export default {
  strict: true,
  state: {
    order: null,
  },
  mutations: {
    CRIAR_ORDER(state, payload) {
      state.order = payload;
    },
  },
  actions: {
    setOrder(context, payload) {
      context.commit("CRIAR_ORDER", payload)
    },
  },
  watch: {

  },
}