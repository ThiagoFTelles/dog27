<template>
  <section>
    <PaginaCarregando v-if="carregando" />

    <section v-else>
      <div class="banner">
        <img :src="getSrc(estampa)" alt="dog-27" />
      </div>
      <div class="produto-container">
        <h1 class="produto-titulo">{{ estampa | uppercase}}</h1>
        <div
          class="produto-da-estampa"
          v-for="(produto, index) in produtos"
          :key="`produto-${estampa}-${index}`"
          @click="direcionarProduto(produto)"
        >
          <img class="produto-img" :src="produto.imgSrc" alt />
          <h2 class="produto-subtitulo">{{produto.nome | uppercase}} {{estampa | uppercase}}</h2>
          <p class="produto-paragrafo">A partir de {{Number(produto.precoMinimo) | numeroPreco}} no combo</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProdutosDaEstampa",
  props: { comprar: Boolean, estampa: String, produtos: Array },
  methods: {
    ...mapActions([
      "selecionarCategoria",
      "redirecionarEstampa",
      "removeCarregando"
    ]),
    getSrc(estampa) {
      let estampaNome = estampa.toLowerCase();
      let resultado = require("../assets/estampas/banner-estampas/" +
        estampaNome +
        ".jpg");

      return resultado;
    },
    prepararProduto(id) {
      let categoriaComboId = id === 35 ? 16 : 35;

      let categorias = {
        categoriaId: id,
        categoriaComboId: categoriaComboId
      };

      this.selecionarCategoria(categorias);
    },
    getImgEstampaUrl(estampa) {
      var estampas = require.context("../assets/estampas/", false, /\.png$/);
      return estampas(
        "./coleira-para-cachorro-" +
          estampa.toLowerCase().replace(/\s/g, "") +
          ".png"
      );
    },
    async direcionarProduto(produto) {
      await this.prepararProduto(produto.categoriaId);

      let atributoDaEstampa = produto.attributes.filter(chave => {
        return chave.name === "Estampa";
      });
      let estampa = atributoDaEstampa[0].options[0];

      let fotosDoProduto = produto.fotos;
      let fotosSrc = [];
      fotosDoProduto.forEach(element => {
        fotosSrc.push({ src: element.src });
      });

      let produtoEscolhido = {
        nomeDoProduto: produto.nome,
        estampa: estampa,
        idProdutoPai: produto.id,
        srcFotos: fotosSrc,
        urlThumbnail: this.getImgEstampaUrl(estampa)
      };

      await this.redirecionarEstampa(produtoEscolhido);

      await this.$router.push({
        name: produto.nome.replace(/ .*/, "").toLowerCase(),
        params: { comprar: true }
      });
    }
  },
  computed: {
    ...mapState({
      carregando: state => state.carregando
    })
  },
  watch: {
    produtos() {
      this.removeCarregando();
    }
  },
  created() {
    this.removeCarregando();
    if (!this.produtos) {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
section {
  background: #fff;
}

.banner {
  width: 100%;
  height: 260px;
  display: block;
}

.banner img {
  margin: 0 auto;
}

.produto-container {
  max-width: 1200px;
  margin: 0 auto;
}

.produto-da-estampa {
  width: 300px;
  display: inline-block;
  margin: 0 50px;
  cursor: pointer;
  padding-bottom: 20px;
}

.produto-titulo {
  padding: 50px;
  font-family: "Fira Sans", sans-serif;
  font-size: 2.5em;
  font-style: italic;
  color: black;
  margin: 0 auto;
}

.produto-subtitulo {
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 1.2em;
  font-style: italic;
  color: black;
  margin: 10px auto 3px auto;
}

.produto-paragrafo {
  font-family: "Fira Sans", sans-serif;
  color: black;
  text-align: center;
  font-weight: 500;
  font-size: 0.8em;
}

@media screen and (max-width: 700px) {
  .banner {
    height: auto;
  }
  .produto-img {
    height: 200px;
    margin: 0px auto;
  }
  .produto-da-estampa {
    width: auto;
    margin: 0 auto;
    display: block;
  }
}
</style>
