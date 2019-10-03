<template>
  <div class="container-engajamento">
    <transition-group>
      <div class="preenchimento" :style="preenchimentoStyle" key="preenchimento"></div>
      <div
        v-if="!freteGratis && !ganhouPresente"
        class="texto-engajamento"
        key="barra1"
        v-html="isMobile() ? `Frete grátis: ${this.calculatePercentage(this.carrinhoTotal)}` : `Falta apenas R$ ${valorQueFalta} pra você ganhar frete grátis!`"
      ></div>
      <div
        v-if="freteGratis && !ganhouPresente"
        class="texto-engajamento"
        key="barra2"
        v-html="isMobile() ? `Frete grátis + Presente: ${this.calculatePercentage(this.carrinhoTotal)}` : `Você ganhou frete grátis! Falta apenas R$ ${valorQueFalta} pra você ganhar um presente!`"
      ></div>
      <div
        v-if="freteGratis && ganhouPresente && isMobile()"
        class="texto-engajamento"
        key="barra3m"
      >Frete grátis + Presente!</div>
      <div
        v-if="freteGratis && ganhouPresente && !isMobile()"
        class="texto-engajamento"
        key="barra3"
      >
        Parabéns! Você ganhou frete grátis e um presente pro seu Dog!
        <router-link :to="{name: 'checkout'}" tag="span" class="finalizar-compra">Finalizar Compra</router-link>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BarraEngajamento",
  data() {
    return {
      freteGratis: false,
      valorQueFalta: 0,
      corDaBarra: ""
    };
  },
  methods: {
    ...mapActions(["atualizarPresente"]),
    isMobile() {
      if (screen.width <= 500) {
        return true;
      } else {
        return false;
      }
    },
    calculatePercentage(valorDoCarrinho) {
      var metaMenor = this.metaMenor;
      var metaMaior = this.metaMaior;

      var metaAtual = metaMenor;
      var freteGratis = false;
      var ganhouPresente = false;
      var corDaBarra = "#87d7f4";

      if (valorDoCarrinho >= metaMaior) {
        freteGratis = true;
        ganhouPresente = true;
        progresso = 1;
        corDaBarra = "#59c8e2";
      } else if (valorDoCarrinho >= metaMenor) {
        metaAtual = metaMaior;
        freteGratis = true;
        corDaBarra = "#6cd3ef";
      }

      this.atualizarPresente(ganhouPresente);
      this.freteGratis = freteGratis;
      this.corDaBarra = corDaBarra;

      let progresso = valorDoCarrinho / metaAtual;
      this.valorQueFalta = metaAtual - valorDoCarrinho;
      return Math.floor(progresso * 100) + "%";
    }
  },
  computed: {
    ...mapState({
      carrinho: state => state.cart.carrinho,
      metaMenor: state => state.order.metaMenor,
      metaMaior: state => state.order.metaMaior,
      carrinhoTotal: state => state.cart.carrinhoTotal,
      ganhouPresente: state => state.cart.ganhouPresente
    }),
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
