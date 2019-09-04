import {
  isContext
} from "vm";

export default {
  strict: true,
  state: {
    order: null,
    metaMenor: 169,
    metaMaior: 269,
    idOrdemAberta: null
  },
  mutations: {
    CRIAR_ORDER(state, payload) {
      state.order = payload;
    },
    ID_DA_ORDER(state, payload) {
      state.idOrdemAberta = payload;
    },
  },
  actions: {
    setOrder(context, payload) {
      context.commit("CRIAR_ORDER", payload)
    },
    setOrderId(context, payload) {
      context.commit("ID_DA_ORDER", payload)
    },
  },
  watch: {

  },
}