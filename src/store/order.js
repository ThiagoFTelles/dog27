import {
  isContext
} from "vm";

export default {
  strict: true,
  state: {
    order: null,
    metaMenor: 169,
    metaMaior: 269
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