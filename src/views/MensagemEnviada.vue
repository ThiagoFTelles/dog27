<template>
  <section>
    <p>
      Mensagem enviada com sucesso!
      <br />Responderemos o quanto antes.
    </p>
  </section>
</template>

<script>
export default {
  name: "MensagemEnviada",
  components: {},
  methods: {},
  created() {
    document.title = "Mensagem Enviada!";
  }
};
</script>

<style scoped>
p {
  margin: auto;
  width: 100%;
  text-align: center;
  padding: 150px 0;
  color: #5bc4e4;
  font-weight: 600;
}
</style>
