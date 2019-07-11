<template>
  <section>
    <div v-if="vendas">
      <h2>Vendas</h2>
      <div class="produtos-wrapper" v-for="(venda, index) in vendas" :key="`venda-${index}`">
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor">
            <span>Comprador:</span>
            {{venda.comprador_id}}
          </p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="`endereco-${key}`">{{key}}: {{value}}</li>
          </ul>
        </div>
      </div>
    </div>
    <PaginaCarregando v-else />
  </section>
</template>

<script>
import ProdutoItem from "@/components/ProdutoItem.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "UsuarioVendas",
  components: {
    ProdutoItem
  },
  data() {
    return {
      vendas: null
    };
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getVendas() {
      api.get(`/transacao?tipo=vendedor_id`).then(r => {
        this.vendas = r.data;
      });
    }
  },
  watch: {
    login() {
      this.getVendas();
    }
  },
  created() {
    if (this.login) {
      this.getVendas();
    }
    document.title = "Minhas Vendas";
  }
};
</script>

<style scoped>
.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

ul {
  grid-column: 2;
}

li {
  display: block;
}

.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  justify-self: end;
  margin: 0;
}

@media screen and (max-width: 500px) {
  .entrega {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  h3 {
    justify-self: start;
  }
  ul {
    grid-column: 1;
  }
}
</style>
