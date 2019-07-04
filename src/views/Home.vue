<template>
  <section>
    <h1>:) Compre ou Venda :(</h1>
    <ProdutosBuscar />
    <ProdutosLista />
  </section>
</template>

<script>
import ProdutosBuscar from "@/components/ProdutosBuscar.vue";
import ProdutosLista from "@/components/ProdutosLista.vue";
// @ is an alias to /src

export default {
  name: "home",
  components: {
    ProdutosBuscar,
    ProdutosLista
  }
};
</script>

<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
