import {
  isContext
} from "vm";

export default {
  // namespaced: false,
  state: {
    carrinho: [{
        id: 123,
        nome: "Coleira Verde",
        preco: 85
      },
      {
        id: 222,
        nome: "Peitoral Azul",
        preco: 200
      }
    ]
  },
  mutations: {
    ATUALIZAR_CART(state, payload) {
      state.carrinho = payload;
    },
    ADD_CART_ITEM(state, payload) {
      state.carrinho.push(payload)
    },
    REMOVE_CART_ITEM(state, payload) {
      state.carrinho.splice(payload, 1); //aqui o payload recebe o index do item no carrinho[]
    },
    TOTAL_CART(state) {
      let total = 0;
      if (state.carrinho.length) {
        state.carrinho.forEach(item => {
          //esta propriedade sempre será atualizada reativamente quando Carrinho mudar
          total += item.preco; //para + ou para - porque tudo que está em 'data' é reativo
        });
      }
      state.carrinhoTotal = total;
    }
  },
  actions: {
    checarLocalStorage(context) {
      if (window.localStorage.carrinho) {
        let carrinhoLocal = JSON.parse(window.localStorage.carrinho); // JSON.parse = passar a string de volta para objeto
        context.commit("ATUALIZAR_CART", carrinhoLocal)
      }
    },
    atualizarCarrinhoTotal(context) {
      context.commit("TOTAL_CART");
    }
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(state.carrinho); //(...).carrinho significa que estou salvando com o nome de "carrinho"
      // JSON.stringify é para passar o objeto carrinho para string, que é a forma que o localStorage trabalha
    }
  },
}