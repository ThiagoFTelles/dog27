import {
  isContext
} from "vm";

export default {
  strict: true,
  state: {
    mostrarAreaDeCompra: false,
  },
  mutations: {
    SWITCH_AREA_DE_COMPRA(state, payload) {
      state.mostrarAreaDeCompra = payload;
    }
  },
  actions: {
    switchAreaDeCompra(context, payload) {
      context.commit("SWITCH_AREA_DE_COMPRA", payload)
    }
  },
  watch: {

  },
}