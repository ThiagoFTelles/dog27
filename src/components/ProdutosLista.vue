<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <!-- Quando quero animar diferentes itens com a mesma tag (ex: div), preciso definir uma key para cada item -->
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div class="produto duplo">
          <div class="banner-imagem">
            <img src="../assets/coleira.png" alt="coleira" />
          </div>
          <div class="banner-textos">
            <h1 class="banner-titulo">{{getBanner(16)}}</h1>
            <h2
              class="banner-descricao"
            >Peitoral convencional ou anti-puxão? Achamos a melhor solução para você. Mude quando qusier em poucos segundos.</h2>
            <div class="links">
              <router-link
                :to="{name: 'peitoral', params: {id: 'peitoral-hibrido'}}"
                class="banner-link left-link"
              >Saiba mais >></router-link>
              <router-link
                :to="{name: 'peitoral', params: {id: 'peitoral-hibrido'}}"
                class="banner-link"
              >Comprar >></router-link>
            </div>
          </div>
        </div>
        <div class="produto simples">
          <div class="banner-imagem">
            <img src="../assets/coleira.png" alt="coleira" />
          </div>
          <div class="banner-textos">
            <h1 class="banner-titulo">COLEIRAS</h1>
            <h2
              class="banner-descricao"
            >Peitoral convencional ou anti-puxão? Achamos a melhor solução para você. Mude quando qusier em poucos segundos.</h2>
            <div class="links">
              <a class="banner-link left-link">Saiba mais >></a>
              <a class="banner-link">Comprar >></a>
            </div>
          </div>
        </div>
        <div class="produto simples">
          <div class="banner-imagem">
            <img src="../assets/coleira.png" alt="coleira" />
          </div>
          <div class="banner-textos">
            <h1 class="banner-titulo">COLEIRAS</h1>
            <h2
              class="banner-descricao"
            >Peitoral convencional ou anti-puxão? Achamos a melhor solução para você. Mude quando qusier em poucos segundos.</h2>
            <div class="links">
              <a class="banner-link left-link">Saiba mais >></a>
              <a class="banner-link">Comprar >></a>
            </div>
          </div>
        </div>

        <div class="produto duplo">
          <div class="banner-imagem">
            <img src="../assets/coleira.png" alt="coleira" />
          </div>
          <div class="banner-textos">
            <h1 class="banner-titulo">COMEDOURO</h1>
            <h2
              class="banner-descricao"
            >Peitoral convencional ou anti-puxão? Achamos a melhor solução para você. Mude quando qusier em poucos segundos.</h2>
            <div class="links">
              <a class="banner-link left-link">Saiba mais >></a>
              <a class="banner-link">Comprar >></a>
            </div>
          </div>
        </div>
        <div class="produto simples">
          <div class="banner-imagem">
            <img src="../assets/coleira.png" alt="coleira" />
          </div>
          <div class="banner-textos">
            <h1 class="banner-titulo">COLEIRAS</h1>
            <h2
              class="banner-descricao"
            >Peitoral convencional ou anti-puxão? Achamos a melhor solução para você. Mude quando qusier em poucos segundos.</h2>
            <div class="links">
              <a class="banner-link left-link">Saiba mais >></a>
              <a class="banner-link">Comprar >></a>
            </div>
          </div>
        </div>
        <div class="produto simples">
          <div class="banner-imagem">
            <img src="../assets/coleira.png" alt="coleira" />
          </div>
          <div class="banner-textos">
            <h1 class="banner-titulo">COLEIRAS</h1>
            <h2
              class="banner-descricao"
            >Peitoral convencional ou anti-puxão? Achamos a melhor solução para você. Mude quando qusier em poucos segundos.</h2>
            <div class="links">
              <a class="banner-link left-link">Saiba mais >></a>
              <a class="banner-link">Comprar >></a>
            </div>
          </div>
        </div>
        <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina" />
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
        <p class="sem-resultados">Busca sem resultados. Tente buscar outro termo.</p>
      </div>
      <PaginaCarregando v-else key="carregando" />
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar
  },
  data() {
    return {
      produtos: null,
      produtosTotal: 0,
      produtosPorPagina: 9
    };
  },
  computed: {
    ...mapState(["categorias"]),
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosPorPagina}${query}`;
    }
  },
  methods: {
    ...mapActions(["getBanner"]),
    getProdutos() {
      this.produtos = null;
      api.get(this.url).then(r => {
        this.produtosTotal = Number(
          r.headers["x-total-count"]
        ); /* precisar passar assim headers["x-total-count"] por causa dos traços, não daria para puxar usando headers.x-total-count */
        /* Precisa botar Nunber() pq a api retorna string */
        this.produtos = r.data;
      });
    }
  },
  watch: {
    url() {
      this.getProdutos();
    }
  },
  created() {
    this.getProdutos();
    this.getBannerData();
  }
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(
    2,
    1fr
  ); /* dividiu em 2 colunas com 1fr cada uma */
  grid-gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .produtos {
    grid-template-columns: repeat(
      1,
      1fr
    ); /* dividiu em 1 coluna com 1fr cada uma */
    grid-gap: 10px;
    margin: 10px;
  }
}

.produto {
  grid-column: initial;
  /* box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1); */
  margin: 10px;
  background: #fff;
  transition: all 0.2s;
  position: relative;
  display: grid;

  grid-gap: 10px;
}

.duplo {
  height: 300px;
  max-height: 300px;
  grid-column: 1/3;
  grid-template-columns: 320px 1fr;
}

.duplo img {
  grid-column: 1/3;
}

.simples {
  grid-template-rows: 300px auto;
  max-height: 520px;
}

.simples img {
  margin: 0 auto;
  padding: 20px;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1; /* z-index: 1 para ficar na frente, caso ao aumentar a scale ele passe por cima de outro item */
}

.produto img {
  padding: 5px;
}
.banner-textos {
  padding: 5px;
  margin: auto;
}
.banner-titulo {
  margin: 10px;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
  font-size: 2em;
  font-style: italic;
  color: black;
}
.banner-descricao {
  padding: 5px;
  font-family: "Fira Sans", sans-serif;
  font-weight: 100;
  text-align: center;
  font-size: 1em;
  color: black;
}
.links {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}

.banner-link {
  margin: 15px;
  cursor: pointer;
  flex: 1;
  color: #00acff;
  font-size: 1rem;
}
.left-link {
  text-align: right;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
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
