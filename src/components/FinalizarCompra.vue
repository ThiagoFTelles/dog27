<template>
  <section>
    <h3>Endereço de Envio:</h3>
    <UsuarioForm>
      <button type="submit" @click.prevent="finalizarCompra" class="btn">Finalizar Compra</button>
    </UsuarioForm>
    <ErroNotificacao :erros="erros" />
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UsuarioForm
  },
  props: ["produto"],
  data() {
    return {
      erros: []
    };
  },
  computed: {
    ...mapState(["usuario"]),
    compra() {
      return {
        comprador_id: this.usuario.id,
        vendedor_id: this.produto.usuario_id,
        produto: this.produto,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          cidade: this.usuario.cidade,
          bairro: this.usuario.bairro,
          estado: this.usuario.estado
        }
      };
    }
  },
  methods: {
    criarTransacao() {
      return api.post("/transacao", this.compra).then(() => {
        this.$router.push({ name: "compras" });
      });
    },
    async criarUsuario(button) {
      // async significa que tudo que retornar uma promessa será executado só depois que o "await" anterior terminar de ser executado. Garantindo assim a ordem correta das ações e evitando uma cadeia grande de .then(()=>{}).then(()=>{})... etc
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        await this.criarTransacao(); /* pra ter o awayt aqui a criarTransacao tem que começar com return para retornar uma promessa. */
      } catch (e) {
        button.removeAttribute("disabled", "");
        button.value = "Finalizar Compra";
        this.erros.push(e.response.data.message);
      }
      // depois de logar, Postar, ele vai pra rota "usuario" (/usuario)
    },
    finalizarCompra(event) {
      this.erros = [];
      const button = event.currentTarget;
      button.value = "Finalizando...";
      button.setAttribute("disabled", "");
      if (this.$store.state.login) {
        this.criarTransacao(button);
      } else {
        this.criarUsuario(button);
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}
.btn {
  background: #e80;
}
</style>
