<template>
  <section>
    <transition mode="out-in">
      <div class="call-to-buy" v-if="!mostrarAreaDeCompra" key="header-compra">
        <div>
          <p>Peitoral Híbrido</p>
        </div>
        <div>
          <p class="medidas">Medidas</p>
          <button @click="vaiComprar">Comprar</button>
        </div>
      </div>
    </transition>
    <transition mode="out-in">
      <AreaDeCompra :produto="categoriaNome" v-show="mostrarAreaDeCompra" key="area-de-compra"></AreaDeCompra>
    </transition>
    <div class="peitoral-container">
      <div class="texto-box">
        <h1 class="saiba-mais-titulo">PEITORAL HÍBRIDO</h1>
        <p
          class="saiba-mais-paragrafo"
        >O único peitoral híbrido do mercado. onde o funcional encontra beleza e conforto.</p>
      </div>

      <img
        src="@/assets/peitoral-para-cachorro-dog27.jpg"
        alt="Peitoral para cahorro dog27"
        class="peitoral-detalhe"
      />
      <div class="texto-box">
        <h1 class="saiba-mais-titulo">COMO ASSIM "HÍBRIDO"?</h1>
        <p class="saiba-mais-paragrafo maior">Basta desengatar, virar, ajustar e pronto.</p>
        <p
          class="saiba-mais-paragrafo maior"
        >Do peitoral Anti-puxão ao convencional em poucos segundos</p>
      </div>
      <img
        src="@/assets/peitoral-para-cachorro-dog27-demonstracao.jpg"
        alt="Peitoral para cahorro dog27"
        class="peitoral-demonstracao"
      />
      <h1 class="saiba-mais-subtitulo">MAIS CONFORTÁVEIS E NÍTIDAS</h1>
      <img src="@/assets/wide.jpg" alt="Peitoral para cahorro dog27" class="peitoral-estampa" />
      <h2 class="saiba-mais-subtitulo">PERFEITA PARA TODOS OS CÃES</h2>
      <div class="peitoral-tamanhos-container">
        <img
          src="@/assets/peitoral/pagina do peitoral-03.jpg"
          alt="Peitoral para cahorro dog27"
          class="peitoral-tamanhos"
        />
        <img
          src="@/assets/4 tamanhos diferentes.jpg"
          alt="Peitoral para cahorro dog27"
          class="peitoral-tamanhos"
        />
      </div>
      <h2 class="saiba-mais-titulo">UM DESIGN PERFEITO</h2>
      <div class="design-info-container">
        <div class="design-info left">
          <div class="design-info-chunk">
            <img src="@/assets/dog27-icone-preto.svg" alt="Dog27" />
            <p>DESIGN HÍBRIDO INOVADOR</p>
          </div>
          <div class="design-info-chunk">
            <img src="@/assets/dog27-icone-preto.svg" alt="Dog27" />
            <p>RESISTENTE AO CLIMA E POEIRA</p>
          </div>
          <div class="design-info-chunk">
            <img src="@/assets/dog27-icone-preto.svg" alt="Dog27" />
            <p>ESTAMPAS DESENHADAS A MÃO</p>
          </div>
        </div>
        <div class="design-info right">
          <div class="design-info-chunk">
            <img src="@/assets/dog27-icone-preto.svg" alt="Dog27" />
            <p>AJUSTÁVEL: CABE EM QUALQUER DOG</p>
          </div>
          <div class="design-info-chunk">
            <img src="@/assets/dog27-icone-preto.svg" alt="Dog27" />
            <p>FECHO SUPER RESISTENTE</p>
          </div>
          <div class="design-info-chunk">
            <img src="@/assets/dog27-icone-preto.svg" alt="Dog27" />
            <p>TIRA SUPER RESISTENTE</p>
          </div>
        </div>
      </div>
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
  name: "Peitoral",
  props: { comprar: Boolean },
  components: { AreaDeCompra },
  data() {
    return {
      produtos: null,
      produto: null,
      categoriaNome: "Peitoral",
      estampa: null,
      tamanho: null,
      estoque: null,
      categoriaId: 16,
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
    }),
    ...mapState(["idCategoriaSelecionada"])
  },
  created() {
    let categorias = {
      categoriaId: this.categoriaId,
      categoriaComboId: this.idCategoriaCombo
    };
    this.selecionarCategoria(categorias);
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
  background: #fffefd;
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
  margin-bottom: 50px;
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

.peitoral-demonstracao {
  max-width: 800px;
  padding: 50px;
}

.peitoral-estampa {
  margin: 0;
  width: 100%;
}

.peitoral-tamanhos-container {
  text-align: center;
}

.peitoral-tamanhos {
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
  width: 600px;
  height: 400px;
  margin: auto;
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

@media screen and (max-width: 500px) {
}
</style>
