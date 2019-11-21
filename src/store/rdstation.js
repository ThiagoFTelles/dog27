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
    solicitarToken(context) {
      var token = "";
      new Promise(function (resolve, reject) {

        const client_id = "15ad5652-d09b-4644-9afc-bed38e4e84aa";
        const client_secret = "ce2152ea3a004bcc99cfd0d5d87ab4c4";
        const refresh_token = "d_Bh6FqV9TvTIc50IBtb9D4T8btgLFfkSc3JUbQwBIk";

        var settings = {
          async: true,
          crossDomain: true,
          url: "https://api.rd.services/auth/token",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Cache-Control": "no-cache"
          },
          processData: false,
          data: `{"client_id":"${client_id}","client_secret":"${client_secret}","refresh_token":"${refresh_token}"}`
        };

        $.ajax(settings).done(function (response) {
          token = response.access_token;
          context.commit("DEFINIR_TOKEN", token);
          resolve(token);
        });
      }).then(function (result) {
        context.dispatch("criarEvento");
      });
    },
    criarEvento(context) {
      console.log("criando evento RD");
      console.log(context.state.access_token);
      var authorization = "Bearer " + context.state.access_token;
      var email = context.rootState.usuario.email;
      console.log("email: " + email);

      var data = JSON.stringify({
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: "Login",
          name: context.rootState.usuario.nome,
          email: context.rootState.usuario.email,
          state: context.rootState.usuario.estado,
          city: context.rootState.usuario.cidade,
          country: context.rootState.usuario.pais,
          mobile_phone: context.rootState.usuario.telefone
        }
      });

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.rd.services/platform/events",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "Authorization": authorization,
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": data
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
  },
  watch: {

  },
}