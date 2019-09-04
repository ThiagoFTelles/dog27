<template>
  <section class="carrinho_modal" :class="{ativo: carrinhoAtivo}">
    <div class="carrinho_container">
      <button class="carrinho_fechar" @click="carrinhoAtivo = false">X</button>
      <h2 class="carrinho_titulo">Carrinho</h2>
      <div v-if="carrinho.length > 0">
        <ul class="carrinho_lista">
          <li v-if="ganhouPresente" class="carrinho_item">
            <p>x 1</p>
            <p class="green">{{nomeDoPresente}}</p>
            <p class="carrinho_preco">{{0 | numeroPreco}}</p>
            <br />
          </li>
          <li
            class="carrinho_item"
            v-for="(item, index) in carrinho"
            :key="`carrinho-item${index}`"
          >
            <p>x {{item.quantidade}}</p>
            <p>{{item.nomeDoProduto}}</p>
            <p
              :class="{ green: item.isCombo }"
              class="carrinho_preco"
            >{{item.valorUnitarioCobrado * item.quantidade | numeroPreco}}</p>
            <button
              class="carrinho_remover"
              @click="removerItemDoCarrinho({index:index, isCombo:item.isCombo, comboFinal:item.comboFinal, comboInicial:item.comboInicial})"
            >X</button>
            <br />
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
      carrinho: state => state.cart.carrinho,
      ganhouPresente: state => state.cart.ganhouPresente,
      nomeDoPresente: state => state.cart.nomeDoPresente,
      metaMaior: state => state.order.metaMaior,
      carrinhoTotal: state => state.cart.carrinhoTotal
    })
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
