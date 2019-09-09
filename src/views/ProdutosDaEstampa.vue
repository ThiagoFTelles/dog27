<template>
  <section>
    <div class="banner">
      <img :src="getSrc(estampa)" alt="dog-27" />
    </div>
    <div class="produto-container">
      <h1 class="produto-titulo">{{ estampa | uppercase}}</h1>
      <router-link
        tag="div"
        class="produto-da-estampa"
        v-for="(produto, index) in produtos"
        :key="`produto-${estampa}-${index}`"
        :to="`/${produto.nome}-para-cachorros-dog27`"
      >
        <img class="produto-img" :src="produto.imgSrc" alt />
        <h2 class="produto-subtitulo">{{produto.nome | uppercase}} {{estampa | uppercase}}</h2>
        <p class="produto-paragrafo">A parir de {{Number(produto.precoMinimo) | numeroPreco}}</p>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProdutosDaEstampa",
  props: { comprar: Boolean, estampa: String, produtos: Array },
  methods: {
    getSrc(estampa) {
      let estampaNome = estampa.toLowerCase();
      let resultado = require("../assets/estampas/banner-estampas/" +
        estampaNome +
        ".jpg");

      return resultado;
    }
  }
};
</script>

<style scoped>
section {
  background: #fffefd;
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

@media screen and (max-width: 500px) {
}
</style>
