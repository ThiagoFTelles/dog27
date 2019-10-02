<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">Criar Conta</button>
      <UsuarioForm v-else>
        <button type="submit" class="btn btn-form" @click.prevent="criarUsuario">Criar Usuário</button>
      </UsuarioForm>
    </transition>
    <ErroNotificacao :erros="erros" />
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";

export default {
  name: "LoginCriar",
  components: {
    UsuarioForm
  },
  data() {
    return {
      criar: false,
      erros: []
    };
  },
  methods: {
    async criarUsuario(event) {
      this.erros = [];
      const button = event.currentTarget;
      const valorOriginal = button.value;
      button.setAttribute("disabled", "");
      button.value = "Aguarde...";
      // async significa que tudo que retornar uma promessa será executado só depois que o "await" anterior terminar de ser executado. Garantindo assim a ordem correta das ações e evitando uma cadeia grande de .then(()=>{}).then(()=>{})... etc
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("logarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUsuario");
        button.removeAttribute("disabled", "");
        button.value = valorOriginal;
        this.$router.push({ name: "usuario" });
      } catch (e) {
        button.removeAttribute("disabled", "");
        button.value = valorOriginal;
        button.removeAttribute("disabled", "");
        button.value = valorOriginal;
        this.erros.push(e.response.data.message);
      }
      // depois de logar, Postar, ele vai pra rota "usuario" (/usuario)
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
