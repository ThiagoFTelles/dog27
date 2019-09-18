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
            <li
              @mouseover="hoverLinkProdutos = true"
              @mouseleave="hoverLinkProdutos = false"
              class="menu-link"
            >
              Produtos
              <span v-if="hoverLinkProdutos" class="menu-link-arrow"></span>
            </li>

            <li
              @mouseover="hoverLinkEstampas = true"
              @mouseleave="hoverLinkEstampas = false"
              class="menu-link"
            >
              Estampas
              <span v-if="hoverLinkEstampas" class="menu-link-arrow arrow-estampas"></span>
            </li>
            <li
              @mouseover="hoverLinkContato = true"
              @mouseleave="hoverLinkContato = false"
              class="menu-link"
            >
              Fale Conosco
              <span v-if="hoverLinkContato" class="menu-link-arrow"></span>
            </li>
            <a target="_blank" href="https://blog.dog27.com.br" class="menu-link">Blog</a>
          </ul>
        </nav>

        <a class="icon lupa">
          <transition>
            <div v-if="mostrarPesquisa" class="barra-de-pesquisa">
              <a id="fechar-pesquisa" @click="mostrarPesquisa=false">X</a>
              <input
                ref="barraDePesquisa"
                type="text"
                v-model="pesquisa"
                v-on:keyup.enter="pesquisar(pesquisa)"
              />
              <img id="lupa-inside" src="@/assets/search.svg" @click="pesquisar(pesquisa)" />
            </div>
            <img v-else @click="mostrarAreaDePesquisa()" id="lupa" src="@/assets/search.svg" />
          </transition>
        </a>
        <router-link to="/usuario" tag="a" class="icon login-profile">
          <img v-if="logado===false" src="@/assets/person.svg" alt="login-dog27" />
          <img v-else src="@/assets/person-logged.svg" alt="login-dog27" />
        </router-link>
        <a
          class="icon bag"
          :data-badge="quantidadeDeItensNoCarrinho > 0 ? quantidadeDeItensNoCarrinho : null"
          @mouseover="hoverLinkBag = true"
        >
          <img src="@/assets/bag.svg" />
          <transition mode="out-in">
            <section class="cart-capsule">
              <CarrinhoDeCompras v-show="hoverLinkBag" @mouseleave="hoverLinkBag = false">
                <template v-slot:top>
                  <div class="carrinho-slot">
                    <h2 class="carrinho_titulo">Seu carrinho</h2>
                    <button class="carrinho_fechar" @click="hoverLinkBag = false">X</button>
                  </div>
                </template>
                <template v-slot:bottom>
                  <div class="bottom" @click="finalizarCompra">
                    <router-link
                      :to="{name: 'checkout'}"
                      class="carrinho_finalizar"
                    >Finalizar Compra</router-link>
                  </div>
                </template>
              </CarrinhoDeCompras>
            </section>
          </transition>
        </a>
      </section>
      <section class="container-header-mobile">
        <router-link to="/" class="logo">
          <img src="@/assets/header/icone-logo-com-texto-branca.svg" alt="Dog27" />
        </router-link>
        <MenuMobile />
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
import CarrinhoDeCompras from "@/components/CarrinhoDeCompras.vue";
import MenuMobile from "@/components/MenuMobile.vue";
import { mapState, mapGetters } from "vuex";
import { api } from "@/services.js";

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
      mostrarBadgeCarrinho: false,
      mostrarPesquisa: false,
      pesquisa: "",
      produtosDaPesquisa: []
    };
  },
  components: {
    BarraEngajamento,
    SubMenuProdutos,
    SubMenuEstampas,
    SubMenuContato,
    CarrinhoDeCompras,
    MenuMobile
  },
  methods: {
    finalizarCompra() {
      this.$router.push({ name: "checkout" });
    },
    mostrarAreaDePesquisa() {
      this.mostrarPesquisa = true;
      this.$nextTick(() => this.$refs.barraDePesquisa.focus());
    },
    pesquisar(pesquisa) {
      this.$nextTick(
        () => (this.$refs.barraDePesquisa.value = "Pesquisando...")
      );
      api
        .get(
          `${process.env.VUE_APP_SITE_PREFIX}/api-dog27/wp-json/wc/v3/products?search=${pesquisa}&on_sale=true&purchasable=true&stock_status=instock&consumer_key=${process.env.VUE_APP_CONSUMER_KEY}&consumer_secret=${process.env.VUE_APP_CONSUMER_SECRET}`
        )
        .then(response => {
          this.produtosDaPesquisa = [];
          response.data.forEach(this.getProdutosDaPesquisa);
        })
        .then(() => {
          this.$router.push({
            name: "produtosDaPesquisa",
            params: {
              pesquisa: pesquisa,
              produtos: this.produtosDaPesquisa
            }
          });

          this.$nextTick(() => (this.$refs.barraDePesquisa.value = ""));
          this.mostrarPesquisa = false;
        });
    },
    getProdutosDaPesquisa(produto) {
      let obj = {
        id: produto.id,
        nome: produto.name,
        precoMinimo: produto.price,
        fotos: produto.images,
        attributes: produto.attributes,
        imgSrc: produto.images[0].src,
        categoriaNome: produto.categories[0].id,
        categoriaId: produto.categories[0].name
      };
      this.produtosDaPesquisa.unshift(obj);
    }
  },
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
    },
    ...mapGetters(["logado"])
  },
  created() {
    this.pesquisa = "";
  }
};
</script>

<style scoped>
section {
  position: sticky;
  top: 0;
  z-index: 99;
}

.container-header-mobile {
  display: none;
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
  top: 25px;
  right: -8px;
  font-size: 0.7em;
  background: rgb(59, 177, 212);
  color: white;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  border-radius: 50%;
  box-shadow: 0 0 1px #333;
}

.cart-capsule {
  position: absolute;
  top: 56px;
  left: -450px;
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
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
  box-shadow: none;
}

.barra-de-pesquisa {
  width: 300px;
  position: relative;
}

.barra-de-pesquisa input {
  margin: 0;
  padding: 2px 10px;
  border-radius: 20px;
  border: 3px solid white;
  background: rgba(0, 0, 0, 0);
  color: white;
}

#lupa-inside {
  display: none;
  position: absolute;
  top: 0;
  right: 20px;
  padding: 7px;
  height: 30px;
  width: 35px;
  margin: 0;
}

#fechar-pesquisa {
  cursor: pointer;
  color: white;
  position: absolute;
  font-size: 0.99rem;
  top: 3px;
  right: 0;
  padding: 3px 13px 3px 3px;
  height: 30px;
  width: 35px;
  margin: 0;
  text-align: right;
}

.carrinho-slot {
  display: flex;
}

.carrinho_fechar {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  font-family: cursive;
  color: #4f4742;
}

.carrinho-slot h2 {
  font-size: 1.4rem;
  font-weight: 400;
  color: #4a4a4a;
  font-style: italic;
  font-family: sans-serif;
}

.carrinho_titulo {
  flex: 1;
}

.carrinho_finalizar {
  color: white;
}

@media screen and (max-width: 700px) {
  .container-header {
    display: none;
  }

  .container-header-mobile {
    width: 100%;
    height: 50px;
    align-items: center;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 100px 1fr 100px;
  }

  .logo,
  .logo img,
  .menu-mobile2,
  .menu-mobile2 img {
    display: inline;
  }

  .logo {
    margin: 0 auto;
    grid-column: 2/3;
    grid-row: 1;
    height: 100%;
    padding: 7px 0;
  }

  .logo img {
    width: 50px;
  }
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
