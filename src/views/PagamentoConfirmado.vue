<template>
  <section>
    <p>
      Pagamento Confirmado!
      <br />Verifique o e-mail que enviamos para você,
      <br />não se esqueça de procurar na caixa de spam.
    </p>
  </section>
</template>

<script>
export default {
  name: "PagamentoConfirmado",
  components: {},
  methods: {},
  created() {
    document.title = "Pagamento Confirmado!";
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
