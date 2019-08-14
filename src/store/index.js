import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "@/services.js";
import cart from '@/store/cart.js'

Vue.use(Vuex);

// Consumer Woocommerce API Key (Read only):
// Consumer key: ck_edc3033a3399e37cb273477f2d69b7f1192e7d49
// Consumer secret: cs_288b43034883692fe6a025fc646782638b5906f9

export default new Vuex.Store({
  modules: {
    cart
  },
  strict: true,
  /* strict não deixa o objeto ser modificado por fora, apenas via mutation */
  state: {
    carregando: true,
    categorias: [],
    idCategoriaSelecionada: "",
    login: false,
    usuario: {
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
    },
    usuario_produtos: null
  },
  mutations: {
    REMOVER_CARREGANDO(state) {
      state.carregando = false;
    },
    ADD_CATEGORIA(state, payload) {
      state.categorias.push(payload);
      // state.categorias.forEach(item => {
      //   console.log(item.nome)
      // })
    },
    SET_CATEGORIA_SELECIONADA_ID(state, payload) {
      state.idCategoriaSelecionada = payload;
    },
    GET_BANNER_DATA(state, payload) {
      state.categorias.forEach(item => {
        if (item.id === payload) {
          console.log(item);
        }
      });
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
    }
  },
  actions: {
    selecionarCategoria(context, payload) {
      context.commit("SET_CATEGORIA_SELECIONADA_ID", payload);
    },
    getBanner(context) {
      context.commit("GET_BANNER_DATA", context);
    },
    getCategoriasProdutos(context) {
      var url = `/products/categories?`;
      return api.getApiWc(url).then(r => {
        r.data.forEach(item => {
          context.commit("ADD_CATEGORIA", {
            nome: item.name,
            id: item.id,
            descricao: item.description,
            quantidadeDeProdutos: item.count,
            imagemSrc: item.image ? item.image.src : ""
          });
        });
        context.commit("REMOVER_CARREGANDO");
        console.log(this.state.categorias);
      });
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
  }
});