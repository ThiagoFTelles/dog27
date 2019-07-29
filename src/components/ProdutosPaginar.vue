<template>
  <ul v-if="paginasTotal > 1">
    <router-link :to="{query: query(1)}">&laquo;</router-link>
    <li v-for="pagina in paginasArray" :key="`pagina-${pagina}`">
      <router-link :to="{query: query(pagina)}">{{pagina}}</router-link>
    </li>
    <router-link :to="{query: query(paginasTotal)}">&raquo;</router-link>
  </ul>
</template>

<script scoped>
export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1
    },
    produtosTotal: {
      type: Number,
      default: 1
    }
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        /* estou desestruturando "..." a query atual da página para ela não se perder ao mudar de página, evitando um reset das queries de busca por exemplo */
        _page: pagina
      };
    }
  },
  computed: {
    paginasArray() {
      const currentPage = Number(this.$route.query._page);
      const pagesRange = 3; /* quantas páginas quero exibir no máximo dentro da paginação */
      const offset = Math.ceil(
        pagesRange / 2
      ); /* divide a paginação entre a pg atual e 50%pagesRange antes e 50%pagesRange depois */
      const totalPages = this.paginasTotal;

      const pagesArray = [];

      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
        /* vai criar um array com o número total de páginas [1, 2, 3, ... etc] */
      }

      pagesArray.splice(0, currentPage - offset);
      pagesArray.splice(pagesRange, totalPages);

      return pagesArray;
    },
    paginasTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity
        ? Math.ceil(total)
        : 0; /* ceil = arredondar para cima*/
      /*  verificar se total !== infinity para evitar erros com cálculos atípicos*/
    }
  }
};
</script>

<style scoped>
ul {
  grid-column: 1 / -1; /* isso faz a coluna onde exibe os produtos ocupar ponta a ponta horizintalmente, evitando assim que os links de página (1, 2, etc) subam para o lado dos produtos */
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>
