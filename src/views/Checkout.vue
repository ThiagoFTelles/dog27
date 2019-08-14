<template>
  <section class="checkout">
    <h1>CHECKOUT</h1>
    <h2>Forma de Pagamento:</h2>
    <router-link :to="{name: 'checkoutcredito'}" class="opcao_de_pagamento">Cartão de Crédito</router-link>
    <router-link :to="{name: 'checkoutboleto'}" class="opcao_de_pagamento">Boleto</router-link>
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
          this.$router.push({ name: "usuario" });
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
  color: #87f;
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
  color: #87f;
  text-decoration: underline;
}
</style> 
 