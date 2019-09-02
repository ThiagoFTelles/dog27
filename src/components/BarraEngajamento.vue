<template>
  <div class="container-engajamento">
    <transition-group>
      <div class="preenchimento" :style="preenchimentoStyle" key="preenchimento"></div>
      <div
        v-if="!freteGratis && !ganhouPresente"
        class="texto-engajamento"
        key="barra1"
      >Falta apenas {{valorQueFalta | numeroPreco}} pra você ganhar frete grátis!</div>
      <div
        v-if="freteGratis && !ganhouPresente"
        class="texto-engajamento"
        key="barra2"
      >Você ganhou frete grátis! Falta apenas {{valorQueFalta | numeroPreco}} pra você ganhar um presente!</div>
      <div v-if="freteGratis && ganhouPresente" class="texto-engajamento" key="barra3">
        Parabéns! Você ganhou frete grátis e um presente pro seu Dog!
        <router-link :to="{name: 'checkout'}" tag="span" class="finalizar-compra">Finalizar Compra</router-link>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BarraEngajamento",
  data() {
    return {
      freteGratis: false,
      ganhouPresente: false,
      valorQueFalta: 0,
      corDaBarra: ""
    };
  },
  methods: {
    calculatePercentage(valorDoCarrinho) {
      var metaMenor = this.metaMenor;
      var metaMaior = this.metaMaior;

      var metaAtual = metaMenor;
      var freteGratis = false;
      var ganhouPresente = false;
      var corDaBarra = "#fffb00";

      if (valorDoCarrinho >= metaMaior) {
        freteGratis = true;
        ganhouPresente = true;
        progresso = 1;
        corDaBarra = "#00d13f";
      } else if (valorDoCarrinho >= metaMenor) {
        metaAtual = metaMaior;
        freteGratis = true;
        corDaBarra = "#4bd6ff";
      }

      this.ganhouPresente = ganhouPresente;
      this.freteGratis = freteGratis;
      this.corDaBarra = corDaBarra;

      let progresso = valorDoCarrinho / metaAtual;
      this.valorQueFalta = metaAtual - valorDoCarrinho;
      return progresso * 100 + "%";
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
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho,
      metaMenor: state => state.order.metaMenor,
      metaMaior: state => state.order.metaMaior
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
    },
    preenchimentoStyle() {
      let style = {
        width: this.calculatePercentage(this.carrinhoTotal),
        background: this.corDaBarra
      };

      return style;
    }
  }
};
</script>

<style scoped>
.container-engajamento {
  width: 100%;
  height: 30px;
  background: #f7f8fa;
}

.preenchimento {
  height: 100%;
}

.finalizar-compra {
  color: white;
  cursor: pointer;
}

.texto-engajamento {
  width: 100%;
  position: absolute;
  top: 0;
  text-align: center;
  font-size: 0.9em;
  margin: 3px;
  font-family: "Fira Sans", sans-serif;
  color: #6c6c6c;
  font-weight: 600;
}
</style>
