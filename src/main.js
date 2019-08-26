import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store/index.js";
import PaginaCarregando from "@/components/PaginaCarregando.vue"
import ErroNotificacao from "@/components/ErroNotificacao.vue"
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

Vue.config.productionTip = false;

Vue.component("PaginaCarregando", PaginaCarregando);
Vue.component("ErroNotificacao", ErroNotificacao);

Vue.filter("numeroPreco", valor => {
  valor = Number(valor);
  if (!isNaN(valor)) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return ""
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");