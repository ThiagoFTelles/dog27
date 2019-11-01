<template>
  <form id="contato" :action="actionUrl" method="post" @submit="onSubmit()">
    <input
      type="email"
      placeholder="seu melhor e-mail"
      v-model="email"
      id="emailRodape"
      name="email"
      required
    />
    <input class="hidden" type="text" id="name" name="name" value="novo inscrito" />
    <input class="hidden" type="text" id="phone" name="phone" value="não informado" />
    <input
      class="hidden"
      type="text"
      id="subject"
      name="subject"
      value="Nova incrição na newsletter"
    />
    <input
      class="hidden"
      id="message"
      type="text"
      name="message"
      value="Favor me inscrever na sua lista de contatos."
    />
    <button class="submit" type="submit">Cadastrar</button>
  </form>
</template>

<script>
export default {
  name: "SubscribeEmail",
  data() {
    return {
      actionUrl: `${process.env.VUE_APP_SITE_PREFIX}/helpers/sendmail.php`,
      email: null
    };
  },
  methods: {
    onSubmit() {
      if (this.email) {
        // console.log("cadastro realizado!");
      }
    }
  }
};
</script>

<style scoped>
form input {
  width: 350px;
  height: 30px;
  background: black;
  color: #ccc;
  border: none;
  border-radius: 0;
  vertical-align: top;
}

form input::placeholder {
  color: rgb(218, 218, 218);
  font-style: italic;
  font-family: sans-serif;
  font-size: 0.8rem;
}

form button {
  background: black;
  margin: 0 8px;
  border: none;
  width: 120px;
  height: 30px;
  font-weight: 600;
  color: white;
}

.submit {
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>
