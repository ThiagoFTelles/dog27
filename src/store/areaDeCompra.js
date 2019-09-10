import {
  isContext
} from "vm";

export default {
  strict: true,
  state: {
    mostrarAreaDeCompra: false,
    estampaRedirecionada: null
  },
  mutations: {
    SWITCH_AREA_DE_COMPRA(state, payload) {
      state.mostrarAreaDeCompra = payload;
    },
    SELECIONAR_ESTAMPA(state, payload) {
      state.estampaRedirecionada = payload;
    }
  },
  actions: {
    switchAreaDeCompra(context, payload) {
      context.commit("SWITCH_AREA_DE_COMPRA", payload)
    },
    redirecionarEstampa(context, payload) {
      context.commit("SELECIONAR_ESTAMPA", payload)
    }
  },
  watch: {

  },
}