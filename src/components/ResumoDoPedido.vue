<template>
  <section>
    <h2>Seu pedido:</h2>
    <ul>
      <li v-if="ganhouPresente" class="carrinho_item">
        <p>x 1</p>
        <p class="green">{{nomeDoPresente}}</p>
        <p class="carrinho_preco">{{0 | numeroPreco}}</p>
        <br />
      </li>
      <li class="carrinho_item" v-for="(item, index) in carrinho" :key="`carrinho-item${index}`">
        <p>x {{item.quantidade}}</p>
        <p>{{item.nomeDoProduto}}</p>
        <p
          :class="{ green: item.isCombo }"
          class="carrinho_preco"
        >{{item.valorUnitarioCobrado * item.quantidade | numeroPreco}}</p>
        <br />
      </li>
    </ul>
    <div v-if="freteEscolhido.nome" class="frete">
      <p>Frete:</p>
      <p>{{ freteEscolhido.nome | uppercase }} {{freteEscolhido.valor | numeroPreco}}</p>
    </div>
    <p v-else>Escolha o seu frete para continuar</p>
    <h2
      v-if="freteEscolhido.nome"
      class="total"
    >Total {{valorTotalCarrinho+freteEscolhido.valor | numeroPreco}}</h2>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ResumoDoPedido",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho,
      nomeDoPresente: state => state.cart.nomeDoPresente,
      ganhouPresente: state => state.cart.ganhouPresente,
      valorTotalCarrinho: state => state.cart.carrinhoTotal,
      freteEscolhido: state => state.freteEscolhido
    })
  }
};
</script>

<style scoped>
input[type="radio"] {
  width: auto;
}

input {
  text-transform: uppercase;
}
</style>