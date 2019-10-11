<template>
  <div class="submenu-container">
    <div class="submenu-titulo-area">
      <h1 class="titulo-submenu-estampas">ESTAMPAS</h1>
    </div>
    <section class="submenu-container-conteudo">
      <div class="arrow" @click="swapLeft()">
        <img class="arrow-img" src="@/assets/arrow-left.svg" alt="Dog27" />
      </div>
      <div class="estampas-conteudo">
        <div
          class="area-submenu-estampas"
          v-for="(estampa, index) in chunkEstampas"
          :class="`area${index+1}`"
          :key="`estampa-link-${index}`"
          @click="getEstampa(estampa)"
        >
          <div class="imagem-submenu-estampas">
            <img :src="getSrc(estampa.slug)" :alt="estampa.nome" />
          </div>
          <div class="subtitulo-submenu-estampas">
            <h2 class="submenu-estampa-titulo">{{estampa.nome | uppercase}}</h2>
            <div class="btn-submenu-estampas">Comprar >></div>
          </div>
        </div>
      </div>
      <div class="arrow" @click="swapRight()">
        <img class="arrow-img" src="@/assets/arrow-right.svg" alt="Dog27" />
      </div>
    </section>
  </div>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "SubMenuEstampas",
  data() {
    return {
      estampas: [],
      produtosDaEstampa: []
    };
  },
  methods: {
    getEstampa(estampa) {
      api
        .get(
          `${process.env.VUE_APP_SITE_PREFIX}/api-dog27/wp-json/wc/v3/products?search=${estampa.slug}&on_sale=true&purchasable=true&stock_status=instock&consumer_key=${process.env.VUE_APP_CONSUMER_KEY}&consumer_secret=${process.env.VUE_APP_CONSUMER_SECRET}`
        )
        .then(response => {
          this.produtosDaEstampa = [];
          response.data.forEach(this.getProdutosDaEstampa);
        })
        .then(() => {
          this.$router.push({
            name: "produtosDaEstampa",
            params: {
              estampa: estampa.nome,
              produtos: this.produtosDaEstampa
            }
          });
        });
    },
    getProdutosDaEstampa(produto) {
      let obj = {
        id: produto.id,
        nome: produto.name.replace(/ .*/, ""),
        precoMinimo: produto.price,
        fotos: produto.images,
        attributes: produto.attributes,
        imgSrc: produto.images[0].src,
        categoriaNome: produto.categories[0].id,
        categoriaId: produto.categories[0].name
      };
      this.produtosDaEstampa.unshift(obj);
    },
    getEstampas() {
      api
        .get(
          `${process.env.VUE_APP_SITE_PREFIX}/api-dog27/wp-json/wc/v3/products/attributes/3/terms?per_page=99&on_sale=true&purchasable=true&stock_status=instock&consumer_key=${process.env.VUE_APP_CONSUMER_KEY}&consumer_secret=${process.env.VUE_APP_CONSUMER_SECRET}`
        )
        .then(response => {
          this.estampas = [];
          response.data.forEach(this.estampasDisponiveis);
        });
    },
    estampasDisponiveis(estampa) {
      let produtosTotal = estampa.count;
      let nome = estampa.name;
      let slug = estampa.slug;
      let id = estampa.id;
      let descricao = estampa.description;

      let obj = {
        nome: nome,
        slug: slug,
        id: id,
        descricao: descricao,
        produtosTotal: produtosTotal
      };

      if (produtosTotal > 0) {
        this.estampas.push(obj);
      }
    },
    getSrc(slug) {
      return require("../assets/estampas/coleira-para-cachorro-" +
        slug +
        ".png");
    },
    swapRight() {
      let first = this.estampas[0];
      let second = this.estampas[1];
      this.estampas.push(first, second); //adds new items to the end of an array, and returns the new length.
      this.estampas.shift(); //Remove the first item of an array
      this.estampas.shift();
    },
    swapLeft() {
      let lastIndex = this.estampas.length - 1;
      let penultIndex = this.estampas.length - 2;
      let last = this.estampas[lastIndex];
      let penult = this.estampas[penultIndex];
      this.estampas.unshift(last, penult); //Add new items to the beginning of an array
      this.estampas.pop(); //Remove the last element of an array
      this.estampas.pop();
    }
  },
  computed: {
    chunkEstampas() {
      return this.estampas.slice(0, 4);
    }
  },
  created() {
    this.getEstampas();
  }
};
</script>

<style scoped>
.submenu-container {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  background: #f3f3f3;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.4);
}

.submenu-titulo-area {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  width: 100%;
  padding: 20px 0;
}

.titulo-submenu-estampas {
  grid-column: 2/3;
  width: 100%;
  margin: 10px;
  font-family: "Fira Sans", sans-serif;
  text-align: left;
  font-size: 2em;
  font-style: italic;
  color: black;
}

.arrow {
  display: grid;
  grid-template-rows: 20px 1fr 20px;
}

.arrow img {
  margin: 100% 0;
  padding: 0 10px;
  width: fit-content;
}

.estampas-conteudo {
  grid-column: 2/4;
  display: grid;
  /* grid-template-columns: 1fr 1fr;  */
  grid-template: "a c" 1fr "b d" 1fr / 1fr 1fr;
  grid-gap: 0 40px;
  width: 100%;
  margin: 0 auto;
}

.area1 {
  grid-area: a;
}
.area2 {
  grid-area: b;
}
.area3 {
  grid-area: c;
}
.area4 {
  grid-area: d;
}

.submenu-container-conteudo {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 100px;
  width: 100%;
  margin: 0 auto;
}

.imagem-submenu-estampas {
  cursor: pointer;
}

.imagem-submenu-estampas img {
  padding: 0;
  margin: 0 auto;
}

.subtitulo-submenu-estampas {
  text-align: center;
}

.submenu-estampa-titulo {
  margin-top: 10px;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 1.3em;
  font-style: italic;
  color: black;
}

.btn-submenu-estampas {
  margin-bottom: 15px;
  cursor: pointer;
  flex: 1;
  color: #00acff;
  font-size: 1rem;
}
</style>
