<template>
  <section>
    <transition mode="out-in">
      <section class="call-to-buy-container">
        <div class="call-to-buy" v-if="!mostrarAreaDeCompra" key="header-compra">
          <div>
            <p>Coleira</p>
          </div>
          <div>
            <p class="medidas" @click="scrollMeTo('medidas')">Medidas</p>
            <button @click="vaiComprar">Comprar</button>
          </div>
        </div>
      </section>
    </transition>
    <transition mode="out-in">
      <AreaDeCompra :produto="categoriaNome" v-show="mostrarAreaDeCompra" key="area-de-compra"></AreaDeCompra>
    </transition>
    <div class="produto-container">
      <div class="texto-box">
        <h1 class="saiba-mais-titulo">COLEIRAS</h1>
        <p
          class="saiba-mais-paragrafo"
        >Nossas coleiras oferecem uma sensação de qualidade e estilo, bem como uma série de outras adições para manter você e seu cão felizes.</p>
      </div>

      <img
        src="@/assets/coleira/pagina de coleiras-01.jpg"
        alt="Coleira para cahorro dog27"
        class="produto-detalhe"
      />

      <h2 class="saiba-mais-subtitulo">PERFEITA PARA TODOS OS CÃES</h2>
      <div class="produto-tamanhos-container" ref="medidas">
        <img
          src="@/assets/coleira/pagina de coleiras-02.jpg"
          alt="Coleira para cahorro dog27"
          class="produto-tamanhos"
        />
        <img
          src="@/assets/4 tamanhos diferentes.jpg"
          alt="Coleira para cahorro dog27"
          class="produto-tamanhos"
        />
      </div>
      <h1 class="saiba-mais-subtitulo wide">MAIS CONFORTÁVEIS E NÍTIDAS</h1>
      <img src="@/assets/wide.jpg" alt="Coleira para cahorro dog27" class="produto-estampa" />

      <div class="comprar-agora">
        <h2 class="saiba-mais-subtitulo">a segurança e o conforto que o seu dog merece!</h2>
        <div class="btn-vazado">
          <button @click="vaiComprar">COMPRAR AGORA</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
import AreaDeCompra from "@/components/AreaDeCompra.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Coleira",
  props: { comprar: Boolean },
  components: { AreaDeCompra },
  data() {
    return {
      categoriaNome: "coleira",
      produtos: null,
      produto: null,
      estampa: null,
      tamanho: null,
      estoque: null,
      categoriaId: 34,
      idCategoriaCombo: 35
    };
  },
  methods: {
    ...mapActions(["selecionarCategoria", "switchAreaDeCompra"]),
    vaiComprar() {
      this.switchAreaDeCompra(true);
    },
    getProdutos() {
      var page = 1;
      var url = `/products/${this.categoriaId}/variations?page=${page}&on_sale=true&stock_status=instock&status=publish&orderby=slug`;
      api.getApiWc(url).then(r => {
        const paginas = 3; //Number(r.headers["x-wp-totalpages"]);
        var i;
        for (i = 2; i <= paginas; i++) {
          page = i;
          url = `/products/${this.categoriaId}/variations?page=${page}&on_sale=true&stock_status=instock&status=publish&orderby=slug`;
        }
        this.produtos = r.data;
        r.data.forEach(this.getProduto);
        r.data.forEach(this.ProdutoEstoque);
        r.data.forEach(this.ProdutoNome);
      });
    },
    ProdutoNome(item, index) {
      if (index === 0) {
        item.attributes.forEach((
          item //Quando eu uso aerofunction ele não usa o "this." dentro do contexto da function e sim no contexto do elemento pai, assim consigo acessar o "this.produto".
        ) => {
          if (item.name === "Produto") {
            this.produto = item.option;
            document.title = item.option;
          }
        });
      }
    },
    getProduto(item) {
      item.attributes.forEach(this.ProdutoEstampa);
      item.attributes.forEach(this.ProdutoTamanho);
    },
    ProdutoEstampa(item) {
      if (item.name === "Estampa") {
        this.estampa = item.option;
      }
    },
    ProdutoTamanho(item) {
      if (item.name === "Tamanho") {
        this.tamanho = item.option;
      }
    },
    ProdutoEstoque(item) {
      this.estoque = item.stock_quantity;
    },
    scrollBehavior() {
      return window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  computed: {
    ...mapState({
      mostrarAreaDeCompra: state => state.areaDeCompra.mostrarAreaDeCompra
    })
    // ...mapState(["idCategoriaSelecionada"])
  },
  created() {
    let categorias = {
      categoriaId: this.categoriaId,
      categoriaComboId: this.idCategoriaCombo
    };
    this.selecionarCategoria(categorias);

    if (this.comprar === true) {
      this.vaiComprar();
    } else if (this.comprar === false && this.mostrarAreaDeCompra === true) {
      this.switchAreaDeCompra(false);
    }
  },
  watch: {
    mostrarAreaDeCompra() {
      this.scrollBehavior();
    }
  }
};
</script>

<style scoped>
section {
  background: #fff;
}

.call-to-buy {
  max-width: 950px;
  width: 100%;
  padding: 7px 3px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 2px 1px -2px rgba(30, 60, 90, 0.1);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.call-to-buy div p {
  display: inline-block;
  font-size: 1rem;
  color: #2f2c2c;
}

.call-to-buy div button {
  margin-left: 20px;
  background: #239dce;
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 10%, #239dce);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  font-weight: 600;
  cursor: pointer;
}

.medidas {
  cursor: pointer;
}

.texto-box {
  margin: 0 auto 50px auto;
  max-width: 800px;
}

.saiba-mais-titulo {
  padding-top: 50px;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 2em;
  font-style: italic;
  color: black;
  margin: 0 auto;
}

.saiba-mais-subtitulo {
  font-size: 1.4rem;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 1.5em;
  font-style: italic;
  color: black;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 50px;
}

.wide {
  padding-top: 150px;
}

.saiba-mais-paragrafo {
  font-family: "Fira Sans", sans-serif;
  color: black;
  text-align: center;

  font-weight: 200;
}

.saiba-mais-paragrafo .maior {
  font-size: 1.4rem;
}

img {
  margin: 0 auto;
}

.produto-demonstracao {
  max-width: 800px;
  padding: 50px;
}

.produto-estampa {
  margin: 0;
  width: 100%;
}

.produto-tamanhos-container {
  text-align: center;
}

.produto-tamanhos {
  display: inline-block;
}

.design-info-container {
  text-align: center;
  padding: 20px;
}

.design-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  display: inline-block;
}

.design-info.left {
  justify-items: end;
}

.design-info.right {
  justify-items: start;
}

.design-info-chunk {
  display: grid;
  grid-template-columns: 55px 1fr;
  margin-bottom: 10px;
}

.design-info-chunk p {
  margin: auto 20px;
  text-align: left;
  font-size: 1.1rem;
}

.design-info-chunk img {
  height: 40px;
}

.comprar-agora {
  display: grid;
  grid-template-rows: 175px 1fr 1fr;
  background: url("../assets/coleira/pagina de coleiras-05.jpg") no-repeat
    center center;
  margin: 10px auto;
  text-align: center;
}

.comprar-agora h2 {
  font-size: 1.5rem;
  grid-row-start: 2;
  color: #fff;
}

.btn-vazado {
  grid-row-start: 3;
}

.btn-vazado button {
  background: none;
  padding: 8px 15px;
  border: 3px solid #fff;
  color: #fff;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .wide {
    padding-top: 15px;
  }
}
</style>
