import {
  isContext
} from "vm";

export default {
  strict: true,
  state: {
    order: null,
    metaMenor: 239,
    metaMaior: 379,
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
      context.commit("CRIAR_ORDER", payload);
      context.dispatch("solicitarToken", "Comprou");
    },
    setOrderId(context, payload) {
      context.commit("ID_DA_ORDER", payload);
    },
  },
  watch: {

  },
}