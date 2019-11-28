import axios from "axios";

export default {
  strict: true,
  state: {
    access_token: ""
  },
  mutations: {
    DEFINIR_TOKEN(state, payload) {
      state.access_token = payload;
    }
  },
  actions: {
    solicitarToken(context, payload) {
      var token = "";

      axios.get("https://dog27.com.br/helpers/rdstationsolicitartoken.php").then(r => {
        token = r.data;
        context.commit("DEFINIR_TOKEN", token);
      }).then(() => {
        context.dispatch("criarEvento", payload)
      });

    },
    criarEvento(context, payload) {
      var authorization = "Bearer " + context.state.access_token;
      let data = {
        conversion_identifier: payload,
        name: context.rootState.usuario.nome,
        email: context.rootState.usuario.email,
        state: context.rootState.usuario.estado,
        city: context.rootState.usuario.cidade,
        country: context.rootState.usuario.pais,
        mobile_phone: context.rootState.usuario.telefone,
        token: authorization
      };
      axios.post("https://dog27.com.br/helpers/rdstation_enviar_dados_do_usuario.php", data);
    }
  },
  watch: {}
};