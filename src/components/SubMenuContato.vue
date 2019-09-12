<template>
  <div class="submenu-container">
    <div class="container">
      <p>Tem alguma dúvida ou sugestão? Manda pra a gente! Entra em contato através do chat ou mande uma mensagem que a gente responde por e-mail.</p>
      <section v-if="msgEnviada">
        <p>Mensagem enviada com sucesso!</p>
        <button class="btn" @click="msgEnviada=false">Enviar outra</button>
      </section>
      <form v-else :action="actionUrl" method="post" @submit="onSubmit()">
        <input
          class="half left"
          type="text"
          v-model="name"
          id="name"
          name="name"
          placeholder="NOME COMPLETO"
          required
        />

        <input
          class="half right"
          type="email"
          v-model="email"
          id="email"
          name="email"
          placeholder="EMAIL"
          required
        />
        <input type="text" v-model="phone" id="phone" name="phone" placeholder="TELEFONE" required />
        <input
          type="text"
          v-model="subject"
          id="subject"
          name="subject"
          placeholder="ASSUNTO"
          required
        />
        <textarea
          v-model="message"
          id="message"
          name="message"
          placeholder="ESCREVE AQUI A SUA MENSAGEM"
          style="height:100px"
        ></textarea>

        <input type="submit" value="ENVIAR" />
      </form>
      <erroNotificacao v-if="erros.length" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenuContato",
  data() {
    return {
      actionUrl: `${process.env.VUE_APP_SITE_PREFIX}/helpers/sendmail.php`,
      msgEnviada: false,
      name: null,
      phone: null,
      message: null,
      email: null,
      subject: null,
      erros: []
    };
  },
  methods: {
    onSubmit() {
      this.erros = [];
      let self = this;

      if (
        this.name &&
        this.phone &&
        this.message &&
        this.email &&
        this.subject
      ) {
        fetch(this.actionUrl).then(res => {
          if (res.error) {
            self.erros.push(res.error);
          } else {
            self.msgEnviada = true;
          }
        });
      } else {
        this.erros.push("Preencha todos os campos.");
      }
    },
    created() {
      this.msgEnviada = false;
      this.erros = [];
    }
  }
};
</script>

<style scoped>
.submenu-container {
  width: 100%;
  background: #f6f6f6;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.4);
}

.container {
  background: #f6f6f6;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

p {
  margin: 20px 0;
  font-weight: 600;
  font-size: 0.9rem;
  color: #504e4c;
  width: 80%;
}

form {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 20px;
}

input,
select,
textarea {
  background: #e1dedc;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 0;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  grid-column: 1/3;
  box-shadow: none;
}

input::placeholder,
textarea::placeholder {
  font-weight: 900;
  font-size: 0.9rem;
  font-family: sans-serif;
  color: #a39f9c;
  font-style: italic;
}

.half.left {
  grid-column: 1/2;
}

.half.right {
  grid-column: 2/3;
}

input[type="submit"] {
  width: 130px;
  background-color: #4b95c4;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: 600;
  font-style: italic;
  grid-column: 2/3;
  margin-left: auto;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
</style>
