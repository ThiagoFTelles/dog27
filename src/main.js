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

Vue.filter('capitalize', function (value) {
  //primeira letra maiúscula
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('uppercase', function (value) {
  return value.toUpperCase()
})

Vue.filter('lowercase', function (value) {
  return value.toLowerCase()
})

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

Vue.mixin({
  methods: {
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop - 200;
      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");