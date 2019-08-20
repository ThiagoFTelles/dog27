<template>
  <div class="container-engajamento">
    <div class="preenchimento" :style="{width: calculatePercentage(carrinhoTotal)}"></div>
    <div class="texto-engajamento">Faltam apenas R$1000 pra você ganhar uma coleira!</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BarraEngajamento",
  methods: {
    calculatePercentage(valor) {
      var meta = 169;
      var meta_2 = 700;
      if (valor > meta) {
        meta = meta_2;
      }
      let progresso = valor / meta;
      return progresso * 100 + "%";
    }
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
  width: 35%;
  background: #4bd6ff;
  height: 100%;
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
