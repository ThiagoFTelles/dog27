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
    <div v-if="freteEscolhido.nome">
      <div class="cupom">
        <div class="cupomCode" v-if="alterarCupom">
          <label for="cupomCode">Cupom:</label>
          <input type="text" id="cupomCode" name="cupom" v-model="couponCode" />
          <button @click="buscarCupom()">OK</button>
          <p v-if="cupomInvalido" class="erroCupom red">cupom inválido</p>
        </div>
        <div class="cupomAplicado" v-else>
          <p>{{cupom.code | uppercase}}: - R$ {{String(desconto.valor).replace(".", ",") }}</p>
          <p class="trocar-cupom" @click="trocarCupom">Trocar cupom</p>
        </div>

        <h2
          class="total green"
        >Total {{carrinhoTotalComDesconto+freteEscolhido.valor | numeroPreco}}</h2>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ResumoDoPedido",
  data() {
    return {
      alterarCupom: true,
      cupomInvalido: false,
      couponCode: ""
    };
  },
  methods: {
    ...mapActions(["deleteCupom", "getCupom"]),
    trocarCupom() {
      this.deleteCupom();
      this.alterarCupom = true;
    },
    buscarCupom() {
      this.cupomInvalido = false;
      this.getCupom(this.couponCode).then(r => {
        if (r) {
          this.cupomInvalido = false;
          this.alterarCupom = false;
        } else {
          this.cupomInvalido = true;
        }
      });
    }
  },
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho,
      cupom: state => state.cart.cupom,
      nomeDoPresente: state => state.cart.nomeDoPresente,
      ganhouPresente: state => state.cart.ganhouPresente,
      valorTotalCarrinho: state => state.cart.carrinhoTotal,
      freteEscolhido: state => state.freteEscolhido
    }),
    ...mapGetters(["desconto", "carrinhoTotalComDesconto"])
  },
  watch: {
    couponCode() {
      this.cupomInvalido = false;
    }
  },
  created() {
    if (this.cupom.amount > 0) {
      this.alterarCupom = false;
    }
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

.cupom {
  margin: 10px 0;
}

.trocar-cupom {
  font-size: 0.9rem;
  color: #24a9de;
  font-weight: bolder;
  cursor: pointer;
}

.cupomCode input {
  max-width: 150px;
  padding: 10px;
  margin-left: 10px;
}

.cupomCode button {
  width: 50px;
  height: 41px;
  border: none;
  background: #2f2c2c;
  color: #fff;
  margin-left: 10px;
  font-weight: bolder;
  cursor: pointer;
}

.erroCupom {
  font-size: 0.8rem;
  font-weight: bolder;
}
</style>