<template>
  <div class="submenu-container">
    <h3>Contact Form</h3>

    <div class="container">
      <section v-if="msgEnviada">
        <p>Mensagem enviada com sucesso!</p>
        <button class="btn" @click="msgEnviada=false">Enviar outra</button>
      </section>
      <form v-else :action="actionUrl" method="post" @submit="onSubmit()">
        <input
          type="text"
          v-model="name"
          id="name"
          name="name"
          placeholder="NOME COMPLETO"
          required
        />
        <input type="text" v-model="phone" id="phone" name="phone" placeholder="TELEFONE" required />
        <input type="email" v-model="email" id="email" name="email" placeholder="EMAIL" required />
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

        <input type="submit" value="Submit" />
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
  height: 380px;
  background: #f3f3f3;
  box-shadow: 0 6px 6px rgba(38, 56, 74, 0.4);
}

h3 {
  margin: 0;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f3f3f3;
  padding: 20px;
}
</style>
