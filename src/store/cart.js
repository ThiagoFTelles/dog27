import {
  api
} from "@/services.js";

export default {
  strict: true,
  state: {
    carrinho: [],
    cupom: {
      code: "",
      amount: "",
      discount_type: ""
    },
    desconto: 0,
    carrinhoTotal: 0,
    presente: {
      product_id: 65, //Durval (preto)
      variation_id: 66, //tamanho único
      quantity: 1,
      total: "0"
    },
    nomeDoPresente: "Presente: Cinto de segurança Dog27",
    fotoDoPresente: process.env.VUE_APP_SITE_PREFIX +
      "/api-dog27/wp-content/uploads/2019/10/4334344934_cinto-durval-1.jpg",
    ganhouPresente: false
  },
  mutations: {
    ADD_CUPOM(state, payload) {
      state.cupom.code = payload.code;
      state.cupom.amount = payload.amount;
      state.cupom.discount_type = payload.discount_type;
    },
    DAR_PRESENTE(state) {
      state.ganhouPresente = true;
    },
    TIRAR_PRESENTE(state) {
      state.ganhouPresente = false;
    },
    ATUALIZAR_CART(state, payload) {
      state.carrinho = payload;
    },
    ZERAR_CART(state) {
      state.carrinho = [];
    },
    ADD_CART_ITEM(state, payload) {
      state.carrinho.push(payload);
    },
    REMOVE_CART_ITEM(state, payload) {
      let cortar = 1;
      let index = payload.index;

      if (payload.isCombo === true) {
        cortar = 2;
      }
      if (payload.comboFinal) {
        index = index - 1;
      }

      state.carrinho.splice(index, cortar); //aqui o payload recebe o index do item no carrinho[]
    },
    TOTAL_CART(state) {
      let total = 0;
      if (state.carrinho.length) {
        state.carrinho.forEach(item => {
          //esta propriedade sempre será atualizada reativamente quando Carrinho mudar
          total += Number(item.valorUnitarioCobrado * item.quantidade); //para + ou para - porque tudo que está em 'data' é reativo
        });
      }
      state.carrinhoTotal = Number(total);
    }
  },
  actions: {
    getCupom(context, payload) {
      return api.getApiWc(`/coupons?code=${payload}`).then(r => {
        if (r.data.length > 0) {
          let cupom = r.data[0]
          context.commit("ADD_CUPOM", cupom);
          return true
        } else {
          context.dispatch("deleteCupom");
          return false
        }
      });
    },
    deleteCupom(context) {
      let cupom = {
        code: "",
        amount: "",
        discount_type: ""
      };

      context.commit("ADD_CUPOM", cupom);

    },
    esvaziarCarrinho(context) {
      window.localStorage.removeItem("carrinho");
      context.commit("ZERAR_CART");
    },
    // eslint-disable-next-line
    checarLocalStorage(context) {
      if (window.localStorage.carrinho) {
        // let carrinhoLocal = JSON.parse(window.localStorage.carrinho);
        // // JSON.parse = passar a string de volta para objeto
        // context.commit("ATUALIZAR_CART", carrinhoLocal)
      }
    },
    atualizarPresente(context, payload) {
      if (payload === true) {
        context.commit("DAR_PRESENTE");
      } else {
        context.commit("TIRAR_PRESENTE");
      }
    },
    atualizarCarrinhoTotal(context) {
      context.commit("TOTAL_CART");
    },
    adicionarItemAoCarrinho(context, payload) {
      context.commit("ADD_CART_ITEM", payload);
    },
    removerItemDoCarrinho(context, payload) {
      context.commit("REMOVE_CART_ITEM", payload);
    }
  },
  getters: {
    carrinhoTotalComDesconto(state, getters) {
      return Number(state.carrinhoTotal) - Number(getters.desconto.valor);
    },
    desconto(state) {
      let desconto = {
        descricao: "",
        valor: 0
      };
      let tipo = state.cupom.discount_type;
      let quantidade = state.cupom.amount;

      if (tipo === "percent") {
        desconto.descricao = quantidade.substring(0, quantidade.indexOf('.')) + "% OFF";
        desconto.valor = Number((state.carrinhoTotal * (Number(quantidade) / 100)).toFixed(2));
      } else if (tipo === "fixed_cart") {
        desconto.descricao = "- R$ " + quantidade.replace(".", ",");
        desconto.valor = Number(quantidade);
      }

      return desconto;
    },
    parcelasDisponiveis(state) {
      if (state.carrinhoTotal >= 200) {
        return [{
            numero: 1
          },
          {
            numero: 2
          },
          {
            numero: 3
          },
          {
            numero: 4
          }
        ];
      }
      if (state.carrinhoTotal >= 150) {
        return [{
            numero: 1
          },
          {
            numero: 2
          },
          {
            numero: 3
          }
        ];
      }
      if (state.carrinhoTotal >= 100) {
        return [{
            numero: 1
          },
          {
            numero: 2
          }
        ];
      } else {
        return [{
          numero: 1
        }];
      }
    }
  },
  watch: {
    carrinho() {
      // eslint-disable-next-line
      window.localStorage.carrinho = JSON.stringify(state.carrinho); //(...).carrinho significa que estou salvando com o nome de "carrinho"
      // JSON.stringify é para passar o objeto carrinho para string, que é a forma que o localStorage trabalha
    }
  }
};