<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="loginEmail" v-model="login.email" />
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="loginSenha" v-model="login.senha" />
      <button class="btn" @click.prevent="logar">Logar</button>
      <ErroNotificacao :erros="erros" />
    </form>
    <p class="perdeu">
      <a
        :href="`${prefixUrl}/wp-login.php?action=lostpassword`"
        target="_blank"
      >Perdeu a senha? Cique aqui.</a>
    </p>
    <LoginCriar />
  </section>
</template>

<script>
import LoginCriar from "@/components/LoginCriar.vue";
import { prefixUrl } from "@/services.js";

export default {
  name: "Login",
  components: { LoginCriar },
  data() {
    return {
      prefixUrl: prefixUrl,
      login: {
        email: "",
        senha: ""
      },
      erros: []
    };
  },
  methods: {
    logar() {
      this.erros = [];
      this.$store
        .dispatch("logarUsuario", this.login)
        .then(() => {
          this.$store.dispatch("getUsuario");
          // this.$router.push({ name: "usuario" });
          this.$router.go(-1);
        })
        .catch(e => {
          this.erros.push(e.response.data.message);
        });
    }
  },
  created() {
    document.title = "Login";
  }
};
</script>
<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #24a9de;
}

form {
  display: grid; /* Deixar um item em baixo do outro */
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #24a9de;
  text-decoration: underline;
}
</style> 
 