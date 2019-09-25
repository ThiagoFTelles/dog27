<template>
  <section class="carrinho_container">
    <section class="carrinho_modal" :class="{ativo: carrinhoAtivo}">
      <span class="arrow"></span>
      <div class="items_area">
        <slot name="top"></slot>

        <div v-if="carrinho.length > 0">
          <transition-group class="carrinho_lista" name="cart-list" tag="ul">
            <li v-if="ganhouPresente" class="carrinho_item" key="carrinho-presente">
              <p class="quantidade">Quantidade: 1</p>
              <p class="titulo">{{nomeDoPresente | uppercase}}</p>
              <p class="tamanho">Tamanho: U</p>
              <img :src="fotoDoPresente" :alt="nomeDoPresente" class="foto" />

              <p class="carrinho_preco green">{{0 | numeroPreco}}</p>
              <button class="carrinho_remover"></button>
              <br />
            </li>
            <li
              class="carrinho_item"
              v-for="(item, index) in carrinho"
              :key="`carrinho-item${index}`"
            >
              <p class="quantidade">Quantidade: {{item.quantidade}}</p>
              <p
                class="titulo"
              >{{item.categoria | uppercase}} PARA CACHORROS {{item.estampa | uppercase}}</p>
              <p class="tamanho">Tamanho: {{item.tamanho}}</p>
              <img
                :src="item.fotoUrl"
                :alt="`${item.categoria} para cachorros ${item.estampa}`"
                class="foto"
              />

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
          </transition-group>
          <div class="total-area">
            <h2 class="carrinho_total">TOTAL</h2>
            <h2 class="carrinho_total">{{carrinhoTotal | numeroPreco}}</h2>
          </div>
        </div>
      </div>
    </section>
    <slot v-if="carrinho.length > 0" name="bottom"></slot>
    <section class="vazio" v-else>
      <div class="bottom">
        <a class="carrinho_finalizar">Nenhum item adicionado...</a>
      </div>
    </section>
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
      fotoDoPresente: state => state.cart.fotoDoPresente,
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
.carrinho_modal {
  position: relative;
  border-top: 20px solid #f5f3f2;
  border-right: 20px solid #f5f3f2;
  border-left: 20px solid #f5f3f2;
  border-bottom: none;
  border-radius: 20px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.arrow {
  top: -29px;
  right: 0;
  position: absolute;
  display: table;
  border-right: 9px solid transparent;
  border-bottom: 9px solid #f5f3f2;
  border-left: 9px solid transparent;
  content: "";
  height: 100%;
}

.carrinho_container {
  border-radius: 20px;
  background: #f5f3f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.items_area {
  background: #f5f3f2;
  width: 450px;
}

.carrinho_fechar {
  cursor: pointer;
}

.carrinho_item {
  background: white;
  border-radius: 10px;
  padding: 0 10px;
  margin-top: 10px;
  display: grid;
  grid-template: ". . . . carrinho_remover" 22px "foto titulo titulo titulo ." 1fr "foto tamanho quantidade . carrinho_preco" 1fr ". tamanho quantidade . carrinho_preco" 2px / 80px 1fr 1fr 1fr;
}

.carrinho_remover:focus {
  outline: none;
}

.carrinho_remover {
  cursor: pointer;
  grid-area: carrinho_remover;
  background: none;
  border: none;
  text-align: right;
  font-weight: 600;
  color: #4f4742;
  font-family: cursive;
}
.titulo {
  grid-area: titulo;
  padding-top: 9px;
  font-size: 1rem;
  color: #000;
  font-weight: 600;
}
.foto {
  grid-area: foto;
  width: 65px;
  height: 65px;
  background: rgb(240, 240, 240);
}

.tamanho,
.quantidade {
  font-size: 0.7rem;
  font-style: italic;
  font-family: sans-serif;
  color: black;
}

.tamanho {
  grid-area: tamanho;
}
.quantidade {
  grid-area: quantidade;
}

.carrinho_preco {
  grid-area: carrinho_preco;
  font-size: 1rem;
  font-weight: 600;
  color: #4f4742;
  text-align: right;
  margin-top: 8px;
}
.green {
  color: green;
}
.bottom {
  cursor: pointer;
  background: #2d7a38;
  padding: 18px;
  text-align: center;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-family: sans-serif;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.total-area {
  display: flex;
  margin: 9px 0;
  padding-left: 53%;
}

.carrinho_total {
  color: #565656;
  flex: 1;
  font-size: 1.5rem;
}

.vazio div {
  background: none;
  cursor: default;
  text-align: left;
}
.vazio a {
  font-size: 1rem;
  font-weight: 400;
  color: #4a4a4a;
  font-style: italic;
  font-family: sans-serif;
  text-transform: lowercase;
}

.cart-list-enter,
.cart-list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.cart-list-enter-active,
.cart-list-leave-active {
  transition: all 0.3s;
}

@media screen and (max-width: 700px) {
  .items_area {
    width: 250px;
  }

  .titulo {
    font-size: 0.7rem;
  }

  .carrinho_item {
    padding: 0 5px 0 0;
    margin-right: -10px;
  }

  .total-area {
    margin: 9px auto;
    padding-left: 10%;
  }
}
</style>
