<template>
  <section class="carrinho_modal" :class="{ativo: carrinhoAtivo}">
    <div class="carrinho_container">
      <button class="carrinho_fechar" @click="carrinhoAtivo = false">X</button>
      <h2 class="carrinho_titulo">Carrinho</h2>
      <div v-if="carrinho.length > 0">
        <ul class="carrinho_lista">
          <li
            class="carrinho_item"
            v-for="(item, index) in carrinho"
            :key="`carrinho-item${index}`"
          >
            <p>x {{item.quantidade}}</p>
            <p>{{item.nomeDoProduto}}</p>
            <p class="carrinho_preco">{{item.valorUnitarioCobrado | numeroPreco}}</p>
            <button class="carrinho_remover" @click="removerItemDoCarrinho(index)">X</button>
            <p></p>
          </li>
        </ul>
        <p class="carrinho_total">{{carrinhoTotal | numeroPreco}}</p>
        <router-link :to="{name: 'checkout'}" class="carrinho_finalizar">Finalizar Compra</router-link>
      </div>
      <p v-else>O carrinho está vazio.</p>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CarrinhoDeCompras",
  data() {
    return {
      carrinhoAtivo: true
    };
  },
  methods: {
    ...mapActions([
      "atualizarCarrinhoTotal",
      "checarLocalStorage",
      "removerItemDoCarrinho"
    ])
  },
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho
    }),
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach(item => {
          //esta propriedade sempre será atualizada reativamente quando Carrinho mudar
          let valorDoItem =
            Number(item.valorUnitarioCobrado) * Number(item.quantidade);
          total += valorDoItem; //para + ou para - porque tudo que está em 'data' é reativo
        });
      }
      return total;
    }
  },
  filters: {
    numeroPreco(valor) {
      //return `R$ ${valor},00`;
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho); //(...).carrinho significa que estou salvando com o nome de "carrinho"
      // JSON.stringify é para passar o objeto carrinho para string, que é a forma que o localStorage trabalha
      this.atualizarCarrinhoTotal();
    }
  },
  created() {
    this.checarLocalStorage();
  }
};
</script>

<style scoped>
</style>
