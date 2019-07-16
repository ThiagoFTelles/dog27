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
              <span :class="{ active: hoverLinkProdutos }" class="menu-link-arrow"></span>
            </router-link>

            <router-link
              @mouseover.native="hoverLinkEstampas = true"
              @mouseleave.native="hoverLinkEstampas = false"
              class="menu-link"
              tag="li"
              to="/estampas"
            >
              Estampas
              <span
                :class="{ active: hoverLinkEstampas }"
                v-if="hoverLinkEstampas"
                class="menu-link-arrow arrow-estampas"
              ></span>
            </router-link>
            <router-link
              @mouseover.native="hoverLinkContato = true"
              @mouseleave.native="hoverLinkContato = false"
              class="menu-link"
              tag="li"
              to="/contato"
            >
              Fale Conosco
              <span
                :class="{ active: hoverLinkContato }"
                v-if="hoverLinkContato"
                class="menu-link-arrow"
              ></span>
            </router-link>
            <router-link class="menu-link" tag="li" to="/blog">Blog</router-link>
          </ul>
        </nav>
        <router-link to="/" class="icon">
          <img id="lupa" src="@/assets/search.svg" />
        </router-link>
        <router-link to="/" class="icon">
          <img src="@/assets/person.svg" alt />
        </router-link>
        <router-link to="/" class="icon">
          <img src="@/assets/bag.svg" alt />
        </router-link>
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
  </section>
</template>

<script>
import BarraEngajamento from "@/components/BarraEngajamento.vue";
import SubMenuProdutos from "@/components/SubMenuProdutos.vue";
import SubMenuEstampas from "@/components/SubMenuEstampas.vue";
import SubMenuContato from "@/components/SubMenuContato.vue";

export default {
  name: "TheHeader",
  data() {
    return {
      hoverLinkProdutos: false,
      hoverLinkEstampas: false,
      hoverLinkContato: false
    };
  },
  components: {
    BarraEngajamento,
    SubMenuProdutos,
    SubMenuEstampas,
    SubMenuContato
  },
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ */, "");
      /* .replace(/ 'asterisco'/, ""); Significa que tudo que vier depois do espaço será apagado para evitar nomes muito grandes */
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

.active {
  visibility: visible;
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
