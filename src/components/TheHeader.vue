<template>
  <section>
    <header class="header">
      <BarraEngajamento />
      <section class="container-header">
        <router-link to="/" class="logo">
          <img src="@/assets/dog27-icone-branco.svg" alt="Dog27" />
        </router-link>
        <nav>
          <ul class="menu">
            <router-link
              @mouseover.native="hoverLinkProdutos = true"
              @mouseleave.native="hoverLinkProdutos = false"
              class="menu-link"
              tag="li"
              to="/produtos"
            >
              Produtos
              <span v-if="hoverLinkProdutos" class="menu-link-arrow"></span>
            </router-link>

            <router-link
              @mouseover.native="hoverLinkEstampas = true"
              @mouseleave.native="hoverLinkEstampas = false"
              class="menu-link"
              tag="li"
              to="/estampas"
            >
              Estampas
              <span v-if="hoverLinkEstampas" class="menu-link-arrow arrow-estampas"></span>
            </router-link>
            <router-link
              @mouseover.native="hoverLinkContato = true"
              @mouseleave.native="hoverLinkContato = false"
              class="menu-link"
              tag="li"
              to="/contato"
            >
              Fale Conosco
              <span v-if="hoverLinkContato" class="menu-link-arrow"></span>
            </router-link>
            <router-link class="menu-link" tag="li" to="/blog">Blog</router-link>
          </ul>
        </nav>
        <a class="icon lupa">
          <img id="lupa" src="@/assets/search.svg" />
        </a>
        <router-link to="/usuario" tag="a" class="icon login-profile">
          <img src="@/assets/person.svg" alt="login-dog27" />
        </router-link>
        <a
          class="icon bag"
          :data-badge="quantidadeDeItensNoCarrinho > 0 ? quantidadeDeItensNoCarrinho : null"
          @mouseover="hoverLinkBag = true"
          @mouseleave="hoverLinkBag = false"
        >
          <img src="@/assets/bag.svg" />
        </a>
      </section>
    </header>
    <transition mode="out-in">
      <SubMenuProdutos
        @mouseover.native="hoverLinkProdutos = true"
        @mouseleave.native="hoverLinkProdutos = false"
        v-show="hoverLinkProdutos"
      />
    </transition>
    <transition mode="out-in">
      <SubMenuEstampas
        @mouseover.native="hoverLinkEstampas = true"
        @mouseleave.native="hoverLinkEstampas = false"
        v-show="hoverLinkEstampas"
      />
    </transition>
    <transition mode="out-in">
      <SubMenuContato
        @mouseover.native="hoverLinkContato = true"
        @mouseleave.native="hoverLinkContato = false"
        v-show="hoverLinkContato"
      />
    </transition>
    <transition mode="out-in">
      <CarrinhoDeCompras
        v-show="hoverLinkBag"
        @mouseover.native="hoverLinkBag = true"
        @mouseleave.native="hoverLinkBag = false"
      />
    </transition>
    <transition mode="out-in">
      <Login
        v-if="hoverLinkLogin"
        @mouseover.native="hoverLinkLogin = true"
        @mouseleave.native="hoverLinkLogin = false"
      />
    </transition>
  </section>
</template>

<script>
import BarraEngajamento from "@/components/BarraEngajamento.vue";
import SubMenuProdutos from "@/components/SubMenuProdutos.vue";
import SubMenuEstampas from "@/components/SubMenuEstampas.vue";
import SubMenuContato from "@/components/SubMenuContato.vue";
import CarrinhoDeCompras from "@/components/CarrinhoDeCompras.vue";
import Login from "@/views/Login.vue";
import { mapState } from "vuex";

export default {
  name: "TheHeader",
  data() {
    return {
      login: {
        email: "",
        senha: ""
      },
      erros: [],
      hoverLinkProdutos: false,
      hoverLinkEstampas: false,
      hoverLinkContato: false,
      hoverLinkBag: false,
      hoverLinkLogin: false,
      mostrarBadgeCarrinho: false
    };
  },
  components: {
    BarraEngajamento,
    SubMenuProdutos,
    SubMenuEstampas,
    SubMenuContato,
    CarrinhoDeCompras,
    Login
  },
  methods: {},
  watch: {
    carrinho() {
      let quantidade = this.quantidadeDeItensNoCarrinho;
      if (quantidade === 0) {
        this.mostrarBadgeCarrinho = false;
      } else {
        this.mostrarBadgeCarrinho = true;
      }
      return quantidade;
    }
  },
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho
    }),
    quantidadeDeItensNoCarrinho() {
      let quantidade = this.carrinho.length;
      return quantidade;
    }
  }
};
</script>

<style scoped>
section {
  position: sticky;
  top: 0;
  z-index: 99;
}

.container-header {
  max-width: 950px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  flex-wrap: wrap; /* faz os flex-items ficarem um em cima do outro qndo a tela reduzir e eles colidirem */
}

.header {
  background: #2f2c2c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* faz os flex-items ficarem um em cima do outro qndo a tela reduzir e eles colidirem */
}

.menu {
  display: flex;
}

.menu-link {
  color: #fff;
  margin-left: 10px;
  display: block;
  padding: 25px 10px; /* isso aumenta a área de click do botão para ficar maior que apenas o texto */
  cursor: pointer;
}

.menu-link-arrow {
  bottom: -2px;
  position: relative;
  display: table;
  border-right: 9px solid transparent;
  border-bottom: 9px solid #e5ebeb;
  border-left: 9px solid transparent;
  content: "";
  left: 40%;
  height: 100%;
  visibility: hidden;
}

.arrow-estampas {
  border-bottom: 9px solid #f3f3f3;
}

.bag {
  position: relative;
}

.bag[data-badge]:after {
  content: attr(data-badge);
  position: absolute;
  top: 30px;
  right: -8px;
  font-size: 0.7em;
  background: rgb(59, 177, 212);
  color: white;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}

.menu-link.router-link-exact-active,
.menu-link:hover {
  background: rgb(75, 75, 75);
  color: #fff;
}

.logo,
.icon {
  padding: 10px 0;
}

.logo img {
  width: 35px;
  height: 35px;
}

.icon img {
  width: 27px;
  height: 27px;
  border: none;
  cursor: pointer;
  box-shadow: none;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}
/* um entra por cima enquanto o outro sai por baixo */
.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
