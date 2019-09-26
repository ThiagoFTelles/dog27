<template>
  <div class="submenu-container">
    <div class="estampas-conteudo">
      <div v-if="carregando" class="carregando">carregando...</div>
      <div
        v-else
        class="area-submenu-estampas"
        v-for="(estampa, index) in estampas"
        :key="`estampa-link-${index}`"
        @click="getEstampa(estampa)"
      >
        <div class="imagem-submenu-estampas">
          <img :src="getSrc(estampa.slug)" :alt="estampa.nome" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "@/services.js";

export default {
  name: "SubMenuEstampasMobile",
  data() {
    return {
      estampas: [],
      produtosDaEstampa: [],
      carregando: true
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
      this.carregando = true;
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
        this.carregando = false;
      }
    },
    getSrc(slug) {
      let resultado = require("../assets/estampas/banner-estampas/" +
        slug +
        ".jpg");
      return resultado;
      // return require("../assets/estampas/Coleira_de_cachorro_" + slug + ".jpg");
    }
  },
  created() {
    this.getEstampas();
  }
};
</script>

<style scoped>
.submenu-container {
  align-items: center;
  width: 100%;
}

.carregando {
  color: #fff;
}

.estampas-conteudo {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 50px;
  padding: 0 20px;
}

.submenu-container-conteudo {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 100px;
  width: 100%;
  margin: 0 auto;
}

.area-submenu-estampas {
  margin: 10px 0;
}

.imagem-submenu-estampas {
  cursor: pointer;
}

.imagem-submenu-estampas img {
  padding: 0;
  margin: 0 auto;
}
</style>
