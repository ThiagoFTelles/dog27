<template>
  <form>
    <div v-if="mostrarDadosLogin" class="usuario">
      <label for="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        v-model="nome"
        maxlength="40"
        placeholder="seu nome completo"
      />
      <label for="email">Email</label>
      <input required type="email" id="email" name="email" v-model="email" />
      <label for="senha">Senha</label>
      <input
        required
        type="password"
        id="senha"
        name="senha"
        v-model="senha"
        :placeholder="login? 'deixe em branco para não alterar' : ''"
      />
      <label for="cpf">CPF</label>
      <input required type="text" id="cpf" name="cpf" v-model="cpf" v-mask="['###.###.###-##']" />
      <label class="nascimento" for="nascimento">Nascimento</label>
      <input
        required
        type="text"
        id="nascimento"
        name="nascimento"
        v-model="nascimento"
        v-mask="['##/##/####']"
      />
      <label for="telefone">Telefone</label>
      <input
        required
        type="text"
        id="telefone"
        name="telefone"
        v-model="telefone"
        v-mask="['(##) ####-####', '(##) #-####-####']"
      />
    </div>
    <label for="cep">Cep</label>
    <input
      required
      type="text"
      id="cep"
      name="cep"
      v-model="cep"
      @keyup="preencherCep"
      v-mask="'#####-###'"
    />
    <label for="rua">Rua</label>
    <input required type="text" id="rua" name="rua" v-model="rua" />
    <label for="numero">Número</label>
    <input required type="text" id="numero" name="numero" v-model="numero" />
    <label for="complemento">Comp.</label>
    <input type="text" id="complemento" name="complemento" v-model="complemento" />
    <label for="bairro">Bairro</label>
    <input required type="text" id="bairro" name="bairro" v-model="bairro" />
    <label for="cidade">Cidade</label>
    <input required type="text" id="cidade" name="cidade" v-model="cidade" />
    <label for="estado">Estado</label>
    <input required type="text" id="estado" name="estado" v-model="estado" v-mask="'AA'" />
    <div class="button">
      <slot v-if="checkForm"></slot>
      <p class="red" v-else>preencha todos os campos</p>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "cpf",
        "nascimento",
        "email",
        "senha",
        "telefone",
        "rua",
        "cep",
        "numero",
        "complemento",
        "bairro",
        "cidade",
        "estado"
      ],
      base: "usuario",
      mutation: "UPDATE_USUARIO"
    }),
    ...mapState({
      login: state => state.login,
      usuario: state => state.usuario
    }),
    mostrarDadosLogin() {
      return !this.$store.state.login || this.$route.name === "usuario";
    },
    checkForm() {
      if (
        this.usuario.nome.length &&
        this.usuario.cpf.length &&
        this.usuario.telefone.length &&
        this.usuario.email.length &&
        this.usuario.senha.length &&
        this.usuario.cep.length &&
        this.usuario.rua.length &&
        this.usuario.numero.length &&
        this.usuario.bairro.length &&
        this.usuario.cidade.length &&
        this.usuario.nascimento.length &&
        this.usuario.estado.length
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    preencherCep() {
      const cep = this.cep.replace(/\D/g, ""); /* pegará apenas dígitos */
      if (cep.length === 8) {
        getCep(cep).then(r => {
          this.rua = r.data.logradouro;
          this.bairro = r.data.bairro;
          this.estado = r.data.uf;
          this.cidade = r.data.localidade;
        });
      }
    }
  }
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.nascimento {
  word-break: break-all;
}

.usuario {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}

input {
  text-transform: uppercase;
}
</style>
