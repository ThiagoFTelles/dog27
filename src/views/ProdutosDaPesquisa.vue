<template>
  <section>
    <div class="banner">
      <img :src="getSrc()" alt="dog-27" />
    </div>
    <div class="produto-container">
      <h1 class="produto-titulo">{{ pesquisa | uppercase}}</h1>
      <div v-if="this.produtos.length === 0" class="sem-resultados">
        <h2>Pesquisa sem resultados</h2>
      </div>
      <div
        class="produto-da-pesquisa"
        v-for="(produto, index) in produtos"
        @click="direcionarProduto(produto)"
        :key="`produto-${pesquisa}-${index}`"
      >
        <img class="produto-img" :src="produto.imgSrc" alt />
        <h2 class="produto-subtitulo">{{produto.nome | uppercase}}</h2>
        <p class="produto-paragrafo">A parir de {{Number(produto.precoMinimo) | numeroPreco}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProdutosDaPesquisa",
  props: { comprar: Boolean, pesquisa: String, produtos: Array },
  methods: {
    ...mapActions(["selecionarCategoria", "redirecionarEstampa"]),
    getSrc(pesquisa) {
      let pesquisaNome = pesquisa ? pesquisa.toLowerCase() : "default";
      let resultado = require("../assets/estampas/banner-estampas/" +
        pesquisaNome +
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
      var estampas = require.context("../assets/estampas/", false, /\.jpg$/);
      return estampas(
        "./Coleira_de_cachorro_" +
          estampa.toLowerCase().replace(/\s/g, "") +
          ".jpg"
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

.produto-da-pesquisa {
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

.sem-resultados h2 {
  padding: 20px 50px;
}

@media screen and (max-width: 700px) {
}
</style>
