import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "@/services.js";
import cart from '@/store/cart.js'
import order from '@/store/order.js'
import rdstation from '@/store/rdstation.js'
import areaDeCompra from '@/store/areaDeCompra.js'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    order,
    areaDeCompra,
    rdstation
  },
  strict: true,
  /* strict não deixa o objeto ser modificado por fora, apenas via mutation */
  state: {
    carregando: true,
    categorias: [],
    idCategoriaSelecionada: "",
    idCategoriaCombo: "",
    login: false,
    freteEscolhido: {
      nome: "",
      valor: ""
    },
    usuario: {
      id: 0,
      nome: "",
      cpf: "",
      telefone: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "BR",

      nomeEntrega: "",
      telefoneEntrega: "",
      emailEntrega: "",
      senhaEntrega: "",
      cepEntrega: "",
      ruaEntrega: "",
      numeroEntrega: "",
      complementoEntrega: "",
      bairroEntrega: "",
      cidadeEntrega: "",
      estadoEntrega: "",
      paisEntrega: "BR"
    },
    usuario_produtos: null
  },
  mutations: {
    ADD_CARREGANDO(state) {
      state.carregando = true;
    },
    REMOVER_CARREGANDO(state) {
      state.carregando = false;
    },
    ADD_CATEGORIA(state, payload) {
      state.categorias.push(payload);
    },
    SET_CATEGORIA_SELECIONADA_ID(state, payload) {
      state.idCategoriaSelecionada = payload.categoriaId;
      state.idCategoriaCombo = payload.categoriaComboId;
    },
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign({},
        state.usuario,
        payload
      ); /* Object.assign serve para combinar os objetos dentro de () e atualzar ou criar apenas o valor que está sendo passado */
      /* o objeto vazio passado em Object.assign serve para garantir que receberei um retorno mesmo se algum dos valores for nulo */
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload);
      // unshift() acrescenta o item no começo da array, ao contrário de push() que add no final
    },
    UPDATE_FRETE_ESCOLHIDO(state, payload) {
      state.freteEscolhido = payload;
    }
  },
  actions: {
    selecionarCategoria(context, payload) {
      context.commit("SET_CATEGORIA_SELECIONADA_ID", payload);
    },
    escolherFrete(context, payload) {
      context.commit("UPDATE_FRETE_ESCOLHIDO", payload);
    },
    getCategoriasProdutos(context) {
      context.commit("REMOVER_CARREGANDO");
    },
    removeCarregando(context) {
      context.commit("REMOVER_CARREGANDO");
    },
    setCarregando(context) {
      context.commit("ADD_CARREGANDO");
    },
    getUsuarioProdutos(context) {
      return api
        .get(`/produto?usuario_id=${context.state.usuario.id}`)
        .then(r => {
          context.commit("UPDATE_USUARIO_PRODUTOS", r.data);
        });
    },
    getUsuario(context) {
      // A api gera uma promisse, ou seja, posso botar o .then() depois dela.
      // Se eu colocar o return dentro do api.get e api.post, eu conseguirei usar a promisse nos métodos onde eu fizer o dispatch(). Ex: this.$store.dispatch("myAction", myObj).then( () => {...}  )
      return api.get(`/usuario`).then(r => {
        context.commit("UPDATE_USUARIO", r.data);
        context.commit("UPDATE_LOGIN", true);
      }).then(() => {
        context.dispatch("solicitarToken", "Login");
      });
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", {
        id: payload.email
      });
      return api.post("/usuario", payload);
    },
    logarUsuario(context, payload) {
      return api
        .login({
          username: payload.email,
          password: payload.senha
        })
        .then(r => {
          window.localStorage.token = `Bearer ${r.data.token}`;
        });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    }
  },
  getters: {
    logado(state) {
      return state.login;
    },
    isMobile() {
      if (document.documentElement.clientWidth <= 700) {
        return true;
      } else {
        return false;
      }
    },
  }
});