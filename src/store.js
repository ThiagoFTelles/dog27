import Vue from "vue";
import Vuex from "vuex";
import {
  api
} from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  /* strict não deixa o objeto ser modificado por fora, apenas via mutation */
  state: {
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
      estado: "",
    }
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign({}, state.usuario, payload); /* Object.assign serve para combinar os objetos dentro de () e atualzar ou criar apenas o valor que está sendo passado */
      /* o objeto vazio passado em Object.assign serve para garantir que receberei um retorno mesmo se algum dos valores for nulo */
    },
  },
  actions: {
    getUsuario(context, payload) {
      // A api gera uma primisse, ou seja, posso botar o .then() depois dela.
      // Se eu colocar o return dentro do api.get e api.post, eu conseguirei usar a promisse nos métodos onde eu fizer o dispatch(). Ex: this.$store.dispatch("myAction", myObj).then( () => {...}  )
      return api.get(`/usuario/${payload}`)
        .then(r => {
          context.commit("UPDATE_USUARIO", r.data);
          context.commit("UPDATE_LOGIN", true);
        })
    },
    criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", {
        id: payload.email
      });
      return api.post("/usuario", payload);
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
        estado: "",
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
});