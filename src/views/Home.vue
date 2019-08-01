<template>
  <section>
    <ProdutosLista v-if="!this.carregando" />
    <PaginaCarregando v-else />
  </section>
</template>

<script>
// @ is an alias to /src
import ProdutosLista from "@/components/ProdutosLista.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  components: {
    ProdutosLista
  },
  computed: {
    ...mapState(["carregando"])
  },
  methods: {
    ...mapActions(["getCategoriasProdutos"])
  },
  created() {
    document.title = "Dog27";
    this.getCategoriasProdutos();
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
