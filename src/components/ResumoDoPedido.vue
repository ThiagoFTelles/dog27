<template>
  <section class="resumo">
    <h2>Seu pedido:</h2>
    <ul>
      <li v-if="ganhouPresente" class="carrinho_item">
        <p>Quantidade: 1</p>
        <p class="green">{{nomeDoPresente}}</p>
        <p class="carrinho_preco">Total deste item: {{0 | numeroPreco}}</p>
        <br />
      </li>
      <li class="carrinho_item" v-for="(item, index) in carrinho" :key="`carrinho-item${index}`">
        <p>{{item.categoria | uppercase}} PARA CACHORROS {{item.estampa | uppercase}}</p>
        <p class="tamanho etiqueta">Tamanho: {{item.tamanho}}</p>
        <p class="quantidade etiqueta">Quantidade: {{item.quantidade}}</p>
        <p
          :class="{ green: item.isCombo }"
          class="carrinho_preco"
        >Total deste item: {{item.valorUnitarioCobrado * item.quantidade | numeroPreco}}</p>
        <br />
      </li>
    </ul>
    <div v-if="freteEscolhido.nome" class="frete">
      <p>Frete: {{ freteEscolhido.nome | uppercase }} {{freteEscolhido.valor | numeroPreco}}</p>
    </div>
    <p v-else>Escolha o seu frete para continuar</p>
    <h2
      v-if="freteEscolhido.nome"
      class="total green"
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
h2 {
  margin: 15px 0;
}
input[type="radio"] {
  width: auto;
}

input {
  text-transform: uppercase;
}

.resumo {
  margin-top: 25px;
}

.etiqueta {
  font-size: 0.9rem;
  font-weight: bold;
}

.carrinho_preco {
  font-size: 1rem;
}
</style>