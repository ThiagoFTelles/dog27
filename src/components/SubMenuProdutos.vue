<template>
  <div class="submenu-container">
    <div class="submenu-mensagem">
      <p>Os melhores produtos para o seu Dog</p>
    </div>
    <div class="arrow" @click="swapLeft()">
      <img class="arrow-img" src="@/assets/arrow-left.svg" alt="Dog27" />
    </div>
    <div class="produtos-icones">
      <router-link
        :to="{name:categoria.path}"
        tag="div"
        class="produto-icone"
        v-for="categoria in categorias"
        :key="`${categoria.nome}-dog27`"
      >
        <img :src="getImgUrl(categoria.nome)" :alt="`${categoria.nome} dog27`" />
        <P class="submenu-produto-legenda">{{categoria.nome | capitalize}}</P>
      </router-link>
    </div>
    <div class="arrow" @click="swapRight()">
      <img class="arrow-img" src="@/assets/arrow-right.svg" alt="Dog27" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenuProdutos",
  data() {
    return {
      categorias: [
        {
          nome: "coleiras",
          path: "coleira"
        },
        {
          nome: "peitorais",
          path: "peitoral"
        },
        {
          nome: "cintos",
          path: "cinto"
        },
        {
          nome: "guias",
          path: "guia"
        },
        // {
        //   nome: "comedouros",
        //   path: "comedouro"
        // },
        // {
        //   nome: "gravatas",
        //   path: "gravata"
        // },
        {
          nome: "tapetes higiênicos",
          path: "tapete"
        }
      ]
    };
  },
  methods: {
    swapRight() {
      let first = this.categorias[0];
      this.categorias.push(first);
      this.categorias.shift();
    },
    swapLeft() {
      let lastIndex = this.categorias.length - 1;
      let last = this.categorias[lastIndex];
      this.categorias.unshift(last);
      this.categorias.pop();
    },
    getImgUrl(categoria) {
      return require("../assets/submenu-produtos/" + categoria + ".png");
    }
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

.submenu-mensagem {
  display: block;
  margin-bottom: 10px;
  background: #e6eaeb;
  text-align: center;
  align-items: center;
  top: -42%;
  width: 100%;
}

.submenu-mensagem p {
  font-size: 0.8em;
  padding: 5px 0;
  color: #00acff;
}

.produtos-icones {
  overflow: hidden;
  min-width: 150px;
  display: flex;
  flex: 1 0 80px;
  margin: 0 10px;
}

.produto-icone {
  margin: 0 auto;
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
}

.produto-icone img {
  max-width: 100%;
  margin: 0 auto;
}

.submenu-produto-legenda {
  width: 100%;
  font-size: 0.8em;
  text-align: center;
  font-weight: 600;
  color: black;
  margin: 7px 0;
}
</style>
