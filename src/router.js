import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Produto from "@/views/Produto.vue";
import Checkout from "@/views/Checkout.vue";
import CheckoutCredito from "@/components/CheckoutCredito.vue";
import CheckoutBoleto from "@/components/CheckoutBoleto.vue";
import Login from "@/views/Login.vue";
import Peitoral from "@/views/Peitoral.vue";
import Usuario from "@/views/usuario/Usuario.vue";
import UsuarioEditar from "@/views/usuario/UsuarioEditar.vue";
import PaginaNaoEncontrada from "@/views/PaginaNaoEncontrada.vue";

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
      path: "/peitoral/:id",
      name: "peitoral",
      component: Peitoral,
      props: true
    },
    {
      path: "/produto/:id",
      name: "produto",
      component: Produto,
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