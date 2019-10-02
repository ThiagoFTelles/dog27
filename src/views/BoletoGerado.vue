<template>
  <section>
    <p>
      Tudo certo!
      <br />criamos o seu boleto,
      <br />caso não tenha sido redirecionado automaticamente, clique
      <b>
        <a :href="link" target="_blank">aqui</a>
      </b>.
    </p>
  </section>
</template>

<script>
export default {
  name: "BoletoGerado",
  props: ["link"],
  created() {
    document.title = "Boleto dog27";
    if (!this.link) {
      this.$router.push({ name: "home" });
    }
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
