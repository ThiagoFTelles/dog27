<template>
  <section>
    <ProdutosLista />
  </section>
</template>

<script>
import ProdutosLista from "@/components/ProdutosLista.vue";
// @ is an alias to /src

export default {
  name: "home",
  components: {
    ProdutosLista
  },
  created() {
    document.title = "Dog27";
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
