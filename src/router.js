import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Checkout from "@/views/Checkout.vue";
import CheckoutCredito from "@/components/CheckoutCredito.vue";
import CheckoutBoleto from "@/components/CheckoutBoleto.vue";
import Login from "@/views/Login.vue";
import Usuario from "@/views/usuario/Usuario.vue";
import UsuarioEditar from "@/views/usuario/UsuarioEditar.vue";
import PaginaNaoEncontrada from "@/views/PaginaNaoEncontrada.vue";
import Peitoral from "@/views/Peitoral.vue";
import Coleira from "@/views/Coleira.vue";
import Cinto from "@/views/Cinto.vue";
import Comedouro from "@/views/Comedouro.vue";
import Gravata from "@/views/Gravata.vue";
import Guia from "@/views/Guia.vue";
import ProdutosDaEstampa from "@/views/ProdutosDaEstampa.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // base: "dog27",
  routes: [{
      path: "*",
      component: PaginaNaoEncontrada,
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/peitoral-para-cachorros-dog27",
      name: "peitoral",
      component: Peitoral,
      props: true
    },
    {
      path: "/coleira-para-cachorros-dog27",
      name: "coleira",
      component: Coleira,
      props: true
    },
    {
      path: "/guia-para-cachorros-dog27",
      name: "guia",
      component: Guia,
      props: true
    },
    {
      path: "/cinto-para-cachorros-dog27",
      name: "cinto",
      component: Cinto,
      props: true
    },
    {
      path: "/gravata-para-cachorros-dog27",
      name: "gravata",
      component: Gravata,
      props: true
    },
    {
      path: "/comedouro-para-cachorros-dog27",
      name: "comedouro",
      component: Comedouro,
      props: true
    },
    {
      path: "/estampa/:estampa",
      name: "produtosDaEstampa",
      component: ProdutosDaEstampa,
      props: true
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
    {
      path: "/checkoutcredito",
      name: "checkoutcredito",
      component: CheckoutCredito
    },
    {
      path: "/checkoutboleto",
      name: "checkoutboleto",
      component: CheckoutBoleto
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/usuario",
      component: Usuario,
      meta: {
        login: true //todos os filhos herdam a meta
      },
      children: [{
          path: "",
          name: "usuario",
          component: UsuarioEditar
        },
        // {
        //   path: "compras", //Não precisa da barra "/"
        //   name: "compras",
        //   component: UsuarioCompras
        // },
        {
          path: "editar",
          name: "usuario-editar",
          component: UsuarioEditar
        },
      ]
    },
  ],
  scrollBehavior() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;